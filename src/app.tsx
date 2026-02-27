import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '@/components/ui/toast';
import { PetsProvider } from '@/features/pets/hooks/pets-context';
import { PetDetailsPage } from '@/features/pets/pages/pet-details-page';
import { PetEditPage } from '@/features/pets/pages/pet-edit-page';
import { PetNewPage } from '@/features/pets/pages/pet-new-page';
import { PetsListPage } from '@/features/pets/pages/pets-list-page';

const Layout = () => (
  <div className="min-h-screen bg-background">
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <Outlet />
    </main>
  </div>
);

export const App = () => (
  <ToastProvider>
    <PetsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/account/pets" replace />} />
          <Route path="/account/pets" element={<PetsListPage />} />
          <Route path="/account/pets/new" element={<PetNewPage />} />
          <Route path="/account/pets/:id" element={<PetDetailsPage />} />
          <Route path="/account/pets/:id/edit" element={<PetEditPage />} />
        </Route>
      </Routes>
    </PetsProvider>
  </ToastProvider>
);
