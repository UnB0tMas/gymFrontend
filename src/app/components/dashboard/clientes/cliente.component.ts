// src/app/components/dashboard/clientes/cliente.component.ts
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/dashboard/cliente.model';
import { ClienteService } from '../../../services/dashboard/cliente.service';
import { Membresia } from '../../../models/dashboard/membresia.model';

const NUEVO_CLIENTE: () => Cliente = () => ({
  persona: {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    fechaNacimiento: '',
    docIdentidad: '',
    ndeDocumento: '',
    telefono: ''
  },
  pesoInicio: 0,
  membresia: null
});

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoCliente: Cliente = NUEVO_CLIENTE();
  membresias: Membresia[] = [];
  cargando = false;
  error: string | null = null;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarMembresias();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.svc.getAll().subscribe({
      next: (list: Cliente[]) => {
        this.clientes = list;
        this.cargando = false;
      },
      error: err => {
        this.error = 'Error cargando clientes';
        this.cargando = false;
      }
    });
  }

  cargarMembresias(): void {
    this.svc.getMembresias().subscribe({
      next: (membs: Membresia[]) => this.membresias = membs,
      error: () => this.error = 'Error cargando membresías'
    });
  }

  guardar(): void {
    if (!this.nuevoCliente.persona.nombre || !this.nuevoCliente.persona.apellidoP || !this.nuevoCliente.pesoInicio) {
      this.error = 'Completa los campos obligatorios';
      return;
    }
    this.cargando = true;
    this.svc.create(this.nuevoCliente).subscribe({
      next: () => {
        this.cargarClientes();
        this.nuevoCliente = NUEVO_CLIENTE();
        this.error = null;
        this.cargando = false;
      },
      error: err => {
        this.error = 'Error guardando cliente';
        this.cargando = false;
      }
    });
  }

  borrar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
    this.cargando = true;
    this.svc.delete(id).subscribe({
      next: () => this.cargarClientes(),
      error: err => {
        this.error = 'Error eliminando cliente';
        this.cargando = false;
      }
    });
  }
}
