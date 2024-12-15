import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
    maxHeight: 50,
    minHeight: 50,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    alignSelf: "center",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  recipeList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  recipeCard: {
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
    overflow: "hidden",
  }
});
