// src/store/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User, SecurityAlert, GfsModule, CareerRank,
  InternalMessage, Ticket, ChangeRequest, ActivityEvent
} from '@/types';
import {
  MOCK_USER, MOCK_ALERTS, GFS_MODULES,
  MOCK_MESSAGES, MOCK_TICKETS, MOCK_CHANGES, MOCK_ACTIVITY
} from '@/data/enterprise';

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  sidebarCollapsed: boolean;
  currentPage: string;
  theme: 'light' | 'dark' | 'system';
  alerts: SecurityAlert[];
  modules: GfsModule[];
  onboardingCompleted: boolean;
  onboardingStep: number;
  currentRank: CareerRank;
  completedModules: string[];
  xp: number;
  searchOpen: boolean;
  notificationsOpen: boolean;
  messages: InternalMessage[];
  tickets: Ticket[];
  changes: ChangeRequest[];
  activity: ActivityEvent[];
  currentInvestigation: string | null;

  login: (employeeId: string, password: string) => boolean;
  logout: () => void;
  toggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  completeModule: (moduleId: string) => void;
  setSearchOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  updateAlertStatus: (alertId: string, status: SecurityAlert['status']) => void;
  markMessageRead: (messageId: string) => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  addActivityEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  setCurrentInvestigation: (id: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      sidebarCollapsed: false,
      currentPage: 'dashboard',
      theme: 'dark',
      alerts: MOCK_ALERTS,
      modules: GFS_MODULES,
      onboardingCompleted: false,
      onboardingStep: 0,
      currentRank: 'security-intern',
      completedModules: [],
      xp: 0,
      searchOpen: false,
      notificationsOpen: false,
      messages: MOCK_MESSAGES,
      tickets: MOCK_TICKETS,
      changes: MOCK_CHANGES,
      activity: MOCK_ACTIVITY,
      currentInvestigation: null,

      login: (employeeId: string, _password: string) => {
        if (employeeId) {
          set({ isAuthenticated: true, user: MOCK_USER });
          return true;
        }
        return false;
      },

      logout: () => set({
        isAuthenticated: false, user: null, onboardingStep: 0,
        onboardingCompleted: false, currentPage: 'dashboard',
      }),

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setCurrentPage: (page) => set({ currentPage: page }),
      setTheme: (theme) => set({ theme }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      completeOnboarding: () => set({ onboardingCompleted: true, onboardingStep: 0, currentPage: 'dashboard' }),

      completeModule: (moduleId) => {
        const state = get();
        if (!state.completedModules.includes(moduleId)) {
          const newCompleted = [...state.completedModules, moduleId];
          const newModules = state.modules.map((m) => {
            if (m.id === moduleId) return { ...m, completed: true, progress: 100 };
            if (m.prerequisites.includes(moduleId)) return { ...m, unlocked: true };
            return m;
          });
          set({ completedModules: newCompleted, modules: newModules, xp: state.xp + 500 });
        }
      },

      setSearchOpen: (open) => set({ searchOpen: open }),
      setNotificationsOpen: (open) => set({ notificationsOpen: open }),

      updateAlertStatus: (alertId, status) => set((s) => ({
        alerts: s.alerts.map((a) => (a.id === alertId ? { ...a, status } : a)),
      })),

      markMessageRead: (messageId) => set((s) => ({
        messages: s.messages.map((m) => (m.id === messageId ? { ...m, read: true } : m)),
      })),

      updateTicketStatus: (ticketId, status) => set((s) => ({
        tickets: s.tickets.map((t) => (t.id === ticketId ? { ...t, status, updated: new Date().toISOString() } : t)),
      })),

      addActivityEvent: (event) => set((s) => ({
        activity: [{
          ...event,
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
        }, ...s.activity].slice(0, 50),
      })),

      setCurrentInvestigation: (id) => set({ currentInvestigation: id }),
    }),
    {
      name: 'gfs-cyber-ops',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        onboardingCompleted: state.onboardingCompleted,
        completedModules: state.completedModules,
        currentRank: state.currentRank,
        xp: state.xp,
        currentPage: state.currentPage,
        theme: state.theme,
      }),
    }
  )
);
