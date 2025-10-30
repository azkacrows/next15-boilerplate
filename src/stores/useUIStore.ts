import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    dismissible: boolean;
}

interface UIState {
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;

    notification: Notification | null;
    setNotification: (notification: Notification | null) => void;
    dismissNotification: () => void;

    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
    toggleMobileMenu: () => void;

    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    _hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState = {
    isSidebarOpen: true,
    notification: null,
    isMobileMenuOpen: false,
    isLoading: false,
    _hasHydrated: false,
};

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setSidebarOpen: (isOpen: boolean) => {
                    set({ isSidebarOpen: isOpen }, false, 'setSidebarOpen');
                },

                toggleSidebar: () => {
                    set(
                        (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
                        false,
                        'toggleSidebar'
                    );
                },

                setNotification: (notification: Notification | null) => {
                    set({ notification }, false, 'setNotification');
                },

                dismissNotification: () => {
                    set({ notification: null }, false, 'dismissNotification');
                },

                setMobileMenuOpen: (isOpen: boolean) => {
                    set({ isMobileMenuOpen: isOpen }, false, 'setMobileMenuOpen');
                },

                toggleMobileMenu: () => {
                    set(
                        (state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }),
                        false,
                        'toggleMobileMenu'
                    );
                },

                setLoading: (isLoading: boolean) => {
                    set({ isLoading }, false, 'setLoading');
                },

                setHasHydrated: (hasHydrated: boolean) => {
                    set({ _hasHydrated: hasHydrated }, false, 'setHasHydrated');
                },
            }),
            {
                name: 'ui-store',
                partialize: (state) => ({
                    isSidebarOpen: state.isSidebarOpen,
                }),
                onRehydrateStorage: () => (state) => {
                    state?.setHasHydrated(true);
                },
            }
        ),
        {
            name: 'UIStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

export const useHasHydrated = (): boolean => {
    return useUIStore((state) => state._hasHydrated);
};

export const useNotification = () =>
    useUIStore((state) => ({
        notification: state.notification,
        setNotification: state.setNotification,
        dismiss: state.dismissNotification,
    }));

export const useMobileMenu = () =>
    useUIStore((state) => ({
        isOpen: state.isMobileMenuOpen,
        setOpen: state.setMobileMenuOpen,
        toggle: state.toggleMobileMenu,
    }));

export const useLoading = () =>
    useUIStore((state) => ({
        isLoading: state.isLoading,
        setLoading: state.setLoading,
    }));
