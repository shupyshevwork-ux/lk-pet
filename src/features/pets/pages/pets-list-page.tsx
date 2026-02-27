import { PawPrint } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { PetCard } from '../components/pet-card';
import { usePetsStore } from '../hooks/pets-context';

export const PetsListPage = () => {
  const { pets, deletePet, seedPet } = usePetsStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Мой питомец</h1>
          <p className="text-muted-foreground">Управляйте профилями питомцев, анализами и заметками в одном месте.</p>
        </div>
        <Button onClick={() => navigate('/account/pets/new')}>Добавить питомца</Button>
      </header>

      {pets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-soft">
          <PawPrint className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Пока нет ни одного питомца</h2>
          <p className="mx-auto mt-1 max-w-lg text-sm text-muted-foreground">Добавьте первого питомца, чтобы вести данные по параметрам и медицинским документам.</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => navigate('/account/pets/new')}>Добавить питомца</Button>
            <Button variant="secondary" onClick={() => { seedPet(); toast({ title: 'Добавлен пример питомца' }); }}>Добавить пример питомца</Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => <PetCard key={pet.id} pet={pet} onDelete={setDeletingId} />)}
        </div>
      )}

      <Dialog open={Boolean(deletingId)} onOpenChange={() => setDeletingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить питомца?</DialogTitle>
            <DialogDescription>Действие нельзя отменить. Профиль и вложения будут удалены.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeletingId(null)}>Отмена</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!deletingId) return;
                deletePet(deletingId);
                toast({ title: 'Питомец удалён' });
                setDeletingId(null);
              }}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
