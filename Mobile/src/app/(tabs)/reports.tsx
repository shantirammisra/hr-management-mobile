import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BarChart3,
  TrendingUp,
  Download,
  Clock,
  ShieldCheck,
} from 'lucide-react-native';

import { PinkTokens } from '@/theme/tokens';
import { Card, Button, Badge } from '@/components/ui';

export default function ReportsScreen() {
  const handleExport = (format: string) => {
    Alert.alert('Compliance Audit Export', `Hospital Roster & Licensing Report generated in ${format} format. Dispatched to registered email.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <BarChart3 size={22} color={PinkTokens.colors.brand.primary} />
          <Text style={styles.headerTitle}>Clinical Reports & Audit</Text>
        </View>
        <Badge label="HR Admin / Dept Head" variant="brand" size="sm" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* KPI Summary Cards */}
        <View style={styles.kpiGrid}>
          <Card padding="md" variant="default" style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Roster Adherence</Text>
            <Text style={[styles.kpiValue, { color: '#16A34A' }]}>96.4%</Text>
            <View style={styles.kpiTrend}>
              <TrendingUp size={12} color="#16A34A" />
              <Text style={styles.trendText}>+1.8% vs last month</Text>
            </View>
          </Card>

          <Card padding="md" variant="default" style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total Overtime</Text>
            <Text style={[styles.kpiValue, { color: PinkTokens.colors.brand.primary }]}>
              42.5 hrs
            </Text>
            <View style={styles.kpiTrend}>
              <Clock size={12} color={PinkTokens.colors.text.secondary} />
              <Text style={styles.trendText}>Across 5 Wards</Text>
            </View>
          </Card>
        </View>

        {/* Regulatory Council Compliance Card */}
        <Card padding="lg" variant="elevated" style={styles.complianceCard}>
          <View style={styles.complianceHeader}>
            <ShieldCheck size={22} color="#16A34A" />
            <Text style={styles.complianceTitle}>Regulatory Licensing Health</Text>
          </View>
          <Text style={styles.complianceSub}>
            Ministry of Health & Clinical Council Audit Readiness
          </Text>

          <View style={styles.councilItem}>
            <View style={styles.councilTextRow}>
              <Text style={styles.councilName}>Nepal Nursing Council (NNC)</Text>
              <Text style={styles.councilScore}>98% Active</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '98%', backgroundColor: '#16A34A' }]} />
            </View>
          </View>

          <View style={styles.councilItem}>
            <View style={styles.councilTextRow}>
              <Text style={styles.councilName}>Nepal Medical Council (NMC)</Text>
              <Text style={styles.councilScore}>100% Active</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '100%', backgroundColor: '#16A34A' }]} />
            </View>
          </View>

          <View style={styles.councilItem}>
            <View style={styles.councilTextRow}>
              <Text style={styles.councilName}>Nepal Pharmacy Council (NPC)</Text>
              <Text style={[styles.councilScore, { color: '#D97706' }]}>1 Expiring</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '85%', backgroundColor: '#D97706' }]} />
            </View>
          </View>
        </Card>

        {/* One-Click Regulatory Export Buttons */}
        <Text style={styles.sectionTitle}>Compliance Audit Package</Text>
        <Card padding="lg" variant="default" style={styles.exportCard}>
          <Text style={styles.exportDesc}>
            Download formatted regulatory attendance records, licensing registries, and biometric logs for official hospital accreditation.
          </Text>

          <View style={styles.exportButtons}>
            <Button
              title="Export Ministry PDF"
              variant="primary"
              size="md"
              leftIcon={<Download size={18} color="#FFFFFF" />}
              onPress={() => handleExport('PDF')}
              style={styles.exportBtn}
            />
            <Button
              title="Export Raw CSV"
              variant="outline"
              size="md"
              leftIcon={<Download size={18} color={PinkTokens.colors.brand.primary} />}
              onPress={() => handleExport('Excel/CSV')}
              style={styles.exportBtn}
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
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: PinkTokens.spacing.lg,
  },
  kpiCard: {
    flex: 1,
  },
  kpiLabel: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 4,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
  },
  complianceCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  complianceTitle: {
    ...PinkTokens.typography.bodyLarge,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  complianceSub: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginBottom: PinkTokens.spacing.md,
  },
  councilItem: {
    marginBottom: 12,
  },
  councilTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  councilName: {
    ...PinkTokens.typography.bodySmall,
    fontWeight: '600',
    color: PinkTokens.colors.text.primary,
  },
  councilScore: {
    ...PinkTokens.typography.caption,
    fontWeight: '700',
    color: '#16A34A',
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionTitle: {
    ...PinkTokens.typography.titleSmall,
    color: PinkTokens.colors.text.primary,
    marginBottom: PinkTokens.spacing.sm,
  },
  exportCard: {
    marginBottom: PinkTokens.spacing.lg,
  },
  exportDesc: {
    ...PinkTokens.typography.bodySmall,
    color: PinkTokens.colors.text.secondary,
    marginBottom: PinkTokens.spacing.md,
    lineHeight: 20,
  },
  exportButtons: {
    gap: 10,
  },
  exportBtn: {
    width: '100%',
  },
});
