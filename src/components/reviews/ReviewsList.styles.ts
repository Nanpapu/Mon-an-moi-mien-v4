import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  reviewItem: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.spacing.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: "600" as const,
  },
  userEmail: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: "auto",
  },
  comment: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
    minHeight: 300,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
});
