import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  MapPin,
  Flame,
  ArrowRightLeft,
  CalendarPlus,
  AlertTriangle,
  Users,
  ShieldCheck,
} from 'lucide-react-native';
import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge, Avatar } from '@/components/ui';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  MOCK_ATTENDANCE_LOGS,
  MOCK_STAFFING_ALERTS,
} from '@/services/mock/clinicalData';

export default function HomeDashboardScreen() {
  const { user, switchDevRole } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnShift, setIsOnShift] = useState(true);

  const [clockInTime, setClockInTime] = useState('06:54 AM');

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handlePunchToggle = () => {
    if (isOnShift) {
      Alert.alert(
        'Confirm Punch Out',
        'Have you completed patient handover with the incoming shift lead?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Punch Out',
            style: 'destructive',
            onPress: () => {
              setIsOnShift(false);
              Alert.alert('Punched Out', 'Shift ended at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            },
          },
        ]
      );
    } else {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsOnShift(true);
      setClockInTime(now);
      Alert.alert('Punched In', `Biometric GPS verified in Ward at ${now}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={PinkTokens.colors.brand.primary}
          />
        }
      >
        {/* Top Clinical Header */}
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Avatar
              name={user?.fullName || 'Staff'}
              imageUri={user?.avatarUrl}
              size="lg"
              status={isOnShift ? 'on-duty' : 'off-duty'}
            />
            <View style={styles.userText}>
              <Text style={styles.greeting}>Namaste,</Text>
              <Text style={styles.userName}>{user?.fullName}</Text>
              <View style={styles.designationRow}>
                <Badge
                  label={user?.departmentName || 'General Ward'}
                  variant="brand"
                  size="sm"
                />
                {user?.councilNumber ? (
                  <Badge
                    label={user.councilNumber}
                    variant="present"
                    size="sm"
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>

        {/* Active Shift Status Banner */}
        <Card padding="lg" variant="elevated" style={styles.shiftCard}>
          <View style={styles.shiftHeader}>
            <View style={styles.shiftTitleRow}>
              <Clock size={18} color={PinkTokens.colors.brand.primary} />
              <Text style={styles.shiftTitle}>
                {isOnShift ? 'Active Clinical Shift' : 'Off-Duty Roster'}
              </Text>
            </View>
            <Badge
              label={isOnShift ? 'ON DUTY' : 'OFF DUTY'}
              variant={isOnShift ? 'present' : 'weeklyOff'}
              size="sm"
            />
          </View>

          <View style={styles.shiftDetails}>
            <View style={styles.shiftDetailItem}>
              <Text style={styles.detailLabel}>Shift Window</Text>
              <Text style={styles.detailValue}>07:00 AM – 03:00 PM</Text>
            </View>
            <View style={styles.shiftDetailItem}>
              <Text style={styles.detailLabel}>Clocked In</Text>
              <Text style={styles.detailValue}>{isOnShift ? clockInTime : '—'}</Text>
            </View>
            <View style={styles.shiftDetailItem}>
              <Text style={styles.detailLabel}>Geofence Location</Text>
              <View style={styles.locationRow}>
                <MapPin size={13} color={PinkTokens.colors.brand.primary} />
                <Text style={styles.locationText} numberOfLines={1}>
                  ICU Ward 3 (Verified)
                </Text>
              </View>
            </View>
          </View>

          {/* Punctuality Streak Pip */}
          <View style={styles.streakStrip}>
            <Flame size={16} color="#EA580C" />
            <Text style={styles.streakText}>
              14-Day Punctuality Streak • On track for Shift Hero Award
            </Text>
          </View>

          {/* Quick Punch Button */}
          <Button
            title={isOnShift ? 'Punch Out & Handover' : 'Biometric GPS Punch In'}
            variant={isOnShift ? 'secondary' : 'primary'}
            size="lg"
            fullWidth
            onPress={handlePunchToggle}
            style={styles.punchBtn}
          />
        </Card>

        {/* Quick Clinical Actions */}
        <Text style={styles.sectionTitle}>Quick Clinical Actions</Text>
        <View style={styles.actionGrid}>
          <Card
            padding="md"
            variant="default"
            onPress={() => router.push('/(tabs)/attendance')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FCE7F3' }]}>
              <Clock size={20} color={PinkTokens.colors.brand.primary} />
            </View>
            <Text style={styles.actionTitle}>Punch Calendar</Text>
            <Text style={styles.actionDesc}>45% Split View</Text>
          </Card>

          <Card
            padding="md"
            variant="default"
            onPress={() => router.push('/(tabs)/leave')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#DCFCE7' }]}>
              <CalendarPlus size={20} color="#16A34A" />
            </View>
            <Text style={styles.actionTitle}>Apply Leave</Text>
            <Text style={styles.actionDesc}>8 Casual Days left</Text>
          </Card>

          <Card
            padding="md"
            variant="default"
            onPress={() => Alert.alert('Shift Swap', 'Opening peer shift swap board for ICU Ward 3')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FEF3C7' }]}>
              <ArrowRightLeft size={20} color="#D97706" />
            </View>
            <Text style={styles.actionTitle}>Shift Swap</Text>
            <Text style={styles.actionDesc}>Trade with peers</Text>
          </Card>

          <Card
            padding="md"
            variant="default"
            onPress={() => router.push('/(tabs)/directory')}
            style={styles.actionCard}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#F3E8FF' }]}>
              <Users size={20} color="#7C3AED" />
            </View>
            <Text style={styles.actionTitle}>Ward Staff</Text>
            <Text style={styles.actionDesc}>5 on duty now</Text>
          </Card>
        </View>

        {/* Urgent Staffing Alert Broadcast Banner */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Urgent Ward Broadcasts</Text>
          <Badge label="1 Active" variant="absent" size="sm" />
        </View>

        {MOCK_STAFFING_ALERTS.map((alert) => (
          <Card key={alert.id} padding="md" variant="elevated" style={styles.alertCard}>
            <View style={styles.alertRow}>
              <View style={styles.alertIconWrapper}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <View style={styles.alertBody}>
                <View style={styles.alertTitleRow}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertTime}>{alert.timestamp}</Text>
                </View>
                <Text style={styles.alertDesc}>
                  Needs {alert.requiredRole} for {alert.shift}. Overtime rates apply.
                </Text>
                <Button
                  title="Claim Volunteer Shift (+1.5x)"
                  variant="outline"
                  size="sm"
                  onPress={() => Alert.alert('Claimed', 'Shift request submitted to Head Nurse for signoff.')}
                  style={styles.claimBtn}
                />
              </View>
            </View>
          </Card>
        ))}

        {/* Recent Attendance Punch Stream Preview */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Punch Logs</Text>
          <Button
            title="See All"
            variant="ghost"
            size="sm"
            onPress={() => router.push('/(tabs)/attendance')}
          />
        </View>

        {MOCK_ATTENDANCE_LOGS.slice(0, 3).map((log) => (
          <Card key={log.id} padding="md" variant="default" style={styles.logCard}>
            <View style={styles.logRow}>
              <View style={styles.logLeft}>
                <Text style={styles.logDate}>{log.dayName}, {log.date}</Text>
                <Text style={styles.logShift}>{log.shiftTitle}</Text>
                <Text style={styles.logLocation}>{log.location}</Text>
              </View>
              <View style={styles.logRight}>
                <Badge label={log.status.toUpperCase()} variant={log.status} size="sm" />
                <Text style={styles.logHours}>
                  {log.clockIn ? `${log.clockIn} – ${log.clockOut || 'Active'}` : 'Off Duty'}
                </Text>
              </View>
            </View>
          </Card>
        ))}

        {/* Dev Quick Role Switcher */}
        <Card padding="md" variant="subtle" style={styles.devCard}>
          <View style={styles.devHeader}>
            <ShieldCheck size={16} color={PinkTokens.colors.brand.primary} />
            <Text style={styles.devTitle}>Switch Active Role (Testing Harness)</Text>
          </View>
          <View style={styles.devButtons}>
            <Button
              title="Nurse (Staff)"
              size="sm"
              variant={user?.role === 'STAFF' ? 'primary' : 'outline'}
              onPress={() => switchDevRole('STAFF')}
              style={styles.devBtn}
            />
            <Button
              title="Doctor (Dept Head)"
              size="sm"
              variant={user?.role === 'DEPT_HEAD' ? 'primary' : 'outline'}
              onPress={() => switchDevRole('DEPT_HEAD')}
              style={styles.devBtn}
            />
            <Button
              title="Admin (HR)"
              size="sm"
              variant={user?.role === 'HR_ADMIN' ? 'primary' : 'outline'}
              onPress={() => switchDevRole('HR_ADMIN')}
              style={styles.devBtn}
            />
          </View>
        </Card>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PinkTokens.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userText: {
    flex: 1,
  },
  greeting: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
  },
  userName: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
  },
  designationRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  shiftCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  shiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PinkTokens.spacing.md,
  },
  shiftTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shiftTitle: {
    ...PinkTokens.typography.bodyLarge,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  shiftDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: PinkTokens.spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: PinkTokens.colors.border.divider,
    marginBottom: PinkTokens.spacing.md,
  },
  shiftDetailItem: {
    flex: 1,
  },
  detailLabel: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
  },
  detailValue: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  locationText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.brand.primary,
    fontWeight: '500',
  },
  streakStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: PinkTokens.radius.sm,
    marginBottom: PinkTokens.spacing.md,
  },
  streakText: {
    ...PinkTokens.typography.caption,
    color: '#C2410C',
    fontWeight: '600',
  },
  punchBtn: {
    marginTop: PinkTokens.spacing.xs,
  },
  sectionTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: PinkTokens.spacing.md,
    marginBottom: PinkTokens.spacing.sm,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: PinkTokens.spacing.lg,
  },
  actionCard: {
    width: '48%',
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  actionDesc: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  alertCard: {
    marginBottom: PinkTokens.spacing.md,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  alertRow: {
    flexDirection: 'row',
    gap: 10,
  },
  alertIconWrapper: {
    paddingTop: 2,
  },
  alertBody: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitle: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '700',
    color: '#991B1B',
  },
  alertTime: {
    ...PinkTokens.typography.caption,
    color: '#DC2626',
  },
  alertDesc: {
    ...PinkTokens.typography.caption,
    color: '#7F1D1D',
    marginTop: 2,
    marginBottom: 8,
  },
  claimBtn: {
    borderColor: '#DC2626',
    alignSelf: 'flex-start',
  },
  logCard: {
    marginBottom: PinkTokens.spacing.sm,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logLeft: {
    flex: 1,
  },
  logDate: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  logShift: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  logLocation: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
  },
  logRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  logHours: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    fontWeight: '500',
  },
  devCard: {
    marginTop: PinkTokens.spacing.lg,
  },
  devHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: PinkTokens.spacing.sm,
  },
  devTitle: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.brand.primary,
  },
  devButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  devBtn: {
    flex: 1,
  },
});
