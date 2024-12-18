import * as ImageManipulator from 'expo-image-manipulator';

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
};
