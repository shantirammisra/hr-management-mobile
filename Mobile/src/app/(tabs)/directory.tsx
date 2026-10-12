import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Users,
  Search,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react-native';
import { PinkTokens } from '@/theme/tokens';
import { Card, Badge, Avatar } from '@/components/ui';
import { MOCK_STAFF_MEMBERS } from '@/services/mock/clinicalData';


export default function DirectoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'DOCTORS' | 'NURSES' | 'PHARMACY' | 'ON_DUTY'>('ALL');

  const filteredStaff = MOCK_STAFF_MEMBERS.filter((staff) => {
    // Search filter
    const matchesSearch =
      staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.councilNumber && staff.councilNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      staff.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    if (selectedFilter === 'ON_DUTY') return staff.isOnDuty;
    if (selectedFilter === 'DOCTORS') return staff.councilType === 'NMC';
    if (selectedFilter === 'NURSES') return staff.councilType === 'NNC';
    if (selectedFilter === 'PHARMACY') return staff.councilType === 'NPC';
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Users size={22} color={PinkTokens.colors.brand.primary} />
          <Text style={styles.headerTitle}>Clinical Staff Directory</Text>
        </View>
        <Badge
          label={`${filteredStaff.length} Members`}
          variant="brand"
          size="sm"
        />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={PinkTokens.colors.text.muted} />
          <TextInput
            placeholder="Search name, NMC/NNC license, code..."
            placeholderTextColor={PinkTokens.colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Category Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {(['ALL', 'ON_DUTY', 'DOCTORS', 'NURSES', 'PHARMACY'] as const).map((cat) => {
          const isSelected = selectedFilter === cat;
          const labels = {
            ALL: 'All Clinical Staff',
            ON_DUTY: '🟢 On-Duty Now',
            DOCTORS: 'NMC Doctors',
            NURSES: 'NNC Nurses',
            PHARMACY: 'NPC Pharmacists',
          };

          return (
            <Pressable
              key={cat}
              onPress={() => setSelectedFilter(cat)}
              style={[
                styles.filterPill,
                isSelected && styles.filterPillSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  isSelected && styles.filterPillTextSelected,
                ]}
              >
                {labels[cat]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Staff Cards List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredStaff.map((staff) => {
          const isExpiringSoon =
            staff.councilExpiryDate &&
            new Date(staff.councilExpiryDate).getTime() - new Date().getTime() < 30 * 86400000;

          return (
            <Card
              key={staff.id}
              padding="md"
              variant="default"
              onPress={() => router.push(`/directory/${staff.id}`)}
              style={styles.staffCard}
            >
              <View style={styles.cardRow}>
                <Avatar
                  name={staff.fullName}
                  imageUri={staff.avatarUrl}
                  size="lg"
                  status={staff.isOnDuty ? 'on-duty' : 'off-duty'}
                />

                <View style={styles.staffInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.staffName}>{staff.fullName}</Text>
                    {staff.isOnDuty ? (
                      <Badge label="ON DUTY" variant="present" size="sm" />
                    ) : null}
                  </View>

                  <Text style={styles.staffDesignation}>{staff.designation}</Text>
                  <Text style={styles.staffDept}>{staff.departmentName}</Text>

                  {/* Council License Badge */}
                  <View style={styles.councilRow}>
                    {staff.councilNumber ? (
                      <Badge
                        label={`${staff.councilType}: ${staff.councilNumber}`}
                        variant="brand"
                        size="sm"
                      />
                    ) : null}

                    {isExpiringSoon ? (
                      <Badge
                        label="Renewal Due"
                        variant="late"
                        size="sm"
                        icon={<AlertTriangle size={12} color="#D97706" />}
                      />
                    ) : null}
                  </View>
                </View>

                <ChevronRight size={18} color={PinkTokens.colors.text.muted} />
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
  searchContainer: {
    paddingHorizontal: PinkTokens.spacing.lg,
    marginBottom: PinkTokens.spacing.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PinkTokens.colors.canvas.surface,
    borderWidth: 1,
    borderColor: PinkTokens.colors.border.divider,
    borderRadius: PinkTokens.radius.md,
    paddingHorizontal: PinkTokens.spacing.md,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...PinkTokens.typography.bodyMedium,
    color: PinkTokens.colors.text.primary,
  },
  filterScroll: {
    paddingHorizontal: PinkTokens.spacing.lg,
    gap: 8,
    paddingBottom: PinkTokens.spacing.sm,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: PinkTokens.radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: PinkTokens.colors.border.divider,
  },
  filterPillSelected: {
    backgroundColor: PinkTokens.colors.brand.primary,
    borderColor: PinkTokens.colors.brand.primary,
  },
  filterPillText: {
    ...PinkTokens.typography.caption,
    fontWeight: '600',
    color: PinkTokens.colors.text.secondary,
  },
  filterPillTextSelected: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: PinkTokens.spacing.lg,
    paddingBottom: PinkTokens.spacing.xxl,
  },
  staffCard: {
    marginBottom: PinkTokens.spacing.sm,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  staffInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  staffName: {
    ...PinkTokens.typography.bodyMedium,
    fontWeight: '700',
    color: PinkTokens.colors.text.primary,
  },
  staffDesignation: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.secondary,
    marginTop: 1,
  },
  staffDept: {
    ...PinkTokens.typography.caption,
    color: PinkTokens.colors.text.muted,
  },
  councilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
});
