import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.default,
    borderRadius: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background.paper,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  headerContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
  },
  region: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  details: {
    paddingTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  listItem: {
    ...typography.body1,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    paddingLeft: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.error,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  buttonText: {
    ...typography.body1,
    color: colors.background.default,
    fontWeight: '600' as const,
  },
  expandButton: {
    padding: spacing.xs,
    borderRadius: spacing.sm,
    backgroundColor: colors.background.paper,
  },
  ratingContainer: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: spacing.md,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingScore: {
    alignItems: 'center',
  },
  averageRating: {
    ...typography.h2,
    color: colors.text.primary,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
    gap: spacing.xs,
  },
  totalReviews: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    gap: spacing.xs,
  },
  addReviewText: {
    ...typography.body2,
    color: colors.background.default,
    fontWeight: '500' as const,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  viewAllText: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '500' as const,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.default,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    maxHeight: '80%',
    paddingBottom: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
    borderRadius: spacing.sm,
  },
  modalBody: {
    padding: spacing.md,
  },
  reviewsList: {
    maxHeight: width * 1.2,
  },
  noReviews: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic'
  },
  pressableHighlight: {
    opacity: 0.7,
  },
  expandButtonRotate: {
    transform: [{ rotate: '180deg' }],
  },
});
