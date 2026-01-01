import { useRef, useState } from 'react';
import { Upload, FileUp, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseCSV, validateImportData, importRequiredColumns, importOptionalColumns, downloadCSVTemplate } from '@/utils/importData';

interface ImportButtonProps {
  dataType: 'team' | 'programs' | 'testimonials' | 'metrics' | 'stories' | 'gallery';
  onImport: (data: Record<string, string>[]) => Promise<void>;
  disabled?: boolean;
}

export const ImportButton = ({ dataType, onImport, disabled }: ImportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parsedData, setParsedData] = useState<Record<string, string>[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredCols = importRequiredColumns[dataType] || [];
  const optionalCols = importOptionalColumns[dataType] || [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const data = parseCSV(text);
      const validation = validateImportData(data, requiredCols);
      
      if (validation.valid) {
        setParsedData(data);
        setErrors([]);
      } else {
        setParsedData([]);
        setErrors(validation.errors);
      }
    };
    
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (parsedData.length === 0) return;
    
    setIsImporting(true);
    try {
      await onImport(parsedData);
      setIsOpen(false);
      resetState();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Import failed']);
    } finally {
      setIsImporting(false);
    }
  };

  const resetState = () => {
    setParsedData([]);
    setErrors([]);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Import
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import {dataType.charAt(0).toUpperCase() + dataType.slice(1)}</DialogTitle>
            <DialogDescription>
              Upload a CSV file to bulk import data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Required columns:</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadCSVTemplate(dataType)}
                  className="gap-1 h-7 text-xs"
                >
                  <Download className="h-3 w-3" />
                  Download Template
                </Button>
              </div>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                {requiredCols.join(', ')}
              </code>
              {optionalCols.length > 0 && (
                <>
                  <p className="font-medium mb-1 mt-2">Optional columns:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {optionalCols.join(', ')}
                  </code>
                </>
              )}
            </div>

            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              {fileName ? (
                <p className="text-sm font-medium">{fileName}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to select a CSV file
                </p>
              )}
            </div>

            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errors.map((error, i) => (
                    <p key={i}>{error}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            {parsedData.length > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Ready to import {parsedData.length} record(s)
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={parsedData.length === 0 || isImporting}
            >
              {isImporting ? 'Importing...' : 'Import'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
