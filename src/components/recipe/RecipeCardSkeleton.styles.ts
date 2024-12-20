import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: theme.isDark ? '#2A2A2A' : '#E1E9EE',
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    height: 24,
    backgroundColor: theme.isDark ? '#2A2A2A' : '#E1E9EE',
    borderRadius: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  region: {
    height: 16,
    backgroundColor: theme.isDark ? '#2A2A2A' : '#E1E9EE',
    borderRadius: theme.spacing.xs,
    width: '40%',
    marginBottom: theme.spacing.md,
  },
  ingredients: {
    height: 100,
    backgroundColor: theme.isDark ? '#2A2A2A' : '#E1E9EE',
    borderRadius: theme.spacing.xs,
  },
});
