import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { PinkTokens } from '@/theme/tokens';

export interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function Input({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  editable = true,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(errorText);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          hasError && styles.inputWrapperError,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

        <TextInput
          accessibilityLabel={label || textInputProps.placeholder}
          editable={editable}
          placeholderTextColor={PinkTokens.colors.text.muted}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.textInput,
            !editable && styles.textInputDisabled,
            inputStyle,
          ]}
          {...textInputProps}
        />

        {rightIcon ? (
          <Pressable
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            hitSlop={8}
            style={styles.iconRight}
          >
            {rightIcon}
          </Pressable>
        ) : null}
      </View>

      {hasError ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: PinkTokens.spacing.md,
  },
  label: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.xs,
  },
  inputWrapper: {
    minHeight: PinkTokens.touch.minTarget, // 48dp minimum touch target
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PinkTokens.colors.canvas.surface,
    borderWidth: 1,
    borderColor: PinkTokens.colors.border.divider,
    borderRadius: PinkTokens.radius.md,
    paddingHorizontal: PinkTokens.spacing.md,
  },
  inputWrapperFocused: {
    borderColor: PinkTokens.colors.brand.borderFocus,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  inputWrapperError: {
    borderColor: PinkTokens.colors.status.absent.text,
    borderWidth: 1.5,
  },
  inputWrapperDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  textInput: {
    flex: 1,
    ...PinkTokens.typography.bodyMedium,
    color: PinkTokens.colors.text.primary,
    paddingVertical: PinkTokens.spacing.sm,
  },
  textInputDisabled: {
    color: PinkTokens.colors.text.muted,
  },
  iconLeft: {
    marginRight: PinkTokens.spacing.sm,
  },
  iconRight: {
    marginLeft: PinkTokens.spacing.sm,
  },
  errorText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.status.absent.text,
    marginTop: PinkTokens.spacing.xs,
  },
  helperText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: PinkTokens.spacing.xs,
  },
});
