import { create } from "zustand";

interface EditUserStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditUser = create<EditUserStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
 }));

 export default useEditUser;