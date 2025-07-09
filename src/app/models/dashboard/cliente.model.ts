// src/app/models/dashboard/cliente.model.ts
import { Persona } from './persona.model';
import { Membresia } from './membresia.model'; // Debes crear este modelo

export interface Cliente {
  clienteId?: number;
  persona: Persona;
  pesoInicio: number;
  imgInicio?: string;
  estado?: boolean;
  membresia?: Membresia | null; // Relación opcional
}
