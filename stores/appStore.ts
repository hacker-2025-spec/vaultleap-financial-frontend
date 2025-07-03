import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


type UserStore = {
  isSideBarToggled: boolean
  actions: {
    toggleSideBar: () => void
  }
}

const appStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isSideBarToggled: true,
      currency: 'USD',
      actions: {
        toggleSideBar: () => {
          const isSideBarToggled = get().isSideBarToggled
          set({ isSideBarToggled: !isSideBarToggled })
        },
      },
    }),
    {
      name: 'appState', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        ['isSideBarToggled']: state.isSideBarToggled,
      }),
    }
  )
)

export const useSideBarToggle = () => {
  const { toggleSideBar } = appStore((state) => state.actions)
  const isSideBarToggled = appStore((state) => state.isSideBarToggled)
  return { toggleSideBar, isSideBarToggled }
}

export default appStore
