import { Download, Pencil, Scale } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFileSize } from '@/lib/utils';
import { usePetsStore } from '../hooks/pets-context';

const sexMap = { male: 'Самец', female: 'Самка', unknown: 'Не указан' };

export const PetDetailsPage = () => {
  const { id } = useParams();
  const { getById } = usePetsStore();
  const navigate = useNavigate();
  const pet = id ? getById(id) : undefined;

  if (!pet) return <Card><CardContent className="p-6">Питомец не найден. <Button variant="secondary" onClick={() => navigate('/account/pets')}>К списку</Button></CardContent></Card>;

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="h-64 overflow-hidden rounded-2xl bg-muted">{pet.photo ? <img src={pet.photo} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Без фото</div>}</div>
          <div>
            <h1 className="text-2xl font-semibold">{pet.name}</h1>
            <p className="text-muted-foreground">{pet.category}{pet.breed ? ` · ${pet.breed}` : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{sexMap[pet.sex]}</Badge>
            {pet.weight && <Badge className="bg-primary/10 text-primary"><Scale className="mr-1 h-3 w-3" />{pet.weight} кг</Badge>}
          </div>
          <Button className="w-full" onClick={() => navigate(`/account/pets/${pet.id}/edit`)}><Pencil className="mr-2 h-4 w-4" />Редактировать</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Основное</CardTitle></CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="text-muted-foreground">Имя:</span> {pet.name}</p>
            <p><span className="text-muted-foreground">Категория:</span> {pet.category}</p>
            <p><span className="text-muted-foreground">Порода:</span> {pet.breed || '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Параметры</CardTitle></CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="text-muted-foreground">Пол:</span> {sexMap[pet.sex]}</p>
            <p><span className="text-muted-foreground">Возраст:</span> {pet.age ? `${pet.age} ${pet.ageUnit === 'years' ? 'лет' : 'мес'}` : '—'}</p>
            <p><span className="text-muted-foreground">Вес:</span> {pet.weight ? `${pet.weight} кг` : '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Анализы</CardTitle></CardHeader>
          <CardContent>
            {pet.attachments.length === 0 ? <p className="text-sm text-muted-foreground">Файлы не добавлены.</p> : (
              <ul className="space-y-2">
                {pet.attachments.map((file) => (
                  <li key={file.id} className="flex flex-col justify-between rounded-xl border border-border p-3 text-sm sm:flex-row sm:items-center">
                    <div>
                      <p className="font-medium">{file.filename}</p>
                      <p className="text-xs text-muted-foreground">{new Date(file.uploadedAt).toLocaleDateString()} · {formatFileSize(file.size)}</p>
                    </div>
                    <a className="mt-2 inline-flex items-center text-primary sm:mt-0" href={file.fileData} download={file.filename}><Download className="mr-1 h-4 w-4" />Скачать/Открыть</a>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Доп. информация</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">{pet.notes || 'Нет дополнительной информации.'}</CardContent>
        </Card>
        <Link to="/account/pets" className="inline-block text-sm text-primary">← Назад к списку</Link>
      </div>
    </div>
  );
};
