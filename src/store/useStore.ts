import { create } from 'zustand';
import { Photo, Category, Award, User, FilterOptions, SortOptions } from '@/types';

interface AppState {
  // Photos
  photos: Photo[];
  selectedPhoto: Photo | null;
  photosLoading: boolean;
  
  // Categories
  categories: Category[];
  categoriesLoading: boolean;
  
  // Awards
  awards: Award[];
  awardsLoading: boolean;
  
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  
  // Filters & Search
  filters: FilterOptions;
  sortOptions: SortOptions;
  searchQuery: string;
  
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

interface AppActions {
  // Photos actions
  setPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: string, photo: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
  setSelectedPhoto: (photo: Photo | null) => void;
  setPhotosLoading: (loading: boolean) => void;
  
  // Categories actions
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  setCategoriesLoading: (loading: boolean) => void;
  
  // Awards actions
  setAwards: (awards: Award[]) => void;
  addAward: (award: Award) => void;
  updateAward: (id: string, award: Partial<Award>) => void;
  deleteAward: (id: string) => void;
  setAwardsLoading: (loading: boolean) => void;
  
  // Auth actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;
  
  // Filter & Search actions
  setFilters: (filters: FilterOptions) => void;
  setSortOptions: (sortOptions: SortOptions) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  
  // UI actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useStore = create<AppState & AppActions>((set, get) => ({
  // Initial state
  photos: [],
  selectedPhoto: null,
  photosLoading: false,
  
  categories: [],
  categoriesLoading: false,
  
  awards: [],
  awardsLoading: false,
  
  user: null,
  isAuthenticated: false,
  authLoading: false,
  
  filters: {},
  sortOptions: { field: 'createdAt', order: 'desc' },
  searchQuery: '',
  
  sidebarOpen: false,
  theme: 'dark',
  
  // Photos actions
  setPhotos: (photos) => set({ photos }),
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  updatePhoto: (id, updatedPhoto) => set((state) => ({
    photos: state.photos.map((photo) =>
      photo.id === id ? { ...photo, ...updatedPhoto } : photo
    ),
  })),
  deletePhoto: (id) => set((state) => ({
    photos: state.photos.filter((photo) => photo.id !== id),
  })),
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  setPhotosLoading: (loading) => set({ photosLoading: loading }),
  
  // Categories actions
  setCategories: (categories) => set({ categories }),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (id, updatedCategory) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === id ? { ...category, ...updatedCategory } : category
    ),
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id),
  })),
  setCategoriesLoading: (loading) => set({ categoriesLoading: loading }),
  
  // Awards actions
  setAwards: (awards) => set({ awards }),
  addAward: (award) => set((state) => ({ awards: [...state.awards, award] })),
  updateAward: (id, updatedAward) => set((state) => ({
    awards: state.awards.map((award) =>
      award.id === id ? { ...award, ...updatedAward } : award
    ),
  })),
  deleteAward: (id) => set((state) => ({
    awards: state.awards.filter((award) => award.id !== id),
  })),
  setAwardsLoading: (loading) => set({ awardsLoading: loading }),
  
  // Auth actions
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setAuthLoading: (loading) => set({ authLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Filter & Search actions
  setFilters: (filters) => set({ filters }),
  setSortOptions: (sortOptions) => set({ sortOptions }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearFilters: () => set({ filters: {}, searchQuery: '' }),
  
  // UI actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));