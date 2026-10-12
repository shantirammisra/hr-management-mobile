import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserCheck,
  ShieldCheck,
  Fingerprint,
  Phone,
  Mail,
  LogOut,
  Hospital,
} from 'lucide-react-native';

import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge, Avatar } from '@/components/ui';
import { useAuthStore } from '@/features/auth/stores/authStore';

export default function ProfileScreen() {
  const { user, isBiometricEnrolled, setBiometricEnrolled, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of the clinical session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <UserCheck size={22} color={PinkTokens.colors.brand.primary} />
          <Text style={styles.headerTitle}>Clinical Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Identity Card */}
        <Card padding="lg" variant="elevated" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              name={user?.fullName || 'Staff'}
              imageUri={user?.avatarUrl}
              size="xl"
              status="on-duty"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>{user?.fullName}</Text>
              <Text style={styles.designation}>{user?.designation}</Text>
              <Text style={styles.empCode}>{user?.employeeCode}</Text>
              <View style={styles.badgeRow}>
                <Badge label={user?.role || 'STAFF'} variant="brand" size="sm" />
                {user?.councilNumber ? (
                  <Badge
                    label={`${user.councilType}: ${user.councilNumber}`}
                    variant="present"
                    size="sm"
                  />
                ) : null}
              </View>
            </View>
          </View>
        </Card>

        {/* Clinical Licensing Accreditation */}
        <Text style={styles.sectionTitle}>Medical Licensing Status</Text>
        <Card padding="md" variant="default" style={styles.licenseCard}>
          <View style={styles.licenseRow}>
            <ShieldCheck size={22} color="#16A34A" />
            <View style={styles.licenseText}>
              <Text style={styles.licenseCouncil}>
                {user?.councilType === 'NNC'
                  ? 'Nepal Nursing Council'
                  : user?.councilType === 'NMC'
                  ? 'Nepal Medical Council'
                  : user?.councilType === 'NPC'
                  ? 'Nepal Pharmacy Council'
                  : 'Hospital Administration Board'}
              </Text>
              <Text style={styles.licenseDetail}>
                Reg: {user?.councilNumber || 'Official Staff Record'} • Active until{' '}
                {user?.councilExpiryDate || '2028-12-31'}
              </Text>
            </View>
            <Badge label="Verified" variant="present" size="sm" />
          </View>
        </Card>

        {/* Security & Biometrics */}
        <Text style={styles.sectionTitle}>Security & Fast Punch</Text>
        <Card padding="md" variant="default" style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Fingerprint size={22} color={PinkTokens.colors.brand.primary} />
              <View>
                <Text style={styles.settingTitle}>FaceID / Biometric Login</Text>
                <Text style={styles.settingSub}>Fast attendance punch and portal unlock</Text>
              </View>
            </View>
            <Switch
              value={isBiometricEnrolled}
              onValueChange={setBiometricEnrolled}
              trackColor={{ false: '#CBD5E1', true: PinkTokens.colors.brand.soft }}
              thumbColor={isBiometricEnrolled ? PinkTokens.colors.brand.primary : '#FFFFFF'}
            />
          </View>
        </Card>

        {/* Hospital Contact Details */}
        <Text style={styles.sectionTitle}>Hospital Contacts</Text>
        <Card padding="md" variant="default" style={styles.contactCard}>
          <View style={styles.contactItem}>
            <Mail size={18} color={PinkTokens.colors.text.secondary} />
            <Text style={styles.contactText}>{user?.email}</Text>
          </View>
          <View style={styles.contactDivider} />
          <View style={styles.contactItem}>
            <Phone size={18} color={PinkTokens.colors.text.secondary} />
            <Text style={styles.contactText}>{user?.phone || '+977 9841000000'}</Text>
          </View>
          <View style={styles.contactDivider} />
          <View style={styles.contactItem}>
            <Hospital size={18} color={PinkTokens.colors.text.secondary} />
            <Text style={styles.contactText}>{user?.departmentName}</Text>
          </View>
        </Card>

        {/* Sign Out Button */}
        <Button
          title="Sign Out of Session"
          variant="danger"
          size="lg"
          fullWidth
          leftIcon={<LogOut size={18} color="#FFFFFF" />}
          onPress={handleLogout}
          style={styles.logoutBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PinkTokens.colors.canvas.background,
  },
  header: {
    paddingHorizontal: PinkTokens.spacing.lg,
    paddingVertical: PinkTokens.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
  },
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    paddingBottom: PinkTokens.spacing.xxl,
  },
  profileCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileInfo: {
    flex: 1,
  },
  fullName: {
    ...PinkTokens.typography.bodyLarge,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  designation: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  empCode: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.sm,
    marginTop: PinkTokens.spacing.xs,
  },
  licenseCard: {
    marginBottom: PinkTokens.spacing.md,
  },
  licenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  licenseText: {
    flex: 1,
  },
  licenseCouncil: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  licenseDetail: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  settingsCard: {
    marginBottom: PinkTokens.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  settingSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 1,
  },
  contactCard: {
    marginBottom: PinkTokens.spacing.xl,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  contactText: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.primary,
  },
  contactDivider: {
    height: 1,
    backgroundColor: PinkTokens.colors.border.divider,
    marginVertical: 8,
  },
  logoutBtn: {
    marginBottom: PinkTokens.spacing.xl,
  },
});
