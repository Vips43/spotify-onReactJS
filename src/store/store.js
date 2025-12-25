import { create } from 'zustand';
import { getSearch } from './EndPoints';

export const useMyStore = create((set) => ({
    searched: [],
    loading: false,
    selectedArtistId: null,
    input:'',
    
    setInput: (value)=> set ({input: value}),

    fetchSearch: async (query, type, limit) => {
        set({ loading: true });
        const searched = await getSearch(query, type, limit);
        set({ searched, loading: false })
    },
    setSelectedArtists: (id) => set({ selectedArtistId: id }),
    
}))
