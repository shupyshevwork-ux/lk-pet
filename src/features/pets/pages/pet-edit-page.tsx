import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { PetForm } from '../components/pet-form';
import { usePetsStore } from '../hooks/pets-context';

export const PetEditPage = () => {
  const { id } = useParams();
  const { getById, updatePet } = usePetsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const pet = id ? getById(id) : undefined;
  if (!pet) return <Card><CardContent className="p-6">Питомец не найден.</CardContent></Card>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Редактировать питомца</CardTitle>
      </CardHeader>
      <CardContent>
        <PetForm
          submitLabel="Сохранить изменения"
          defaultValues={pet}
          onCancel={() => navigate(`/account/pets/${pet.id}`)}
          onSubmit={(values) => {
            updatePet(pet.id, values);
            toast({ title: 'Изменения сохранены' });
            navigate(`/account/pets/${pet.id}`);
          }}
        />
      </CardContent>
    </Card>
  );
};
