import { Stack } from 'expo-router';
import { PinkTokens } from '@/theme/tokens';

export default function AuthLayout() {
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
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Account Recovery',
          headerBackTitle: 'Login',
        }}
      />
    </Stack>
  );
}
