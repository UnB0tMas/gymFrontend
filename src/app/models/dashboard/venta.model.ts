// src/app/models/dashboard/venta.model.ts

export interface VentaResponseDTO {
  ventaId: number;
  fechaVenta: string; // ISO string
  personaId: number;
  nombreCliente: string;
  documentoCliente: string;
  igv: number;
  metodoPago: string;
  total: number;
  estado: boolean;
  detalles: DetalleVentaResponseDTO[];
}

export interface DetalleVentaResponseDTO {
  detalleVentaId: number;
  productoId: number;
  nombreProducto: string;
  cant: number;
}

export interface VentaCreateDTO {
  fechaVenta: string; // ISO string. Usa new Date().toISOString() en Angular
  personaId: number;
  igv: number;
  metodoPago: string;
  total: number;
  detalles: DetalleVentaCreateDTO[];
}

export interface DetalleVentaCreateDTO {
  productoId: number;
  cant: number;
}
