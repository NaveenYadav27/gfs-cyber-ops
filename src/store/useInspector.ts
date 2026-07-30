import { create } from 'zustand';

export interface InspectorState {
  isOpen: boolean;
  type: string | null;
  data: Record<string, any> | null;
  openInspector: (type: string, data: Record<string, any>) => void;
  closeInspector: () => void;
  updateData: (data: Record<string, any>) => void;
}

export const useInspector = create<InspectorState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openInspector: (type, data) => set({ isOpen: true, type, data }),
  closeInspector: () => set({ isOpen: false, type: null, data: null }),
  updateData: (data) => set((s) => ({ data: s.data ? { ...s.data, ...data } : data })),
}));
