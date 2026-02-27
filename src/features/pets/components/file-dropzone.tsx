import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/utils';
import type { Attachment } from '../types/pet';

type Props = {
  multiple?: boolean;
  onDropFiles: (files: File[]) => void;
  items?: Attachment[];
  onRemove?: (id: string) => void;
  compact?: boolean;
};

export const FileDropzone = ({ multiple, onDropFiles, items = [], onRemove, compact }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDrop: (acceptedFiles) => onDropFiles(acceptedFiles),
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`rounded-2xl border border-dashed p-4 text-center transition ${isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/40'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
        <p className="text-sm">Перетащите файлы сюда или нажмите, чтобы выбрать</p>
      </div>
      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((file) => (
            <li key={file.id} className="flex items-center justify-between rounded-xl border border-border bg-white px-3 py-2 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium">{file.filename}</p>
                <p className="text-xs text-muted-foreground">{file.type || 'unknown'} · {formatFileSize(file.size)}</p>
              </div>
              {onRemove && (
                <Button size={compact ? 'sm' : 'icon'} variant="ghost" onClick={() => onRemove(file.id)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
