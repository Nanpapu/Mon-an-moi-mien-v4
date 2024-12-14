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

      // Cập nhật averageRating và totalReviews của recipe
      await runTransaction(db, async (transaction) => {
        const recipeRef = doc(db, "recipes", recipeId);
        const recipeDoc = await transaction.get(recipeRef);

        if (!recipeDoc.exists()) {
          throw new Error("Không tìm thấy công thức");
        }

        const recipeData = recipeDoc.data();
        const newTotalReviews = (recipeData.totalReviews || 0) + 1;
        const currentTotal =
          (recipeData.averageRating || 0) * (recipeData.totalReviews || 0);
        const newAverageRating = (currentTotal + rating) / newTotalReviews;

        transaction.update(recipeRef, {
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
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
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
      const reviewRef = doc(db, "reviews", reviewId);
      const reviewDoc = await getDoc(reviewRef);

      if (!reviewDoc.exists()) {
        throw new Error("Không tìm thấy đánh giá");
      }

      const oldRating = reviewDoc.data().rating;

      await runTransaction(db, async (transaction) => {
        // Cập nhật review
        transaction.update(reviewRef, {
          rating,
          comment,
          updatedAt: Timestamp.now(),
        });

        // Cập nhật averageRating của recipe
        const recipeRef = doc(db, "recipes", recipeId);
        const recipeDoc = await transaction.get(recipeRef);

        if (!recipeDoc.exists()) {
          throw new Error("Không tìm thấy công thức");
        }

        const recipeData = recipeDoc.data();
        const currentTotal = recipeData.averageRating * recipeData.totalReviews;
        const newTotal = currentTotal - oldRating + rating;
        const newAverageRating = newTotal / recipeData.totalReviews;

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
      const recipeRef = doc(db, "recipes", recipeId);
      const recipeDoc = await getDoc(recipeRef);
      
      if (!recipeDoc.exists()) {
        return { averageRating: 0, totalReviews: 0 };
      }
      
      const data = recipeDoc.data();
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
