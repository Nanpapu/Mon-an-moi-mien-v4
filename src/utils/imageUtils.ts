import * as ImageManipulator from 'expo-image-manipulator';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const ImageUtils = {
  /**
   * Nén và resize ảnh trước khi upload
   * @param uri URI của ảnh gốc
   * @returns URI của ảnh đã xử lý
   */
  prepareImageForUpload: async (uri: string) => {
    try {
      // Resize và nén ảnh
      const processedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return processedImage.uri;
    } catch (error) {
      console.error('Lỗi khi xử lý ảnh:', error);
      throw error;
    }
  },

  /**
   * Lấy đường dẫn storage cho ảnh công thức
   * @param regionId ID của vùng miền (01, 02, 03)
   * @param recipeId ID của công thức (01_01, 01_02, 01_03)
   * @returns Đường dẫn trong storage
   */
  getRecipeImagePath: (regionId: string, recipeId: string) => {
    return `recipes/images/${regionId}/${recipeId}.jpg`;
  },

  /**
   * Lấy URL download của ảnh công thức
   * @param imagePath Đường dẫn tương đối của ảnh
   * @returns URL download của ảnh
   */
  getRecipeImageUrl: async (imagePath: string) => {
    try {
      // Log để debug
      console.log('Getting URL for path:', imagePath);

      // Nếu là URL đầy đủ thì trả về luôn  
      if (imagePath.startsWith('http')) {
        return imagePath;
      }

      // Đảm bảo đường dẫn bắt đầu đúng
      const fullPath = imagePath.startsWith('recipes/images/') 
        ? imagePath 
        : `recipes/images/${imagePath}`;
      
      console.log('Full storage path:', fullPath);
      
      const storageRef = ref(storage, fullPath);
      console.log('Storage reference:', storageRef.fullPath);
      
      const url = await getDownloadURL(storageRef);
      console.log('Download URL:', url);
      
      return url;
    } catch (error: any) {
      // Log chi tiết lỗi
      console.error('Detailed error:', {
        path: imagePath,
        error: error.message,
        code: error.code,
        serverResponse: error.serverResponse
      });
      return null;
    }
  },

  /**
   * Tạo đường dẫn tương đối cho ảnh công thức
   * @param regionId ID của vùng miền
   * @param recipeId ID của công thức
   * @returns Đường dẫn tương đối để lưu vào Firestore
   */
  getRecipeImageRelativePath: (regionId: string, recipeId: string) => {
    return `recipes/images/${regionId}/${recipeId}.jpg`;
  }
};
