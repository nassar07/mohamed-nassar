export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  technologies: string[];
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  categoryId: string;
  categoryName: string | null;
}

export interface Category {
  id: string;
  name: string;
  skills?: Skill[];
}

export interface ProjectCreateDTO {
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  Image?: File;
}

export interface ProjectUpdateDTO {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  Image?: File;
}

export interface SkillCreateDTO {
  Name: string;
  CategoryId: string;
  IconFile: File;
}

export interface SkillUpdateDTO {
  Id: string;
  Name: string;
  CategoryId: string;
  IconFile?: File;
}

export interface CategoryCreateDTO {
  name: string;
}

export interface CategoryUpdateDTO {
  id: string;
  name: string;
}
