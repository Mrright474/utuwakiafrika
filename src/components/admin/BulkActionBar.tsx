import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash2, X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onDelete?: () => void;
  onClearSelection: () => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onActivate,
  onDeactivate,
  onDelete,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg mb-4">
      <span className="text-sm font-medium">
        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
      </span>
      <div className="flex gap-2 ml-auto">
        <Button size="sm" variant="outline" onClick={onActivate}>
          <Eye className="h-4 w-4 mr-1" />
          Activate
        </Button>
        <Button size="sm" variant="outline" onClick={onDeactivate}>
          <EyeOff className="h-4 w-4 mr-1" />
          Deactivate
        </Button>
        {onDelete && (
          <Button size="sm" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onClearSelection}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BulkActionBar;
