import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCheck } from 'lucide-react-native';
import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Input } from '@/components/ui';


export default function LeaveApplyScreen() {
  const [leaveType, setLeaveType] = useState<'Casual' | 'Sick' | 'Study' | 'Compensatory'>('Casual');
  const [startDate, setStartDate] = useState('2026-10-20');
  const [endDate, setEndDate] = useState('2026-10-21');
  const [handoverStaff, setHandoverStaff] = useState('Deepak Malla, RN');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!reason) {
      Alert.alert('Required', 'Please enter the clinical reason or CME program details.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Application Submitted', 'Your leave request has been dispatched to your Ward Supervisor.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card padding="lg" variant="elevated" style={styles.card}>
          <Text style={styles.title}>Apply for Clinical Leave</Text>
          <Text style={styles.subtitle}>
            Leave requests require verification of minimum ward staffing ratios before final supervisor sign-off.
          </Text>

          {/* Leave Type Selector */}
          <Text style={styles.fieldLabel}>Leave Category</Text>
          <View style={styles.typeGrid}>
            {(['Casual', 'Sick', 'Study', 'Compensatory'] as const).map((t) => {
              const isSelected = leaveType === t;
              return (
                <Pressable
                  key={t}
                  onPress={() => setLeaveType(t)}
                  style={[
                    styles.typeChip,
                    isSelected && styles.typeChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeChipText,
                      isSelected && styles.typeChipTextSelected,
                    ]}
                  >
                    {t}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Dates */}
          <View style={styles.dateRow}>
            <View style={styles.dateCol}>
              <Input
                label="Start Date"
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
              />
            </View>
            <View style={styles.dateCol}>
              <Input
                label="End Date"
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          {/* Handover Staff */}
          <Input
            label="Designated Coverage Handover Staff"
            value={handoverStaff}
            onChangeText={setHandoverStaff}
            placeholder="Staff colleague name"
            leftIcon={<UserCheck size={18} color={PinkTokens.colors.text.muted} />}
            helperText="Staff member who agrees to cover your shift slot"
          />

          {/* Justification Reason */}
          <Input
            label="Clinical Reason or CME Description"
            value={reason}
            onChangeText={setReason}
            placeholder="e.g. Attending mandatory hospital resuscitation update..."
            multiline
            numberOfLines={3}
          />

          <Button
            title="Submit Leave Application"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            onPress={handleSubmit}
            style={styles.submitBtn}
          />

          <Button
            title="Cancel"
            variant="ghost"
            fullWidth
            onPress={() => router.back()}
            style={styles.cancelBtn}
          />
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
  card: {
    marginBottom: PinkTokens.spacing.md,
  },
  title: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginBottom: PinkTokens.spacing.lg,
    lineHeight: 18,
  },
  fieldLabel: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.xs,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: PinkTokens.spacing.md,
  },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: PinkTokens.radius.md,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: PinkTokens.colors.border.divider,
  },
  typeChipSelected: {
    backgroundColor: PinkTokens.colors.brand.soft,
    borderColor: PinkTokens.colors.brand.primary,
  },
  typeChipText: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.text.secondary,
  },
  typeChipTextSelected: {
    color: PinkTokens.colors.brand.primary,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateCol: {
    flex: 1,
  },
  submitBtn: {
    marginTop: PinkTokens.spacing.md,
  },
  cancelBtn: {
    marginTop: PinkTokens.spacing.xs,
  },
});
