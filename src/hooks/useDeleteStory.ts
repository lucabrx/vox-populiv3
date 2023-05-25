import { create } from "zustand";

interface DeleteStoryStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useDeleteStory = create<DeleteStoryStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
 }));

 export default useDeleteStory;