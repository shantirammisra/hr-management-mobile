import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CalendarClock,
  Plus,
  UserCheck,
  ChevronRight,
  ClipboardList,
} from 'lucide-react-native';

import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge } from '@/components/ui';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  MOCK_LEAVE_BALANCES,
  MOCK_LEAVE_REQUESTS,
} from '@/services/mock/clinicalData';

export default function LeaveScreen() {
  const { user } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isApprover = user?.role === 'DEPT_HEAD' || user?.role === 'HR_ADMIN';

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <CalendarClock size={22} color={PinkTokens.colors.brand.primary} />
          <Text style={styles.headerTitle}>Clinical Leave & CME</Text>
        </View>
        <Button
          title="Apply"
          variant="primary"
          size="sm"
          leftIcon={<Plus size={16} color="#FFFFFF" />}
          onPress={() => router.push('/leave/apply')}
        />
      </View>

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
        {/* Supervisor Approval Queue Callout (If Manager) */}
        {isApprover && (
          <Card
            padding="md"
            variant="elevated"
            onPress={() => router.push('/leave/approvals')}
            style={styles.approverCard}
          >
            <View style={styles.approverRow}>
              <View style={styles.approverIconBox}>
                <ClipboardList size={22} color={PinkTokens.colors.brand.primary} />
              </View>
              <View style={styles.approverText}>
                <Text style={styles.approverTitle}>Supervisor Approval Queue</Text>
                <Text style={styles.approverSub}>
                  1 staff request pending departmental coverage sign-off
                </Text>
              </View>
              <ChevronRight size={18} color={PinkTokens.colors.text.muted} />
            </View>
          </Card>
        )}

        {/* Leave Balances Grid */}
        <Text style={styles.sectionTitle}>Available Quota (2026/27)</Text>
        <View style={styles.balanceGrid}>
          {MOCK_LEAVE_BALANCES.map((bal, idx) => (
            <Card key={idx} padding="md" variant="default" style={styles.balanceCard}>
              <Text style={styles.balanceType}>{bal.type}</Text>
              <View style={styles.balanceRow}>
                <Text style={[styles.balanceRemaining, { color: bal.color }]}>
                  {bal.remaining}
                </Text>
                <Text style={styles.balanceTotal}>/{bal.total} d</Text>
              </View>
              <Text style={styles.balanceUsed}>{bal.used} days utilized</Text>
            </Card>
          ))}
        </View>

        {/* Leave Request Stream */}
        <View style={styles.streamHeader}>
          <Text style={styles.sectionTitle}>My Leave Applications</Text>
          <Badge label="2 Applications" variant="brand" size="sm" />
        </View>

        {MOCK_LEAVE_REQUESTS.map((req) => {
          const isPending = req.status === 'PENDING';

          return (
            <Card key={req.id} padding="lg" variant="default" style={styles.reqCard}>
              <View style={styles.reqHeader}>
                <View>
                  <Text style={styles.reqType}>{req.leaveType} Leave</Text>
                  <Text style={styles.reqDates}>
                    {req.startDate} → {req.endDate} ({req.totalDays} days)
                  </Text>
                </View>
                <Badge
                  label={req.status}
                  variant={isPending ? 'late' : 'present'}
                  size="sm"
                />
              </View>

              <Text style={styles.reqReason} numberOfLines={2}>
                &ldquo;{req.reason}&rdquo;
              </Text>

              <View style={styles.handoverBox}>
                <UserCheck size={14} color={PinkTokens.colors.text.secondary} />
                <Text style={styles.handoverText}>
                  Coverage handover designated: <Text style={styles.handoverBold}>{req.handoverStaffName}</Text>
                </Text>
              </View>
            </Card>
          );
        })}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  approverCard: {
    marginBottom: PinkTokens.spacing.lg,
    borderColor: PinkTokens.colors.brand.soft,
    backgroundColor: '#FFFFFF',
  },
  approverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  approverIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: PinkTokens.colors.brand.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approverText: {
    flex: 1,
  },
  approverTitle: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.brand.primary,
  },
  approverSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  sectionTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.sm,
  },
  balanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: PinkTokens.spacing.lg,
  },
  balanceCard: {
    width: '48%',
  },
  balanceType: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.text.secondary,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  balanceRemaining: {
    fontSize: 26,
    fontWeight: '800',
  },
  balanceTotal: {
    fontSize: 13,
    color: PinkTokens.colors.text.muted,
    marginLeft: 2,
  },
  balanceUsed: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
  },
  streamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PinkTokens.spacing.sm,
  },
  reqCard: {
    marginBottom: PinkTokens.spacing.md,
  },
  reqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: PinkTokens.spacing.sm,
  },
  reqType: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  reqDates: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  reqReason: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.primary,
    fontStyle: 'italic',
    marginBottom: PinkTokens.spacing.sm,
  },
  handoverBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: PinkTokens.radius.sm,
  },
  handoverText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
  },
  handoverBold: {
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
});
