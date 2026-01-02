import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical, EyeOff, FileText, MessageSquare, BarChart, Image as ImageIcon, Star } from 'lucide-react';

interface SortableItemData {
  id: string;
  active?: boolean;
  [key: string]: any;
}

interface SortableItemProps<T extends SortableItemData> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  renderContent: (item: T) => React.ReactNode;
}

function SortableItem<T extends SortableItemData>({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleActive,
  isSelected,
  onToggleSelect,
  renderContent 
}: SortableItemProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-4 flex justify-between items-start bg-background ${
        item.active === false ? 'opacity-60 bg-muted/50' : ''
      } ${isDragging ? 'shadow-lg ring-2 ring-primary z-50' : ''}`}
    >
      <div className="flex items-start gap-4 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none mt-1"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        {onToggleSelect && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(item.id)}
            className="mt-1"
          />
        )}
        {renderContent(item)}
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        {onToggleActive && (
          <div className="flex items-center gap-1">
            <Switch
              checked={item.active !== false}
              onCheckedChange={(checked) => onToggleActive(item.id, checked)}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {item.active !== false ? 'Active' : 'Hidden'}
            </span>
          </div>
        )}
        <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface SortableContentListProps<T extends SortableItemData> {
  items: T[];
  onReorder: (items: T[]) => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  renderContent: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

function SortableContentList<T extends SortableItemData>({
  items,
  onReorder,
  onEdit,
  onDelete,
  onToggleActive,
  selectedIds,
  onToggleSelect,
  renderContent,
  emptyMessage = "No items found.",
}: SortableContentListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      onReorder(reorderedItems);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleActive={onToggleActive}
              isSelected={selectedIds?.has(item.id)}
              onToggleSelect={onToggleSelect}
              renderContent={renderContent}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// Pre-built content renderers for common types
export const ProgramContent = ({ item }: { item: any }) => (
  <div className="flex gap-4 flex-1">
    {item.image ? (
      <img 
        src={item.image} 
        alt={item.title} 
        className={`w-20 h-20 rounded object-cover ${item.active === false ? 'grayscale' : ''}`} 
      />
    ) : (
      <div className="w-20 h-20 rounded bg-muted flex items-center justify-center flex-shrink-0">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold truncate">{item.title}</h3>
        {item.active === false && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
      <p className="text-xs text-muted-foreground/70 mt-1">Category: {item.category || 'None'}</p>
    </div>
  </div>
);

export const TestimonialContent = ({ item }: { item: any }) => (
  <div className="flex items-start gap-4 flex-1">
    {item.image_url ? (
      <img 
        src={item.image_url} 
        alt={item.name} 
        className={`w-12 h-12 rounded-full object-cover flex-shrink-0 ${item.active === false ? 'grayscale' : ''}`} 
      />
    ) : (
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <MessageSquare className="h-6 w-6 text-muted-foreground" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold truncate">{item.name}</h3>
        {item.active === false && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{item.role}</p>
      <p className="text-sm mt-2 italic line-clamp-2">"{item.quote}"</p>
    </div>
  </div>
);

export const MetricContent = ({ item }: { item: any }) => (
  <div className="flex items-center gap-4 flex-1">
    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
      <BarChart className="h-6 w-6 text-muted-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold truncate">{item.metric_name}</h3>
        {item.active === false && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
      </div>
      <p className="text-2xl font-bold text-primary">{item.metric_value}</p>
      <p className="text-xs text-muted-foreground/70">Category: {item.category || 'None'}</p>
    </div>
  </div>
);

export const StoryContent = ({ item }: { item: any }) => (
  <div className="flex gap-4 flex-1">
    {item.image_url ? (
      <img 
        src={item.image_url} 
        alt={item.title} 
        className={`w-20 h-20 rounded object-cover flex-shrink-0 ${item.active === false ? 'grayscale' : ''}`} 
      />
    ) : (
      <div className="w-20 h-20 rounded bg-muted flex items-center justify-center flex-shrink-0">
        <Star className="h-8 w-8 text-muted-foreground" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold truncate">{item.title}</h3>
        {item.active === false && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
      <p className="text-xs text-muted-foreground/70 mt-1">Category: {item.category || 'None'}</p>
    </div>
  </div>
);

export const GalleryContent = ({ item }: { item: any }) => (
  <div className="flex gap-4 flex-1">
    {item.image_url ? (
      <img 
        src={item.image_url} 
        alt={item.title} 
        className={`w-20 h-20 rounded object-cover flex-shrink-0 ${item.active === false ? 'grayscale' : ''}`} 
      />
    ) : (
      <div className="w-20 h-20 rounded bg-muted flex items-center justify-center flex-shrink-0">
        <ImageIcon className="h-8 w-8 text-muted-foreground" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold truncate">{item.title}</h3>
        {item.active === false && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            <EyeOff className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )}
      </div>
      {item.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
      )}
      <p className="text-xs text-muted-foreground/70 mt-1">Category: {item.category || 'None'}</p>
    </div>
  </div>
);

export default SortableContentList;
