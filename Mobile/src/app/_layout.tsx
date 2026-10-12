import React, { useEffect, useState } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { PinkTokens } from '@/theme/tokens';
import { useAuthStore } from '@/features/auth/stores/authStore';

SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigationShell />
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}

function RootNavigationShell() {
  const { isAuthenticated, checkSession } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    async function prepare() {
      await checkSession();
      setIsReady(true);
      await SplashScreen.hideAsync().catch(() => {});
    }
    prepare();
  }, [checkSession]);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isReady, segments]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PinkTokens.colors.brand.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: PinkTokens.colors.canvas.background,
        },
        headerTintColor: PinkTokens.colors.brand.primary,
        headerTitleStyle: {
          fontWeight: '600',
          color: PinkTokens.colors.text.primary,
        },
        contentStyle: {
          backgroundColor: PinkTokens.colors.canvas.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="attendance/[date]"
        options={{
          presentation: 'modal',
          title: 'Daily Punch Log & Audit',
        }}
      />
      <Stack.Screen
        name="leave/apply"
        options={{
          presentation: 'modal',
          title: 'Apply for Leave',
        }}
      />
      <Stack.Screen
        name="leave/approvals"
        options={{
          title: 'Leave Approvals',
        }}
      />
      <Stack.Screen
        name="directory/[id]"
        options={{
          title: 'Staff Profile & License',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PinkTokens.colors.canvas.background,
  },
});
