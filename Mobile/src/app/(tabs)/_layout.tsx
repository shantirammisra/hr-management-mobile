import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarClock,
  Users,
  BarChart3,
  UserCheck,
} from 'lucide-react-native';
import { PinkTokens } from '@/theme/tokens';
import { useAuthStore } from '@/features/auth/stores/authStore';

export default function TabLayout() {
  const { user } = useAuthStore();
  const isManagerOrAdmin = user?.role === 'DEPT_HEAD' || user?.role === 'HR_ADMIN' || user?.role === 'SUPER_ADMIN';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PinkTokens.colors.brand.primary,
        tabBarInactiveTintColor: PinkTokens.colors.text.muted,
        tabBarStyle: {
          backgroundColor: PinkTokens.colors.canvas.surface,
          borderTopColor: PinkTokens.colors.border.divider,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 86 : 68,
          paddingBottom: Platform.OS === 'ios' ? 26 : 8,
          paddingTop: 8,
          ...PinkTokens.shadows.card,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <LayoutDashboard size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <CalendarCheck size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="leave"
        options={{
          title: 'Leave',
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <CalendarClock size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="directory"
        options={{
          title: 'Staff',
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <Users size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          href: isManagerOrAdmin ? '/(tabs)/reports' : null,
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <BarChart3 size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <UserCheck size={22} color={color} />
            </TabIconContainer>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIconContainer({ children, focused }: { children: React.ReactNode; focused: boolean }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: PinkTokens.radius.full,
  },
  iconWrapperFocused: {
    backgroundColor: PinkTokens.colors.brand.soft,
  },
});
