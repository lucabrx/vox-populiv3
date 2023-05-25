import { create } from "zustand";

interface EditBlogStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditNews = create<EditBlogStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
 }));

 export default useEditNews;