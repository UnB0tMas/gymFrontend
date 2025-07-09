// src/app/models/dashboard/producto.model.ts

export interface ProductoResponseDTO {
  productoId: number;
  nombre: string;
  categoriaPId: number;
  nombreCategoria: string;
  unidadMedida: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export interface ProductoCreateDTO {
  nombre: string;
  categoriaPId: number;
  unidadMedida: string;
  precio: number;
  stock: number;
}
