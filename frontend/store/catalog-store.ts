import { create } from 'zustand';
import { Package, Theme, Extra } from '@/types/catalog';

interface CatalogStore {
  packages: Package[];
  themes: Theme[];
  extras: Extra[];
  loading: boolean;
  setPackages: (packages: Package[]) => void;
  setThemes: (themes: Theme[]) => void;
  setExtras: (extras: Extra[]) => void;
  setLoading: (loading: boolean) => void;
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  removePackage: (id: string) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  packages: [],
  themes: [],
  extras: [],
  loading: false,
  setPackages: (packages) => set({ packages }),
  setThemes: (themes) => set({ themes }),
  setExtras: (extras) => set({ extras }),
  setLoading: (loading) => set({ loading }),
  addPackage: (pkg) => set((state) => ({ packages: [...state.packages, pkg] })),
  updatePackage: (id, updatedPkg) => set((state) => ({
    packages: state.packages.map(pkg => pkg.id === id ? { ...pkg, ...updatedPkg } : pkg)
  })),
  removePackage: (id) => set((state) => ({
    packages: state.packages.filter(pkg => pkg.id !== id)
  })),
}));
