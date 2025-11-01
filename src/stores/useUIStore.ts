import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;

    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    _hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState = {
    theme: 'system' as const,
    isLoading: false,
    _hasHydrated: false,
};

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setTheme: (theme: 'light' | 'dark' | 'system') => {
                    set({ theme }, false, 'setTheme');
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
                    theme: state.theme,
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

// Selector hooks for common patterns
export const useHasHydrated = (): boolean => {
    return useUIStore((state) => state._hasHydrated);
};

export const useTheme = () =>
    useUIStore((state) => ({
        theme: state.theme,
        setTheme: state.setTheme,
    }));

export const useLoading = () =>
    useUIStore((state) => ({
        isLoading: state.isLoading,
        setLoading: state.setLoading,
    }));
