import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePersistStore = create(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      token: "",
      role: "",
      setUser: (
        /** @type {string} */ firstName,
        /** @type {string} */ lastName,
        /** @type {string} */ token,
        /** @type {string} */ role
      ) => set({ firstName, lastName, token, role }),
      logout: () => set({ firstName: "", lastName: "", token: "", role: "" }),
    }),
    {
      name: "persist-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
