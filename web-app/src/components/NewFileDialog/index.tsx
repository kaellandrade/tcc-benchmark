import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (fileName: string) => void;
  fileExtension?: string;
}

export function NewFileDialog({
  isOpen,
  onClose,
  onCreateFile,
  fileExtension = ".py",
}: NewFileDialogProps) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fileName.trim();

    if (!trimmedName) {
      setError("O nome do arquivo é obrigatório");
      return;
    }

    // Add extension if not present
    const finalName = trimmedName.endsWith(fileExtension)
      ? trimmedName
      : `${trimmedName}${fileExtension}`;

    onCreateFile(finalName);
    handleClose();
  };

  const handleClose = () => {
    setFileName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo arquivo</DialogTitle>
            <DialogDescription>
              Digite o nome do novo arquivo. A extensão {fileExtension} será adicionada automaticamente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fileName">Nome do arquivo</Label>
              <Input
                id="fileName"
                value={fileName}
                onChange={(e) => {
                  setFileName(e.target.value);
                  setError("");
                }}
                placeholder={`exemplo${fileExtension}`}
                autoFocus
              />
              {error && (
                <p className="text-paragraph-small text-destructive">{error}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
