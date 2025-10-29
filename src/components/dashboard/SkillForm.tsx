import { useState, useEffect } from 'react';
import { Skill, SkillCreateDTO, SkillUpdateDTO, Category } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api.service';

interface SkillFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill;
  onSuccess: () => void;
}

export const SkillForm = ({ open, onOpenChange, skill, onSuccess }: SkillFormProps) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load categories',
          variant: 'destructive',
        });
      }
    };
    if (open) {
      fetchCategories();
    }
  }, [open]);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setCategoryId(skill.categoryId);
    } else {
      setName('');
      setCategoryId('');
      setIconFile(null);
    }
  }, [skill, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skill && !iconFile) {
      toast({
        title: 'Error',
        description: 'Icon file is required for new skills',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      if (skill) {
        const data: SkillUpdateDTO = {
          Id: skill.id,
          Name: name,
          CategoryId: categoryId,
          IconFile: iconFile || undefined,
        };
        await apiService.updateSkill(skill.id, data);
        toast({ title: 'Success', description: 'Skill updated successfully' });
      } else {
        const data: SkillCreateDTO = {
          Name: name,
          CategoryId: categoryId,
          IconFile: iconFile!,
        };
        await apiService.createSkill(data);
        toast({ title: 'Success', description: 'Skill created successfully' });
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${skill ? 'update' : 'create'} skill`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="icon">Icon File {skill && '(optional)'}</Label>
            <Input
              id="icon"
              type="file"
              accept="image/*,.svg"
              onChange={(e) => setIconFile(e.target.files?.[0] || null)}
              required={!skill}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : skill ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
