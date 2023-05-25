import { create } from "zustand";

interface DeleteBlogStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useDeleteNewsModal = create<DeleteBlogStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
 }));

 export default useDeleteNewsModal;