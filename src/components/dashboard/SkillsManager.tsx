import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import { Skill } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SkillForm } from './SkillForm';

export const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();
  const { toast } = useToast();

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSkills();
      setSkills(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load skills',
        variant: 'destructive',
      });
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = () => {
    setEditingSkill(undefined);
    setFormOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await apiService.deleteSkill(id);
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
      fetchSkills();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No skills yet. Add your first skill!</p>
          </div>
        ) : (
          skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <img src={skill.icon} alt={skill.name} className="w-12 h-12" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">{skill.name}</h3>
                    {skill.categoryName && (
                      <Badge variant="outline" className="text-xs">
                        {skill.categoryName}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <SkillForm
        open={formOpen}
        onOpenChange={setFormOpen}
        skill={editingSkill}
        onSuccess={fetchSkills}
      />
    </div>
  );
};
