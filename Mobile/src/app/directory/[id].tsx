import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  Phone,
  Clock,
  Flame,
  ArrowRightLeft,
  Building,
} from 'lucide-react-native';

import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge, Avatar } from '@/components/ui';
import { MOCK_STAFF_MEMBERS } from '@/services/mock/clinicalData';

export default function StaffDetailProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const staff =
    MOCK_STAFF_MEMBERS.find((s) => s.id === id) || MOCK_STAFF_MEMBERS[0];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Identity Card */}
        <Card padding="lg" variant="elevated" style={styles.card}>
          <View style={styles.avatarRow}>
            <Avatar
              name={staff.fullName}
              imageUri={staff.avatarUrl}
              size="xl"
              status={staff.isOnDuty ? 'on-duty' : 'off-duty'}
            />
            <View style={styles.avatarText}>
              <Text style={styles.name}>{staff.fullName}</Text>
              <Text style={styles.designation}>{staff.designation}</Text>
              <Text style={styles.dept}>{staff.departmentName}</Text>
              <View style={styles.badgeRow}>
                <Badge
                  label={staff.isOnDuty ? '🟢 On Shift' : '⚪ Off Duty'}
                  variant={staff.isOnDuty ? 'present' : 'weeklyOff'}
                  size="sm"
                />
                <Badge label={staff.employeeCode} variant="brand" size="sm" />
              </View>
            </View>
          </View>
        </Card>

        {/* Clinical Licensing Accreditation */}
        <Text style={styles.sectionTitle}>Regulatory Accreditation</Text>
        <Card padding="lg" variant="default" style={styles.card}>
          <View style={styles.licenseRow}>
            <ShieldCheck size={22} color="#16A34A" />
            <View style={styles.licenseInfo}>
              <Text style={styles.licenseCouncil}>
                {staff.councilType === 'NNC'
                  ? 'Nepal Nursing Council (NNC)'
                  : staff.councilType === 'NMC'
                  ? 'Nepal Medical Council (NMC)'
                  : staff.councilType === 'NPC'
                  ? 'Nepal Pharmacy Council (NPC)'
                  : 'Hospital Staff Registry'}
              </Text>
              <Text style={styles.licenseNo}>
                License: {staff.councilNumber || 'Official Healthcare Staff'}
              </Text>
              <Text style={styles.licenseExpiry}>
                Valid Until: {staff.councilExpiryDate || '2028-12-31'}
              </Text>
            </View>
            <Badge label="Active" variant="present" size="sm" />
          </View>
        </Card>

        {/* Current Ward Assignment */}
        <Text style={styles.sectionTitle}>Clinical Duty Assignment</Text>
        <Card padding="md" variant="default" style={styles.card}>
          <View style={styles.dutyItem}>
            <Building size={18} color={PinkTokens.colors.brand.primary} />
            <Text style={styles.dutyText}>Ward: {staff.wardAssignment}</Text>
          </View>
          <View style={styles.dutyDivider} />
          <View style={styles.dutyItem}>
            <Clock size={18} color={PinkTokens.colors.brand.primary} />
            <Text style={styles.dutyText}>Current Shift: {staff.currentShift}</Text>
          </View>
          <View style={styles.dutyDivider} />
          <View style={styles.dutyItem}>
            <Flame size={18} color="#EA580C" />
            <Text style={styles.dutyText}>
              Punctuality Streak: {staff.punctualityStreakDays} Days
            </Text>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Button
            title="Call Extension"
            variant="outline"
            leftIcon={<Phone size={18} color={PinkTokens.colors.brand.primary} />}
            onPress={() => Alert.alert('Calling Ward', `Connecting to ${staff.phone}...`)}
            style={styles.actionBtn}
          />
          <Button
            title="Request Shift Swap"
            variant="secondary"
            leftIcon={<ArrowRightLeft size={18} color={PinkTokens.colors.brand.primary} />}
            onPress={() => Alert.alert('Shift Swap Request', `Swap invitation sent to ${staff.fullName}`)}
            style={styles.actionBtn}
          />
        </View>

        <Button
          title="Back to Staff Directory"
          variant="ghost"
          onPress={() => router.back()}
          style={styles.backBtn}
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
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    paddingBottom: PinkTokens.spacing.xxl,
  },
  card: {
    marginBottom: PinkTokens.spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarText: {
    flex: 1,
  },
  name: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
  },
  designation: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  dept: {
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
  licenseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  licenseInfo: {
    flex: 1,
  },
  licenseCouncil: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  licenseNo: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  licenseExpiry: {
    ...PinkTokens.typography.caption,
    color: '#16A34A',
    marginTop: 2,
    fontWeight: '600',
  },
  dutyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  dutyText: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.primary,
  },
  dutyDivider: {
    height: 1,
    backgroundColor: PinkTokens.colors.border.divider,
    marginVertical: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: PinkTokens.spacing.sm,
  },
  actionBtn: {
    flex: 1,
  },
  backBtn: {
    marginTop: PinkTokens.spacing.md,
  },
});
