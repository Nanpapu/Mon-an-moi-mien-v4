import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Alert,
  Modal,
  View,
  ActivityIndicator 
} from 'react-native';
import { RegionService } from '../../services/regionService';

export function ImportButton() {
  const [isImporting, setIsImporting] = useState(false);

  const handleImportData = async () => {
    setIsImporting(true);
    try {
      const success = await RegionService.importDataToFirestore();
      if (success) {
        Alert.alert('Thành công', 'Đã import dữ liệu vào Firestore');
      } else {
        Alert.alert('Lỗi', 'Không thể import dữ liệu');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi import dữ liệu');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleImportData}
        disabled={isImporting}
      >
        <Text style={styles.buttonText}>Import Dữ Liệu</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isImporting}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Đang import dữ liệu...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
