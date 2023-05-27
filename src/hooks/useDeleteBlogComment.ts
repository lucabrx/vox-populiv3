import { create } from "zustand";

interface DeleteCommentStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDeleteBlogCommentModal = create<DeleteCommentStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
 }));

 export default useDeleteBlogCommentModal;