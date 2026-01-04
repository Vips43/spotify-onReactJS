import { create } from "zustand";
import { getSearch } from "./EndPoints";

export const useMyStore = create((set) => ({
  searched: [],
  input: "",
  loading: false,
  selectedArtistId: null,
  descExp: true,

  setInput: (value) => set({ input: value }),

  inputChange: async (value) => {
    set((state) => {
      if (state.input === value) return state;
      return { input: value };
    });

    if (!value) {
      set({ searched: [] });
      return;
    }

    set({ loading: true });
    try {
      const data = await getSearch(value);
      set({ searched: data.tracks.items });
      console.log(data);
    } catch (e) {
      console.error(e);
      set({ searched: [] });
    } finally {
      set({ loading: false });
    }
  },


  setSelectedArtists: (id) => set({ selectedArtistId: id }),

  setDescExpand: () =>
    set((state) => ({ descExp: !state.descExp })),
}));
