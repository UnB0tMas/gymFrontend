// src/app/models/dashboard/categoria-p.model.ts

export interface CategoriaPResponseDTO {
  categoriaPId: number;
  nombre: string;
  descripcion?: string;
  estado: boolean;
}

export interface CategoriaPCreateDTO {
  nombre: string;
  descripcion?: string;
}
