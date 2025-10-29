import { useState, useEffect } from 'react';
import { Project, ProjectCreateDTO, ProjectUpdateDTO } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api.service';

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project;
  onSuccess: () => void;
}

export const ProjectForm = ({ open, onOpenChange, project, onSuccess }: ProjectFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setGithubUrl(project.githubUrl);
      setTechnologies(project.technologies.join(', '));
    } else {
      setTitle('');
      setDescription('');
      setGithubUrl('');
      setTechnologies('');
      setImage(null);
    }
  }, [project, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techArray = technologies.split(',').map(t => t.trim()).filter(t => t);
      
      if (project) {
        const data: ProjectUpdateDTO = {
          id: project.id,
          title,
          description,
          githubUrl,
          technologies: techArray,
          Image: image || undefined,
        };
        await apiService.updateProject(project.id, data);
        toast({ title: 'Success', description: 'Project updated successfully' });
      } else {
        const data: ProjectCreateDTO = {
          title,
          description,
          githubUrl,
          technologies: techArray,
          Image: image || undefined,
        };
        await apiService.createProject(data);
        toast({ title: 'Success', description: 'Project created successfully' });
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${project ? 'update' : 'create'} project`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, TypeScript, Node.js"
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Project Image {!project && '(optional)'}</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : project ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
