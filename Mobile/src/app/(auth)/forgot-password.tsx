import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Mail, BadgeCheck, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PinkTokens } from '@/theme/tokens';
import { Button, Input, Card } from '@/components/ui';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !employeeCode) {
      Alert.alert('Required Fields', 'Please supply your registered work email and Employee Code');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card padding="lg" variant="elevated" style={styles.card}>
            {isSubmitted ? (
              <>
                <Text style={styles.title}>Check Your Work Email</Text>
                <Text style={styles.subtitle}>
                  A password reset instruction token has been dispatched to {email}. Follow the instructions to recover access.
                </Text>
                <Button
                  title="Back to Sign In"
                  variant="primary"
                  fullWidth
                  onPress={() => router.replace('/(auth)/login')}
                  style={styles.actionBtn}
                />
              </>
            ) : (
              <>
                <Text style={styles.title}>Credential Reset</Text>
                <Text style={styles.subtitle}>
                  Enter your hospital email address and HR employee ID code to verify your credentials.
                </Text>

                <Input
                  label="Registered Work Email"
                  placeholder="nurse.name@carepulse.hospital"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  leftIcon={<Mail size={20} color={PinkTokens.colors.text.muted} />}
                />

                <Input
                  label="Employee ID Code"
                  placeholder="e.g. EMP-NUR-104"
                  value={employeeCode}
                  onChangeText={setEmployeeCode}
                  autoCapitalize="characters"
                  leftIcon={<BadgeCheck size={20} color={PinkTokens.colors.text.muted} />}
                />

                <Button
                  title="Request Reset Link"
                  variant="primary"
                  fullWidth
                  onPress={handleSubmit}
                  style={styles.actionBtn}
                />

                <Button
                  title="Back to Login"
                  variant="ghost"
                  leftIcon={<ArrowLeft size={18} color={PinkTokens.colors.text.primary} />}
                  onPress={() => router.back()}
                  style={styles.backBtn}
                />
              </>
            )}
          </Card>
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
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    justifyContent: 'center',
    flexGrow: 1,
  },
  card: {
    marginVertical: PinkTokens.spacing.md,
  },
  title: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.xs,
  },
  subtitle: {
    ...PinkTokens.typography.bodyMedium,
    color: PinkTokens.colors.text.secondary,
    marginBottom: PinkTokens.spacing.lg,
  },
  actionBtn: {
    marginTop: PinkTokens.spacing.sm,
  },
  backBtn: {
    marginTop: PinkTokens.spacing.sm,
  },
});
