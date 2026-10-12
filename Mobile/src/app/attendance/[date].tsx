import React, { useState } from 'react';
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
  Clock,
  MapPin,
  ShieldCheck,
} from 'lucide-react-native';

import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge, Input } from '@/components/ui';
import { MOCK_ATTENDANCE_LOGS } from '@/services/mock/clinicalData';

export default function AttendanceDateAuditScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [disputeReason, setDisputeReason] = useState('');
  const [isDisputed, setIsDisputed] = useState(false);

  const log = MOCK_ATTENDANCE_LOGS.find((l) => l.date === date) || {
    id: 'att-curr',
    date: date || '2026-10-12',
    dayName: 'Scheduled Day',
    status: 'present' as const,
    clockIn: '06:54 AM',
    shiftTitle: 'Morning Ward Roster (07:00 - 15:00)',
    location: 'ICU Ward 3 Geofence Terminal',
    biometricVerified: true,
  };

  const handleDisputeSubmit = () => {
    if (!disputeReason) {
      Alert.alert('Reason Required', 'Please explain the punch discrepancy for supervisor review.');
      return;
    }
    setIsDisputed(true);
    Alert.alert('Dispute Logged', 'Your attendance correction request has been sent to your Department Head.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Audit Card */}
        <Card padding="lg" variant="elevated" style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.dateTitle}>{log.date}</Text>
              <Text style={styles.daySub}>{log.dayName}</Text>
            </View>
            <Badge label={log.status.toUpperCase()} variant={log.status} size="md" />
          </View>

          <View style={styles.divider} />

          {/* Timeline */}
          <Text style={styles.sectionHeader}>Punch Verification Audit Trail</Text>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: '#DCFCE7' }]}>
              <Clock size={16} color="#16A34A" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Clock In: {log.clockIn || '07:00 AM'}</Text>
              <Text style={styles.timelineSub}>Scanned at ICU Ward Terminal #3</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: '#FEF3C7' }]}>
              <MapPin size={16} color="#D97706" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Geofence Stamp</Text>
              <Text style={styles.timelineSub}>{log.location}</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: '#F3E8FF' }]}>
              <ShieldCheck size={16} color="#7C3AED" />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Hardware Cryptographic Hash</Text>
              <Text style={styles.timelineSub}>SHA256: e891...4a2b (Tamper-evident)</Text>
            </View>
          </View>
        </Card>

        {/* Dispute / Regularization Form */}
        <Card padding="lg" variant="default" style={styles.card}>
          <Text style={styles.formTitle}>Request Punch Discrepancy Correction</Text>
          <Text style={styles.formSub}>
            If you were delayed by emergency resuscitation, ward transfers, or transit issues, submit an audit request to your supervisor.
          </Text>

          <Input
            label="Correction Justification"
            placeholder="e.g. Delayed 20 mins due to Emergency Code Blue in ER Triage..."
            value={disputeReason}
            onChangeText={setDisputeReason}
            multiline
            numberOfLines={3}
            containerStyle={styles.inputContainer}
          />

          <Button
            title={isDisputed ? 'Dispute Submitted' : 'Submit Correction Request'}
            variant={isDisputed ? 'secondary' : 'primary'}
            fullWidth
            disabled={isDisputed}
            onPress={handleDisputeSubmit}
          />
        </Card>

        <Button
          title="Close Modal"
          variant="ghost"
          onPress={() => router.back()}
          style={styles.closeBtn}
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTitle: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
  },
  daySub: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: PinkTokens.colors.border.divider,
    marginVertical: PinkTokens.spacing.md,
  },
  sectionHeader: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: PinkTokens.spacing.md,
  },
  timelineIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  timelineSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  formTitle: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
    marginBottom: 4,
  },
  formSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginBottom: PinkTokens.spacing.md,
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: PinkTokens.spacing.md,
  },
  closeBtn: {
    marginTop: PinkTokens.spacing.xs,
  },
});
