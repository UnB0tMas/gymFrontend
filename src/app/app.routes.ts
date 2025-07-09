// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/inicio/dashboard.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ClienteComponent } from './components/dashboard/clientes/cliente.component';
import { EmpleadoComponent } from './components/dashboard/empleados/empleado.component';
import { MembresiaComponent } from './components/dashboard/membresias/membresia.component';

// 👇 Importa InventarioComponent
import { InventarioComponent } from './components/dashboard/inventario/inventario.component';
import {VentasComponent} from "./components/dashboard/ventas/ventas.component";

export const routes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clientes',   component: ClienteComponent,  canActivate: [AuthGuard] },
  { path: 'empleados',  component: EmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'membresias', component: MembresiaComponent, canActivate: [AuthGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] }, // 👈 NUEVA RUTA
  { path: 'ventas',     component: VentasComponent, canActivate: [AuthGuard]},
  { path: '',           redirectTo: '/login', pathMatch: 'full' },
  { path: '**',         redirectTo: '/login' },
];
