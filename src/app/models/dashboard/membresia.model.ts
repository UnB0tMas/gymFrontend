// src/app/models/dashboard/membresia.model.ts
export interface Membresia {
  membresiaId?: number;
  nombre: string;
  descripcion?: string;
  duracionMeses?: number;
  precio?: number;
  fechaInicioVigencia?: string;
  fechaFinVigencia?: string | null;
  estado?: boolean;
}
