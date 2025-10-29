import { 
  Project, 
  Skill, 
  Category,
  ProjectCreateDTO, 
  ProjectUpdateDTO,
  SkillCreateDTO, 
  SkillUpdateDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7135/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/Project/All`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/Project/GetById/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  }

  async createProject(data: ProjectCreateDTO): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('githubUrl', data.githubUrl);
    data.technologies.forEach(tech => formData.append('technologies', tech));
    if (data.Image) {
      formData.append('Image', data.Image);
    }

    const response = await fetch(`${API_BASE_URL}/Project/Add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  }

  async updateProject(id: string, data: ProjectUpdateDTO): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('githubUrl', data.githubUrl);
    data.technologies.forEach(tech => formData.append('technologies', tech));
    if (data.Image) {
      formData.append('Image', data.Image);
    }

    const response = await fetch(`${API_BASE_URL}/Project/Update/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  }

  async deleteProject(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Project/Delete/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    const response = await fetch(`${API_BASE_URL}/Skill/All`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return response.json();
  }

  async getSkill(id: string): Promise<Skill> {
    const response = await fetch(`${API_BASE_URL}/Skill/GetById/${id}`);
    if (!response.ok) throw new Error('Failed to fetch skill');
    return response.json();
  }

  async createSkill(data: SkillCreateDTO): Promise<{ message: string; skill: Skill }> {
    const formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('CategoryId', data.CategoryId);
    formData.append('IconFile', data.IconFile);

    const response = await fetch(`${API_BASE_URL}/Skill/Add`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
  }

  async updateSkill(id: string, data: SkillUpdateDTO): Promise<{ message: string; skill: Skill }> {
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('Name', data.Name);
    formData.append('CategoryId', data.CategoryId);
    if (data.IconFile) {
      formData.append('IconFile', data.IconFile);
    }

    const response = await fetch(`${API_BASE_URL}/Skill/Update/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update skill');
    return response.json();
  }

  async deleteSkill(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Skill/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete skill');
    return response.json();
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/Category/All`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }

  async getCategory(id: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/Category/GetById/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  }

  async createCategory(data: CategoryCreateDTO): Promise<{ message: string; id: string }> {
    const response = await fetch(`${API_BASE_URL}/Category/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  }

  async updateCategory(id: string, data: CategoryUpdateDTO): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Category/Update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  }

  async deleteCategory(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Category/Delete/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
  }
}

export const apiService = new ApiService();
