export interface Persona {
  personaId?: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  fechaNacimiento: string; // ISO-8601 (yyyy-MM-dd) en el form
  docIdentidad: string;
  ndeDocumento: string;
  telefono: string;
  estado?: boolean;
}
