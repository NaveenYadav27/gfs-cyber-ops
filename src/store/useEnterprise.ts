import { create } from 'zustand';
import type { EnterpriseEvent, Employee } from '@/types/enterprise';
import { generateEnterpriseEvent } from '@/data/enterprise';
import { enterpriseEmployees } from '@/data/enterpriseEmployees';

interface EnterpriseState {
  events: EnterpriseEvent[];
  employees: Employee[];
  selectedEvent: string | null;
  webinarMode: boolean;
  webinarStep: number;
  sidebarCollapsed: boolean;
  currentPage: string;
  currentPageTitle: string;

  addEvent: (event: EnterpriseEvent) => void;
  selectEvent: (id: string | null) => void;
  toggleWebinar: () => void;
  advanceWebinar: () => void;
  setWebinarStep: (step: number) => void;
  setPage: (page: string, title: string) => void;
}

export const useEnterprise = create<EnterpriseState>((set) => ({
  events: [],
  employees: enterpriseEmployees,
  selectedEvent: null,
  webinarMode: false,
  webinarStep: 0,
  sidebarCollapsed: false,
  currentPage: 'dashboard',
  currentPageTitle: 'Dashboard',

  addEvent: (event) => set((s) => ({
    events: [event, ...s.events].slice(0, 200),
  })),

  selectEvent: (id) => set({ selectedEvent: id }),

  toggleWebinar: () => set((s) => ({ webinarMode: !s.webinarMode, webinarStep: 0 })),

  advanceWebinar: () => set((s) => ({ webinarStep: s.webinarStep + 1 })),

  setWebinarStep: (step) => set({ webinarStep: step }),

  setPage: (page, title) => set({ currentPage: page, currentPageTitle: title }),
}));
