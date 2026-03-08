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
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Users, GripVertical } from 'lucide-react';
import { TeamMember } from '@/hooks/useTeamManagement';

interface SortableItemProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

const SortableItem = ({ member, onEdit, onDelete, onToggleActive }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-4 flex justify-between items-center bg-background ${
        member.active === false ? 'opacity-60 bg-muted' : ''
      } ${isDragging ? 'shadow-lg ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{member.name}</h3>
            {member.active === false && (
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{member.position}</p>
          <p className="text-xs text-muted-foreground/70">{member.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onToggleActive && (
          <div className="flex items-center gap-1 mr-2">
            <Switch
              checked={member.active !== false}
              onCheckedChange={(checked) => onToggleActive(member.id, checked)}
              aria-label={`Toggle ${member.name} visibility`}
            />
            <span className="text-xs text-muted-foreground w-14">
              {member.active !== false ? 'Active' : 'Hidden'}
            </span>
          </div>
        )}
        <Button size="sm" variant="outline" onClick={() => onEdit(member)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(member.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface SortableTeamListProps {
  members: TeamMember[];
  onReorder: (members: TeamMember[]) => void;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

const SortableTeamList = ({
  members,
  onReorder,
  onEdit,
  onDelete,
}: SortableTeamListProps) => {
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
      const oldIndex = members.findIndex((m) => m.id === active.id);
      const newIndex = members.findIndex((m) => m.id === over.id);
      const reorderedMembers = arrayMove(members, oldIndex, newIndex);
      onReorder(reorderedMembers);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={members.map((m) => m.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {members.map((member) => (
            <SortableItem
              key={member.id}
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableTeamList;
