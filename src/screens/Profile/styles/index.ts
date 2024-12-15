import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  // Form styles
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 55,
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },

  // Button styles
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#99c9ff",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  // Auth switch styles
  switchAuthButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  switchAuthText: {
    fontSize: 15,
    color: "#666",
  },
  switchAuthHighlight: {
    color: "#007AFF",
    fontWeight: "bold",
  },

  // Profile styles
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    color: "#666",
  },

  // Name editing styles
  nameContainer: {
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  nameInput: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "80%",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ff6b6b",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  editNameButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  displayNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  // Password reset styles
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007AFF",
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },

  // Divider styles
  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginHorizontal: 10,
  },

  // Google sign in button
  googleButton: {
    backgroundColor: "#DB4437",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },

  // Import button
  importButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
  },
});
