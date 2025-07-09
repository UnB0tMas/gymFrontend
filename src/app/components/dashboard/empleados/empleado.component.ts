import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../models/dashboard/empleado.model';
import { EmpleadoService } from '../../../services/dashboard/empleado.service';
import { Area } from '../../../models/dashboard/area.model';
import { AreaService } from '../../../services/dashboard/area.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  areas: Area[] = [];

  nuevoEmpleado: Empleado = {
    persona: {
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      fechaNacimiento: '',
      docIdentidad: '',
      ndeDocumento: '',
      telefono: ''
    },
    area: {
      areaId: undefined,
      nombreArea: ''
    },
    fechaContratacion: '',
    sueldo: 0
  };

  constructor(
    private empleadoSvc: EmpleadoService,
    private areaSvc: AreaService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarAreas();
  }

  cargarEmpleados(): void {
    this.empleadoSvc.getAll().subscribe((list: Empleado[]) => {
      this.empleados = list;
    });
  }

  cargarAreas(): void {
    this.areaSvc.getActivas().subscribe((areas: Area[]) => {
      this.areas = areas;
    });
  }

  guardar(): void {
    this.empleadoSvc.create(this.nuevoEmpleado).subscribe(() => {
      this.cargarEmpleados();
      this.nuevoEmpleado = {
        persona: { nombre: '', apellidoP: '', apellidoM: '', fechaNacimiento: '', docIdentidad: '', ndeDocumento: '', telefono: '' },
        area: { areaId: undefined, nombreArea: '' },
        fechaContratacion: '',
        sueldo: 0
      };
    });
  }

  borrar(id: number): void {
    this.empleadoSvc.delete(id).subscribe(() => this.cargarEmpleados());
  }
}
