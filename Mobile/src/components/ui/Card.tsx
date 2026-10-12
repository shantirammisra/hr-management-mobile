import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { PinkTokens } from '@/theme/tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export function Card({
  children,
  variant = 'default',
  padding = 'lg',
  onPress,
  style,
}: CardProps) {
  const containerStyles = [
    styles.base,
    variantStyles[variant],
    paddingStyles[padding],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          containerStyles,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: PinkTokens.colors.canvas.surface,
    borderRadius: PinkTokens.radius.lg, // 16px
    borderWidth: 1,
    borderColor: PinkTokens.colors.border.divider, // #E2E8F0
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
});

const paddingStyles = StyleSheet.create({
  none: {
    padding: 0,
  },
  sm: {
    padding: PinkTokens.spacing.sm,
  },
  md: {
    padding: PinkTokens.spacing.md,
  },
  lg: {
    padding: PinkTokens.spacing.lg,
  },
});

const variantStyles = StyleSheet.create({
  default: {
    ...PinkTokens.shadows.card,
  },
  elevated: {
    ...PinkTokens.shadows.floating,
  },
  outlined: {
    elevation: 0,
    shadowOpacity: 0,
    borderColor: PinkTokens.colors.border.default,
  },
  subtle: {
    backgroundColor: PinkTokens.colors.canvas.background,
    borderColor: PinkTokens.colors.brand.soft,
    elevation: 0,
    shadowOpacity: 0,
  },
});
