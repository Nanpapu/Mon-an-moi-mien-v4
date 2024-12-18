import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/ThemeContext';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.default,
    },
    filterContainer: {
      paddingHorizontal: theme.spacing.sm,
      marginBottom: theme.spacing.md,
      maxHeight: 50,
      minHeight: 50,
    },
    filterButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.spacing.md,
      backgroundColor: theme.colors.background.paper,
      marginRight: theme.spacing.sm,
      alignSelf: 'center',
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary.main,
    },
    filterText: {
      color: theme.colors.text.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    recipeList: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.colors.text.secondary,
      lineHeight: 24,
    },
    recipeCard: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.spacing.md,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
      ...theme.shadows.sm,
      overflow: 'hidden',
    },
    gridContainer: {
      padding: theme.spacing.sm,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });
