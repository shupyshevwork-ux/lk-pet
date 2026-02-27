import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { PetForm } from '../components/pet-form';
import { usePetsStore } from '../hooks/pets-context';

export const PetNewPage = () => {
  const { createPet } = usePetsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Добавить питомца</CardTitle>
      </CardHeader>
      <CardContent>
        <PetForm
          submitLabel="Сохранить"
          onCancel={() => navigate('/account/pets')}
          onSubmit={(values) => {
            const created = createPet(values);
            toast({ title: 'Питомец добавлен' });
            navigate(`/account/pets/${created.id}`);
          }}
        />
      </CardContent>
    </Card>
  );
};
