import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content: {
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  region: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },

  expandButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },

  details: {
    marginTop: 16,
    paddingTop: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    marginTop: 16,
  },

  listItem: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },

  ratingContainer: {
    marginTop: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
  },

  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  ratingScore: {
    alignItems: "center",
  },

  averageRating: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },

  starsRow: {
    flexDirection: "row",
    gap: 2,
    marginVertical: 4,
  },

  totalReviews: {
    fontSize: 12,
    color: "#666",
  },

  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  addReviewText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    marginTop: 4,
  },

  viewAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },

  closeButton: {
    padding: 4,
  },
});
