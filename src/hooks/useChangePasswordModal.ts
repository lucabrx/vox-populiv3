import { create } from "zustand";

interface ChangePasswordStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useChangePasswordModal = create<ChangePasswordStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
 }));

 export default useChangePasswordModal;