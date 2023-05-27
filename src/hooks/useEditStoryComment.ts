import { create } from "zustand";

interface EditCommentStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditStoryComment = create<EditCommentStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
 }));

 export default useEditStoryComment;