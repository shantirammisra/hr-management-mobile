import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { PinkTokens } from '@/theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const isInteractive = !disabled && !isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: isLoading }}
      disabled={!isInteractive}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant].container,
        pressed && isInteractive && variantStyles[variant].pressed,
        !isInteractive && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : PinkTokens.colors.brand.primary}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
          <Text
            style={[
              styles.textBase,
              textSizeStyles[size],
              variantStyles[variant].text,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: PinkTokens.touch.minTarget, // 48dp minimum touch target
    borderRadius: PinkTokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PinkTokens.spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: PinkTokens.spacing.sm,
  },
  rightIcon: {
    marginLeft: PinkTokens.spacing.sm,
  },
  textBase: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    minHeight: 40,
    paddingHorizontal: PinkTokens.spacing.md,
    paddingVertical: PinkTokens.spacing.xs,
    borderRadius: PinkTokens.radius.sm,
  },
  md: {
    minHeight: PinkTokens.touch.minTarget, // 48dp
    paddingHorizontal: PinkTokens.spacing.lg,
    paddingVertical: PinkTokens.spacing.sm,
    borderRadius: PinkTokens.radius.md,
  },
  lg: {
    minHeight: 54,
    paddingHorizontal: PinkTokens.spacing.xl,
    paddingVertical: PinkTokens.spacing.md,
    borderRadius: PinkTokens.radius.lg,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 13,
    lineHeight: 18,
  },
  md: {
    fontSize: 15,
    lineHeight: 20,
  },
  lg: {
    fontSize: 17,
    lineHeight: 22,
  },
});

const variantStyles = {
  primary: StyleSheet.create({
    container: {
      backgroundColor: PinkTokens.colors.brand.primary,
    },
    pressed: {
      backgroundColor: PinkTokens.colors.brand.primaryDark,
    },
    text: {
      color: PinkTokens.colors.text.inverted,
    },
  }),
  secondary: StyleSheet.create({
    container: {
      backgroundColor: PinkTokens.colors.brand.soft,
    },
    pressed: {
      backgroundColor: '#FBCFE8',
    },
    text: {
      color: PinkTokens.colors.brand.primary,
    },
  }),
  outline: StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: PinkTokens.colors.brand.primary,
    },
    pressed: {
      backgroundColor: PinkTokens.colors.brand.soft,
    },
    text: {
      color: PinkTokens.colors.brand.primary,
    },
  }),
  ghost: StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    pressed: {
      backgroundColor: '#F1F5F9',
    },
    text: {
      color: PinkTokens.colors.text.primary,
    },
  }),
  danger: StyleSheet.create({
    container: {
      backgroundColor: '#DC2626',
    },
    pressed: {
      backgroundColor: '#B91C1C',
    },
    text: {
      color: PinkTokens.colors.text.inverted,
    },
  }),
};
