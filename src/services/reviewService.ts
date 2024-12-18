/**
 * @fileoverview Service xử lý đánh giá và bình luận cho công thức nấu ăn
 */

import { db } from "../config/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
  runTransaction,
  orderBy,
} from "firebase/firestore";
import { Review } from "../types";
import { UserService } from "./userService";
import { CacheService, CACHE_KEYS, CACHE_EXPIRY } from "./cacheService";
import { COLLECTIONS } from "../constants";

/**
 * Service quản lý đánh giá và bình luận
 * @module ReviewService
 */
export const ReviewService = {
  /**
   * Tạo đánh giá mới cho một công thức
   * @param {string} recipeId - ID của công thức
   * @param {string} userId - ID của người đánh giá
   * @param {number} rating - Số sao đánh giá (1-5)
   * @param {string} comment - Nội dung bình luận
   * @returns {Promise<Review>} Thông tin đánh giá mới được tạo
   * @throws {Error} Lỗi khi tạo đánh giá hoặc người dùng đã đánh giá trước đó
   */
  createReview: async (
    recipeId: string,
    userId: string,
    rating: number,
    comment: string
  ): Promise<Review> => {
    try {
      // Kiểm tra xem user đã đánh giá chưa
      const existingReview = await ReviewService.getUserReviewForRecipe(
        recipeId,
        userId
      );
      if (existingReview) {
        throw new Error("Bạn đã đánh giá món ăn này rồi");
      }

      // Tạo review mới
      const reviewData = {
        recipeId,
        userId,
        rating,
        comment,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Thêm vào collection reviews
      const docRef = await addDoc(
        collection(db, COLLECTIONS.REVIEWS),
        reviewData
      );

      // Cập nhật averageRating và totalReviews trong recipeStats
      await runTransaction(db, async (transaction) => {
        const statsRef = doc(db, COLLECTIONS.RECIPE_STATS, recipeId);
        const statsDoc = await transaction.get(statsRef);

        if (!statsDoc.exists()) {
          throw new Error("Không tìm thấy stats");
        }

        const statsData = statsDoc.data();
        const newTotalReviews = (statsData.totalReviews || 0) + 1;
        const currentTotal =
          (statsData.averageRating || 0) * (statsData.totalReviews || 0);
        const newAverageRating = (currentTotal + rating) / newTotalReviews;

        transaction.update(statsRef, {
          averageRating: newAverageRating,
          totalReviews: newTotalReviews,
        });
      });

      // Clear cache sau khi tạo review mới
      await ReviewService.clearRecipeStatsCache(recipeId);
      await CacheService.clearCache(`${CACHE_KEYS.RECIPE_REVIEWS}${recipeId}`);

      return {
        id: docRef.id,
        ...reviewData,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Lấy đánh giá của người dùng cho một công thức
   * @param {string} recipeId - ID của công thức
   * @param {string} userId - ID của người dùng
   * @returns {Promise<Review | null>} Thông tin đánh giá hoặc null nếu chưa đánh giá
   */
  getUserReviewForRecipe: async (
    recipeId: string,
    userId: string
  ): Promise<Review | null> => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("recipeId", "==", recipeId),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as Review;
    } catch (error) {
      console.error("Lỗi khi lấy đánh giá:", error);
      return null;
    }
  },

  /**
   * Lấy tất cả đánh giá của một công thức
   * @param {string} recipeId - ID của công thức
   * @returns {Promise<Review[]>} Danh sách đánh giá
   */
  getRecipeReviews: async (recipeId: string): Promise<Review[]> => {
    try {
      console.log("Fetching reviews for recipe:", recipeId);
      const q = query(
        collection(db, "reviews"),
        where("recipeId", "==", recipeId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      console.log("Found reviews:", querySnapshot.size);

      const reviews = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          console.log("Review data:", data);
          const userInfo = await UserService.getUserInfo(data.userId);
          return {
            id: doc.id,
            recipeId: data.recipeId,
            userId: data.userId,
            rating: data.rating,
            comment: data.comment,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userInfo: userInfo,
          } as Review;
        })
      );

      return reviews;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đánh giá:", error);
      return [];
    }
  },

  /**
   * Cập nhật đánh giá hiện có
   * @param {string} reviewId - ID của đánh giá
   * @param {string} recipeId - ID của công thức
   * @param {number} rating - Số sao đánh giá mới
   * @param {string} comment - Nội dung bình luận mới
   * @throws {Error} Lỗi khi cập nhật đánh giá
   */
  updateReview: async (
    reviewId: string,
    recipeId: string,
    rating: number,
    comment: string
  ): Promise<void> => {
    try {
      await runTransaction(db, async (transaction) => {
        // Đọc review và recipe trước
        const reviewRef = doc(db, "reviews", reviewId);
        const recipeRef = doc(db, "recipeStats", recipeId);

        const reviewDoc = await transaction.get(reviewRef);
        const recipeDoc = await transaction.get(recipeRef);

        if (!reviewDoc.exists()) {
          throw new Error("Không tìm thấy đánh giá");
        }
        if (!recipeDoc.exists()) {
          throw new Error("Không tìm thấy công thức");
        }

        const oldRating = reviewDoc.data().rating;
        const recipeData = recipeDoc.data();

        // Sau khi đọc xong mới thực hiện write
        const currentTotal = recipeData.averageRating * recipeData.totalReviews;
        const newTotal = currentTotal - oldRating + rating;
        const newAverageRating = newTotal / recipeData.totalReviews;

        transaction.update(reviewRef, {
          rating,
          comment,
          updatedAt: Timestamp.now(),
        });

        transaction.update(recipeRef, {
          averageRating: newAverageRating,
        });
      });

      // Clear cache sau khi update
      await ReviewService.clearRecipeStatsCache(recipeId);
      await CacheService.clearCache(`${CACHE_KEYS.RECIPE_REVIEWS}${recipeId}`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * Lấy thống kê đánh giá của một công thức
   * @param {string} recipeId - ID của công thức
   * @returns {Promise<{averageRating: number, totalReviews: number}>} Thống kê đánh giá
   */
  getRecipeStats: async (recipeId: string) => {
    try {
      // Check cache trước
      const cacheKey = `${CACHE_KEYS.RECIPE_REVIEWS}stats_${recipeId}`;
      const cachedStats = await CacheService.getCache(
        cacheKey,
        CACHE_EXPIRY.RECIPE_REVIEWS
      );

      if (cachedStats) {
        return cachedStats;
      }

      // Nếu không có cache thì query từ Firestore
      const q = query(
        collection(db, "reviews"),
        where("recipeId", "==", recipeId)
      );

      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map((doc) => doc.data());

      const stats = {
        averageRating:
          reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            : 0,
        totalReviews: reviews.length,
      };

      // Lưu vào cache
      await CacheService.setCache(cacheKey, stats);

      return stats;
    } catch (error) {
      console.error("Lỗi khi lấy thống kê đánh giá:", error);
      return { averageRating: 0, totalReviews: 0 };
    }
  },

  /**
   * Xóa cache thống kê đánh giá của một công thức
   * @param {string} recipeId - ID của công thức
   */
  clearRecipeStatsCache: async (recipeId: string) => {
    await CacheService.clearCache(
      `${CACHE_KEYS.RECIPE_REVIEWS}stats_${recipeId}`
    );
  },
};
