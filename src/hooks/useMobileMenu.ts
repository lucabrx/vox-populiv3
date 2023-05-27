import {create} from "zustand";

interface MobileMenuStore {
    isOpen: boolean
    open: () => void
    close: () => void
}

const useMobileMenu = create<MobileMenuStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))


export default useMobileMenu