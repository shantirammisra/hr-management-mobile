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
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react-native';
import { PinkTokens, ClinicalStatusKey } from '@/theme/tokens';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_ATTENDANCE_LOGS } from '@/services/mock/clinicalData';

export default function AttendanceScreen() {
  const [selectedDate, setSelectedDate] = useState('2026-10-12');
  const currentMonth = 'October 2026';


  // Days of current calendar month (Oct 2026: 31 days)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${day < 10 ? `0${day}` : day}`;
    const log = MOCK_ATTENDANCE_LOGS.find((l) => l.date === dateStr);
    const dayOfWeek = (day + 3) % 7; // simplified day index
    let status: ClinicalStatusKey = log?.status || (dayOfWeek === 6 ? 'weeklyOff' : 'present');
    if (day > 12) status = dayOfWeek === 6 ? 'weeklyOff' : 'present'; // future
    return {
      day,
      dateStr,
      status,
      log,
      isFuture: day > 12,
    };
  });

  const activeLog = MOCK_ATTENDANCE_LOGS.find((l) => l.date === selectedDate) || {
    id: `att-mock-${selectedDate}`,
    date: selectedDate,
    dayName: 'Scheduled Shift',
    status: 'present' as ClinicalStatusKey,
    clockIn: '07:00 AM',
    clockOut: '03:00 PM',
    shiftTitle: 'Morning Ward Roster',
    location: 'Kathmandu Central Hospital - Ward GPS',
    biometricVerified: true,
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top App Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <CalendarIcon size={22} color={PinkTokens.colors.brand.primary} />
          <Text style={styles.headerTitle}>Clinical Attendance</Text>
        </View>
        <Button
          title="Summary"
          variant="outline"
          size="sm"
          leftIcon={<FileSpreadsheet size={16} color={PinkTokens.colors.brand.primary} />}
          onPress={() => Alert.alert('Summary Report', 'Monthly hospital attendance audit exported to PDF.')}
        />
      </View>

      {/* Monthly Attendance Summary Metrics */}
      <View style={styles.metricRow}>
        <View style={[styles.metricChip, { backgroundColor: '#DCFCE7' }]}>
          <Text style={[styles.metricCount, { color: '#16A34A' }]}>9</Text>
          <Text style={[styles.metricLabel, { color: '#15803D' }]}>Present</Text>
        </View>
        <View style={[styles.metricChip, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[styles.metricCount, { color: '#D97706' }]}>1</Text>
          <Text style={[styles.metricLabel, { color: '#B45309' }]}>Late</Text>
        </View>
        <View style={[styles.metricChip, { backgroundColor: '#F3E8FF' }]}>
          <Text style={[styles.metricCount, { color: '#7C3AED' }]}>1</Text>
          <Text style={[styles.metricLabel, { color: '#6D28D9' }]}>Leave</Text>
        </View>
        <View style={[styles.metricChip, { backgroundColor: '#F1F5F9' }]}>
          <Text style={[styles.metricCount, { color: '#475569' }]}>2</Text>
          <Text style={[styles.metricLabel, { color: '#334155' }]}>Weekly Off</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top 45% Split View: Month Grid Card */}
        <Card padding="md" variant="elevated" style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <Pressable hitSlop={12} onPress={() => {}}>
              <ChevronLeft size={20} color={PinkTokens.colors.text.secondary} />
            </Pressable>
            <Text style={styles.monthTitle}>{currentMonth}</Text>
            <Pressable hitSlop={12} onPress={() => {}}>
              <ChevronRight size={20} color={PinkTokens.colors.text.secondary} />
            </Pressable>
          </View>

          {/* Weekday Labels */}
          <View style={styles.weekHeader}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, idx) => (
              <Text key={idx} style={styles.weekLabel}>
                {w}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {daysInMonth.map((item) => {
              const isSelected = item.dateStr === selectedDate;
              const statusColor = PinkTokens.colors.status[item.status];

              return (
                <Pressable
                  key={item.day}
                  onPress={() => setSelectedDate(item.dateStr)}
                  style={[
                    styles.dayCell,
                    isSelected && styles.dayCellSelected,
                    { backgroundColor: item.isFuture ? '#FAFAFA' : statusColor.bg },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayNumberSelected,
                      { color: item.isFuture ? PinkTokens.colors.text.muted : statusColor.text },
                    ]}
                  >
                    {item.day}
                  </Text>
                  {!item.isFuture && (
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: statusColor.text },
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#D97706' }]} />
              <Text style={styles.legendText}>Late</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#7C3AED' }]} />
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#475569' }]} />
              <Text style={styles.legendText}>Off</Text>
            </View>
          </View>
        </Card>

        {/* Bottom 55% Split View: Punch Stream for Selected Date */}
        <View style={styles.streamHeader}>
          <Text style={styles.streamTitle}>Punch Card • {selectedDate}</Text>
          <Badge label={activeLog.status.toUpperCase()} variant={activeLog.status} size="sm" />
        </View>

        <Card padding="lg" variant="default" style={styles.punchDetailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <Clock size={20} color={PinkTokens.colors.brand.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailHeading}>{activeLog.shiftTitle}</Text>
              <Text style={styles.detailSub}>
                {activeLog.clockIn
                  ? `In: ${activeLog.clockIn} • Out: ${activeLog.clockOut || 'Shift Active'}`
                  : 'Rostered Off-duty day'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <MapPin size={20} color={PinkTokens.colors.brand.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailHeading}>Location Stamp</Text>
              <Text style={styles.detailSub}>{activeLog.location}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <ShieldCheck size={20} color="#16A34A" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailHeading}>Verification Status</Text>
              <Text style={styles.detailSub}>
                {activeLog.biometricVerified
                  ? 'FaceID & Hospital Geofence Verified'
                  : 'Not Verified / Off-site'}
              </Text>
            </View>
          </View>

          {activeLog.notes ? (
            <View style={styles.notesBox}>
              <AlertCircle size={14} color={PinkTokens.colors.text.secondary} />
              <Text style={styles.notesText}>{activeLog.notes}</Text>
            </View>
          ) : null}

          {/* Action Row */}
          <View style={styles.actionRow}>
            <Button
              title="Dispute / Regularize"
              variant="outline"
              size="sm"
              onPress={() => router.push(`/attendance/${selectedDate}`)}
              style={styles.actionBtn}
            />
            <Button
              title="Audit Logs"
              variant="secondary"
              size="sm"
              onPress={() => router.push(`/attendance/${selectedDate}`)}
              style={styles.actionBtn}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PinkTokens.spacing.lg,
    paddingVertical: PinkTokens.spacing.sm,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    ...PinkTokens.typography.titleMedium,
    color: PinkTokens.colors.text.primary,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: PinkTokens.spacing.lg,
    marginBottom: PinkTokens.spacing.sm,
  },
  metricChip: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: PinkTokens.radius.md,
    alignItems: 'center',
  },
  metricCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    paddingBottom: PinkTokens.spacing.xxl,
  },
  calendarCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PinkTokens.spacing.md,
  },
  monthTitle: {
    ...PinkTokens.typography.bodyLarge,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekLabel: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.text.muted,
    width: 38,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
  },
  dayCell: {
    width: '12.8%',
    aspectRatio: 1,
    borderRadius: PinkTokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayCellSelected: {
    borderColor: PinkTokens.colors.brand.primary,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    ...PinkTokens.shadows.card,
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: '700',
  },
  dayNumberSelected: {
    color: PinkTokens.colors.brand.primary,
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: PinkTokens.spacing.md,
    paddingTop: PinkTokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: PinkTokens.colors.border.divider,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
  },
  streamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PinkTokens.spacing.sm,
  },
  streamTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
  },
  punchDetailsCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: PinkTokens.spacing.md,
  },
  detailIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PinkTokens.colors.brand.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailHeading: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  detailSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 2,
  },
  notesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: PinkTokens.radius.md,
    marginBottom: PinkTokens.spacing.md,
  },
  notesText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
  },
});
