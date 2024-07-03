import { create } from 'zustand'

type SearchState = {
  search?: string
}

type SearchActions = {
  changeSearch: (value: string) => void;
}

type SearchStore = SearchState & SearchActions

const useStoreSearch = create<SearchStore>((set) => ({
  search: '',
  changeSearch: (value) => set(state => ({ ...state, search: value }))
}))

export default useStoreSearch