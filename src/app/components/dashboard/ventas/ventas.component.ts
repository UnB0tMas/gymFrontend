// src/app/components/dashboard/ventas/ventas.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { VentaResponseDTO, VentaCreateDTO } from '../../../models/dashboard/venta.model';
import { ProductoResponseDTO } from '../../../models/dashboard/producto.model';
import { VentaService } from '../../../services/dashboard/venta.service';
import { ProductoService } from '../../../services/dashboard/producto.service';
import { HttpClient } from '@angular/common/http';

interface ClienteLocal {
  clienteId: number;
  nombreCompleto: string;
  documento: string;
  estado: boolean;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: VentaResponseDTO[] = [];
  productos: ProductoResponseDTO[] = [];
  clientes: ClienteLocal[] = [];
  cargando = false;
  error: string | null = null;

  ventaForm: FormGroup;
  agregandoVenta = false;
  fechaActual: Date = new Date();

  metodoPagoList = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'YAPE', 'PLIN'];

  constructor(
    private ventaSvc: VentaService,
    private productoSvc: ProductoService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.ventaForm = this.fb.group({
      personaId: [null, Validators.required],
      metodoPago: ['EFECTIVO', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarProductos();
    this.cargarClientes();
    this.agregarDetalle();
  }

  // ------------ DATA --------------
  cargarVentas() {
    this.cargando = true;
    this.ventaSvc.getAll().subscribe({
      next: (data) => { this.ventas = data; this.cargando = false; },
      error: () => { this.error = 'Error cargando ventas'; this.cargando = false; }
    });
  }
  cargarProductos() {
    this.productoSvc.getAll().subscribe({
      next: (data) => this.productos = data.filter(p => p.estado)
    });
  }
  cargarClientes() {
    this.http.get<ClienteLocal[]>('http://localhost:8081/api/clientes-local').subscribe({
      next: (list) => this.clientes = list.filter(c => c.estado),
      error: () => this.error = 'Error cargando clientes'
    });
  }

  // --------- FORM LOGIC -----------
  get detalles(): FormArray {
    return this.ventaForm.get('detalles') as FormArray;
  }
  agregarDetalle() {
    this.detalles.push(this.fb.group({
      productoId: [null, Validators.required],
      cant: [1, [Validators.required, Validators.min(1)]]
    }));
  }
  quitarDetalle(i: number) {
    if (this.detalles.length > 1) this.detalles.removeAt(i);
  }

  resetForm() {
    this.ventaForm.reset({ metodoPago: 'EFECTIVO' });
    while (this.detalles.length) this.detalles.removeAt(0);
    this.agregarDetalle();
    this.error = null;
    this.fechaActual = new Date(); // Actualiza fecha
    // *No cerramos el formulario aquí, para mayor usabilidad*
  }

  calcularTotal(): number {
    let sum = 0;
    this.detalles.controls.forEach(det => {
      const pid = det.value.productoId;
      const cant = det.value.cant || 0;
      const prod = this.productos.find(p => p.productoId == pid);
      if (prod) sum += Number(prod.precio) * cant;
    });
    return sum;
  }
  calcularIGV(): number {
    return +(this.calcularTotal() * 0.18).toFixed(2);
  }
  calcularSubtotal(): number {
    return +(this.calcularTotal() - this.calcularIGV()).toFixed(2);
  }
  getCantidadProductos(): number {
    let suma = 0;
    this.detalles.controls.forEach(det => suma += Number(det.value.cant) || 0);
    return suma;
  }

  guardarVenta() {
    if (this.ventaForm.invalid) {
      this.error = 'Completa todos los campos obligatorios.';
      return;
    }
    // Validar stock
    for (let det of this.detalles.controls) {
      const pid = det.value.productoId;
      const cant = det.value.cant;
      const prod = this.productos.find(p => p.productoId == pid);
      if (!prod) {
        this.error = 'Selecciona productos válidos';
        return;
      }
      if (prod.stock < cant) {
        this.error = `Stock insuficiente para ${prod.nombre}: stock actual ${prod.stock}, solicitado ${cant}`;
        return;
      }
    }
    const dto: VentaCreateDTO = {
      fechaVenta: this.fechaActual.toISOString(),
      personaId: this.ventaForm.value.personaId,
      igv: this.calcularIGV(),
      metodoPago: this.ventaForm.value.metodoPago,
      total: this.calcularTotal(),
      detalles: this.detalles.value
    };
    this.cargando = true;
    this.ventaSvc.create(dto).subscribe({
      next: () => {
        this.cargarVentas();
        this.resetForm();
        this.cargando = false;
        this.agregandoVenta = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error guardando la venta';
        this.cargando = false;
      }
    });
  }

  eliminarVenta(id: number) {
    if (!confirm('¿Eliminar esta venta? Esta acción no puede deshacerse.')) return;
    this.ventaSvc.delete(id).subscribe(() => this.cargarVentas());
  }

  getNombreCliente(personaId: number): string {
    const c = this.clientes.find(x => x.clienteId == personaId);
    return c ? `${c.nombreCompleto} (${c.documento})` : '';
  }
  getPrecioProducto(pid: number): number {
    const p = this.productos.find(x => x.productoId == pid);
    return p ? Number(p.precio) : 0;
  }
  getStockProducto(pid: number): number {
    const p = this.productos.find(x => x.productoId == pid);
    return p ? Number(p.stock) : 0;
  }
}
