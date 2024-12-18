import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/ThemeContext';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    emptyContainer: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    headerContainer: {
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
    },
    reviewContainer: {
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      backgroundColor: theme.colors.background.paper,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: theme.spacing.sm,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    starsContainer: {
      flexDirection: 'row',
    },
    starIcon: {
      marginRight: 2,
    },
    dateText: {
      marginLeft: theme.spacing.md,
    },
  });
