import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CheckCircle2,
  UserCheck,
  Calendar,
} from 'lucide-react-native';
import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_LEAVE_REQUESTS, LeaveRequest } from '@/services/mock/clinicalData';


export default function LeaveApprovalsScreen() {
  const [requests, setRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' } : r
      )
    );
    Alert.alert(
      action === 'APPROVE' ? 'Approved' : 'Rejected',
      `Leave request status updated. Applicant and roster scheduler notified.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ward Safety Banner */}
        <Card padding="md" variant="subtle" style={styles.safetyCard}>
          <View style={styles.safetyRow}>
            <CheckCircle2 size={18} color="#16A34A" />
            <Text style={styles.safetyText}>
              Ward Coverage: ICU Bed Ratios are within safe clinical thresholds (1 Nurse : 2 Patients).
            </Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Pending Departmental Sign-off</Text>

        {requests.map((req) => (
          <Card key={req.id} padding="lg" variant="elevated" style={styles.card}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.staffName}>{req.employeeName}</Text>
                <Text style={styles.staffRole}>
                  {req.employeeRole} • {req.department}
                </Text>
              </View>
              <Badge label={req.status} variant={req.status === 'PENDING' ? 'late' : 'present'} size="sm" />
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Calendar size={16} color={PinkTokens.colors.text.secondary} />
              <Text style={styles.infoText}>
                {req.leaveType} Leave: {req.startDate} to {req.endDate} ({req.totalDays} Days)
              </Text>
            </View>

            <View style={styles.infoRow}>
              <UserCheck size={16} color={PinkTokens.colors.text.secondary} />
              <Text style={styles.infoText}>
                Agreed Handover: <Text style={styles.boldText}>{req.handoverStaffName}</Text>
              </Text>
            </View>

            <View style={styles.reasonBox}>
              <Text style={styles.reasonLabel}>Clinical Justification:</Text>
              <Text style={styles.reasonText}>&ldquo;{req.reason}&rdquo;</Text>
            </View>

            {req.status === 'PENDING' ? (
              <View style={styles.actionButtons}>
                <Button
                  title="Approve"
                  variant="primary"
                  size="sm"
                  onPress={() => handleAction(req.id, 'APPROVE')}
                  style={styles.actionBtn}
                />
                <Button
                  title="Decline"
                  variant="outline"
                  size="sm"
                  onPress={() => handleAction(req.id, 'REJECT')}
                  style={styles.actionBtn}
                />
              </View>
            ) : null}
          </Card>
        ))}
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
  safetyCard: {
    marginBottom: PinkTokens.spacing.md,
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  safetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  safetyText: {
    ...PinkTokens.typography.caption,
    color: '#15803D',
    fontWeight: '600',
    flex: 1,
  },
  sectionTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.sm,
  },
  card: {
    marginBottom: PinkTokens.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  staffName: {
    ...PinkTokens.typography.bodyLarge,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  staffRole: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: PinkTokens.colors.border.divider,
    marginVertical: PinkTokens.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.primary,
  },
  boldText: {
    fontWeight: '700',
  },
  reasonBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: PinkTokens.radius.sm,
    marginVertical: PinkTokens.spacing.sm,
  },
  reasonLabel: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.text.secondary,
  },
  reasonText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.primary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: PinkTokens.spacing.xs,
  },
  actionBtn: {
    flex: 1,
  },
});
