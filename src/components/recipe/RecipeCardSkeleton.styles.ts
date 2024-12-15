import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E1E9EE'
  },
  
  content: {
    padding: 15,
  },
  
  title: {
    height: 24,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 8
  },
  
  region: {
    height: 16,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    width: '40%',
    marginBottom: 15
  },
  
  ingredients: {
    height: 100,
    backgroundColor: '#E1E9EE',
    borderRadius: 4
  }
});
