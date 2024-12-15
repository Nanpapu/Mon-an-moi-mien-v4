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

export const ReviewService = {
  // Tạo đánh giá mới
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
      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      // Cập nhật averageRating và totalReviews trong recipeStats
      await runTransaction(db, async (transaction) => {
        const statsRef = doc(db, "recipeStats", recipeId);
        const statsDoc = await transaction.get(statsRef);

        if (!statsDoc.exists()) {
          throw new Error("Không tìm thấy stats");
        }

        const statsData = statsDoc.data();
        const newTotalReviews = (statsData.totalReviews || 0) + 1;
        const currentTotal = (statsData.averageRating || 0) * (statsData.totalReviews || 0);
        const newAverageRating = (currentTotal + rating) / newTotalReviews;

        transaction.update(statsRef, {
          averageRating: newAverageRating,
          totalReviews: newTotalReviews,
        });
      });

      return {
        id: docRef.id,
        ...reviewData,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Lấy đánh giá của user cho một công thức
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

  // Lấy tất cả đánh giá của một công thức
  getRecipeReviews: async (recipeId: string): Promise<Review[]> => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("recipeId", "==", recipeId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const reviews = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const userInfo = await UserService.getUserInfo(data.userId);
        return {
          id: doc.id,
          recipeId: data.recipeId,
          userId: data.userId,
          rating: data.rating,
          comment: data.comment,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          userInfo: userInfo
        } as Review;
      }));

      return reviews;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đánh giá:", error);
      return [];
    }
  },

  // Cập nhật đánh giá
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
        const recipeRef = doc(db, "recipes", recipeId);
        
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
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getRecipeStats: async (recipeId: string) => {
    try {
      const statsRef = doc(db, "recipeStats", recipeId);
      const statsDoc = await getDoc(statsRef);
      
      if (!statsDoc.exists()) {
        return { averageRating: 0, totalReviews: 0 };
      }
      
      const data = statsDoc.data();
      return {
        averageRating: data.averageRating || 0,
        totalReviews: data.totalReviews || 0
      };
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
      return { averageRating: 0, totalReviews: 0 };
    }
  }
};
