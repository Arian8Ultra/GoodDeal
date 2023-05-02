import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePersistStore = create(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      token: "",
      setUser: (
        /** @type {string} */ firstName,
        /** @type {string} */ lastName,
        /** @type {string} */ token
      ) => set({ firstName, lastName, token }),
    }),
    {
      name: "persist-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
