import { Persona } from './persona.model';
import { Area } from './area.model';

export interface Empleado {
  empleadoId?: number;
  persona: Persona;
  area: Area;
  fechaContratacion: string;  // yyyy-MM-dd
  sueldo: number;
  estado?: boolean;
}
