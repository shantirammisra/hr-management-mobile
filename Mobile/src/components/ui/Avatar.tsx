import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { PinkTokens } from '@/theme/tokens';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'on-duty' | 'off-duty' | 'busy';

export interface AvatarProps {
  name: string;
  imageUri?: string | null;
  size?: AvatarSize;
  status?: AvatarStatus;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({
  name,
  imageUri,
  size = 'md',
  status,
  style,
}: AvatarProps) {
  const initials = getInitials(name);
  const sizeConfig = avatarSizes[size];

  return (
    <View style={[styles.wrapper, { width: sizeConfig.dim, height: sizeConfig.dim }, style]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: sizeConfig.dim, height: sizeConfig.dim, borderRadius: sizeConfig.dim / 2 }]}
          contentFit="cover"
          accessibilityLabel={`${name} avatar`}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: sizeConfig.dim,
              height: sizeConfig.dim,
              borderRadius: sizeConfig.dim / 2,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: sizeConfig.fontSize }]}>
            {initials}
          </Text>
        </View>
      )}

      {status ? (
        <View
          style={[
            styles.statusPip,
            {
              backgroundColor: statusColors[status],
              width: sizeConfig.pipDim,
              height: sizeConfig.pipDim,
              borderRadius: sizeConfig.pipDim / 2,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const statusColors: Record<AvatarStatus, string> = {
  online: '#16A34A',
  'on-duty': '#BE185D',
  'off-duty': '#94A3B8',
  busy: '#DC2626',
};

const avatarSizes: Record<AvatarSize, { dim: number; fontSize: number; pipDim: number }> = {
  sm: { dim: 32, fontSize: 12, pipDim: 8 },
  md: { dim: 44, fontSize: 16, pipDim: 11 },
  lg: { dim: 60, fontSize: 22, pipDim: 14 },
  xl: { dim: 80, fontSize: 28, pipDim: 18 },
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  image: {
    backgroundColor: PinkTokens.colors.brand.soft,
    borderWidth: 1.5,
    borderColor: PinkTokens.colors.brand.soft,
  },
  fallback: {
    backgroundColor: PinkTokens.colors.brand.soft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: PinkTokens.colors.brand.borderFocus,
  },
  initials: {
    fontWeight: '700',
    color: PinkTokens.colors.brand.primary,
  },
  statusPip: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
