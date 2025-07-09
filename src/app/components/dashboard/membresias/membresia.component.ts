// src/app/components/dashboard/membresias/membresia.component.ts

import { Component, OnInit } from '@angular/core';
import { Membresia } from '../../../models/dashboard/membresia.model';
import { MembresiaService } from '../../../services/dashboard/membresia.service';

const NUEVA_MEMBRESIA: () => Membresia = () => ({
  nombre: '',
  descripcion: '',
  duracionMeses: 1,
  precio: 0,
  fechaInicioVigencia: '',
  fechaFinVigencia: '',
  estado: true
});

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {
  membresias: Membresia[] = [];
  formMembresia: Membresia = NUEVA_MEMBRESIA();
  cargando = false;
  error: string | null = null;
  editando = false;
  editId: number | null = null;

  constructor(private svc: MembresiaService) {}

  ngOnInit(): void {
    this.cargarMembresias();
  }

  cargarMembresias(): void {
    this.cargando = true;
    this.svc.getAll().subscribe({
      next: (list) => {
        this.membresias = list;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error cargando membresías';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (!this.formMembresia.nombre || !this.formMembresia.duracionMeses || this.formMembresia.precio === null || !this.formMembresia.fechaInicioVigencia) {
      this.error = 'Completa los campos obligatorios';
      return;
    }
    this.cargando = true;
    if (this.editando && this.editId) {
      this.svc.update(this.editId, this.formMembresia).subscribe({
        next: () => {
          this.cargarMembresias();
          this.resetForm();
        },
        error: () => {
          this.error = 'Error actualizando membresía';
          this.cargando = false;
        }
      });
    } else {
      this.svc.create(this.formMembresia).subscribe({
        next: () => {
          this.cargarMembresias();
          this.resetForm();
        },
        error: () => {
          this.error = 'Error guardando membresía';
          this.cargando = false;
        }
      });
    }
  }

  editar(m: Membresia): void {
    this.formMembresia = { ...m };
    this.editando = true;
    this.editId = m.membresiaId!;
    this.error = null;
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta membresía?')) return;
    this.cargando = true;
    this.svc.delete(id).subscribe({
      next: () => this.cargarMembresias(),
      error: () => {
        this.error = 'Error eliminando membresía';
        this.cargando = false;
      }
    });
  }

  resetForm(): void {
    this.formMembresia = NUEVA_MEMBRESIA();
    this.editando = false;
    this.editId = null;
    this.cargando = false;
    this.error = null;
  }
}
