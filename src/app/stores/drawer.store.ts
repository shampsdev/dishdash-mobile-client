import { create } from 'zustand';

type DrawerProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useDrawer = create<DrawerProps>()((set) => ({
  open: false,
  setOpen: (isOpen: boolean) => set(() => ({ open: isOpen })),
}));
