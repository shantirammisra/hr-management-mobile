import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ShieldCheck, Fingerprint, Stethoscope, Lock, Mail } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PinkTokens } from '@/theme/tokens';
import { Button, Input, Card } from '@/components/ui';
import { useAuthStore, MOCK_USERS } from '@/features/auth/stores/authStore';
import { UserRole } from '@/types/auth.types';

export default function LoginScreen() {
  const { login, loginWithBiometrics, switchDevRole, isLoading, user } = useAuthStore();
  const [email, setEmail] = useState('priya.thapa@carepulse.hospital');
  const [password, setPassword] = useState('password123');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter your clinical email and password');
      return;
    }
    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials or staff ID');
    }
  };

  const handleBiometricLogin = async () => {
    const success = await loginWithBiometrics();
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Biometric Error', 'Could not verify biometrics. Please use credentials.');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    switchDevRole(role);
    setEmail(MOCK_USERS[role].email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Stethoscope size={36} color={PinkTokens.colors.brand.primary} />
            </View>
            <Text style={styles.brandTitle}>CAREPULSE HR</Text>
            <Text style={styles.brandSubtitle}>
              Clinical Workforce Management & Smart Attendance
            </Text>
          </View>

          {/* Quick Role Switcher (For Development & Demonstration) */}
          <Card padding="md" variant="subtle" style={styles.roleCard}>
            <View style={styles.roleHeader}>
              <ShieldCheck size={16} color={PinkTokens.colors.brand.primary} />
              <Text style={styles.roleLabel}>Quick Role Switcher (Dev Mode)</Text>
            </View>
            <View style={styles.roleButtons}>
              {(['STAFF', 'DEPT_HEAD', 'HR_ADMIN'] as UserRole[]).map((r) => {
                const isSelected = user?.role === r;
                return (
                  <Button
                    key={r}
                    title={r === 'STAFF' ? 'Nurse' : r === 'DEPT_HEAD' ? 'Doctor' : 'Admin'}
                    variant={isSelected ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => handleRoleSelect(r)}
                    style={styles.roleBtn}
                  />
                );
              })}
            </View>
          </Card>

          {/* Login Form */}
          <Card padding="lg" variant="elevated" style={styles.formCard}>
            <Text style={styles.formTitle}>Staff Portal Login</Text>

            <Input
              label="Hospital Email or Staff ID"
              placeholder="e.g. nurse.priya@carepulse.hospital"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              leftIcon={<Mail size={20} color={PinkTokens.colors.text.muted} />}
            />

            <Input
              label="Portal Password / PIN"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={PinkTokens.colors.text.muted} />}
            />

            <Button
              title="Sign In to Roster"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              onPress={handleLogin}
              style={styles.submitBtn}
            />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR FAST SIGN-IN</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Biometric / FaceID Unlock"
              variant="secondary"
              size="md"
              fullWidth
              leftIcon={<Fingerprint size={20} color={PinkTokens.colors.brand.primary} />}
              onPress={handleBiometricLogin}
            />

            <Button
              title="Forgot Credentials?"
              variant="ghost"
              size="sm"
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotBtn}
            />
          </Card>

          <Text style={styles.footerText}>
            Secured for Nepal Medical & Nursing Council Standards • ISO 27001
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PinkTokens.colors.canvas.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    paddingBottom: PinkTokens.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginVertical: PinkTokens.spacing.lg,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: PinkTokens.colors.canvas.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PinkTokens.spacing.md,
    borderWidth: 1.5,
    borderColor: PinkTokens.colors.brand.soft,
    ...PinkTokens.shadows.card,
  },
  brandTitle: {
    ...PinkTokens.typography.titleLarge,
    color: PinkTokens.colors.brand.primary,
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 280,
  },
  roleCard: {
    marginBottom: PinkTokens.spacing.md,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: PinkTokens.spacing.sm,
  },
  roleLabel: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.brand.primary,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  roleBtn: {
    flex: 1,
  },
  formCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  formTitle: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.lg,
  },
  submitBtn: {
    marginTop: PinkTokens.spacing.xs,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: PinkTokens.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: PinkTokens.colors.border.divider,
  },
  dividerText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
    marginHorizontal: PinkTokens.spacing.sm,
    letterSpacing: 0.5,
  },
  forgotBtn: {
    marginTop: PinkTokens.spacing.sm,
  },
  footerText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
    textAlign: 'center',
  },
});
