import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../theme/ThemeContext';

const { width } = Dimensions.get('window');

export const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: theme.colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.background.paper,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  region: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  details: {
    paddingTop: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.error.main,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  buttonText: {
    ...theme.typography.body1,
    color: theme.colors.background.default,
    fontWeight: '600' as const,
  },
  expandButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.sm,
    backgroundColor: theme.colors.background.paper,
  },
  ratingContainer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    marginTop: theme.spacing.md,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text.secondary,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingScore: {
    alignItems: 'center',
  },
  averageRating: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  totalReviews: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  addReviewText: {
    ...theme.typography.body2,
    color: theme.colors.background.default,
    fontWeight: '500' as const,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
  },
  viewAllText: {
    color: theme.colors.primary.main,
    marginRight: theme.spacing.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.default,
    borderTopLeftRadius: theme.spacing.lg,
    borderTopRightRadius: theme.spacing.lg,
    maxHeight: '80%',
    paddingBottom: theme.spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.sm,
  },
  modalBody: {
    padding: theme.spacing.md,
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
