import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Pet } from '../types/pet';

const sexMap = { male: 'Самец', female: 'Самка', unknown: 'Не указан' };

export const PetCard = ({ pet, onDelete }: { pet: Pet; onDelete: (id: string) => void }) => (
  <Card className="overflow-hidden">
    <div className="h-36 bg-muted">
      {pet.photo ? <img src={pet.photo} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Без фото</div>}
    </div>
    <CardHeader className="flex flex-row items-start justify-between gap-3">
      <div>
        <CardTitle>{pet.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{pet.category} {pet.breed ? `· ${pet.breed}` : ''}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild><Link to={`/account/pets/${pet.id}/edit`} className="flex w-full items-center gap-2"><Pencil className="h-4 w-4" />Редактировать</Link></DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => onDelete(pet.id)}><Trash2 className="mr-2 h-4 w-4" />Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
    <CardContent className="space-y-3 text-sm">
      <div className="flex items-center justify-between"><Badge>{sexMap[pet.sex]}</Badge><span className="text-muted-foreground">{pet.weight ? `${pet.weight} кг` : 'Вес не указан'}</span></div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Возраст:</span>
        <span>{pet.age ? `${pet.age} ${pet.ageUnit === 'years' ? 'лет' : 'мес'}` : '—'}</span>
      </div>
      <Link to={`/account/pets/${pet.id}`} className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-soft">Открыть</Link>
    </CardContent>
  </Card>
);
