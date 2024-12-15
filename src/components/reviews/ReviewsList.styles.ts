import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  reviewItem: {
    backgroundColor: colors.background.paper,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600" as const,
  },
  userEmail: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  date: {
    ...typography.caption,
    color: colors.text.secondary,
    marginLeft: "auto",
  },
  comment: {
    ...typography.body2,
    color: colors.text.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    minHeight: 300,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
