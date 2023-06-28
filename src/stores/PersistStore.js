import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePersistStore = create(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      token: "",
      role: "",
      id: "",
      setUser: (
        /** @type {string} */ firstName,
        /** @type {string} */ lastName,
        /** @type {string} */ token,
        /** @type {string} */ role,
        /** @type {string} */ id
      ) => set({ firstName, lastName, token, role, id }),
      logout: () => set({ firstName: "", lastName: "", token: "", role: "", id: "" }),
    }),
    {
      name: "persist-storage", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
