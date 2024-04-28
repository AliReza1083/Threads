import { create } from "zustand";

interface editProfileType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useEditProfileModal = create<editProfileType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
