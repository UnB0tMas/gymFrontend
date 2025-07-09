// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/inicio/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { ClienteComponent } from './components/dashboard/clientes/cliente.component';
import { MembresiaComponent } from './components/dashboard/membresias/membresia.component';
import { EmpleadoComponent } from './components/dashboard/empleados/empleado.component';

// 👇 Agrega tu componente InventarioComponent:
import { InventarioComponent } from './components/dashboard/inventario/inventario.component';

import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthGuard } from './services/auth/auth.guard';

import { routes } from './app.routes';
import {VentasComponent} from "./components/dashboard/ventas/ventas.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ClienteComponent,
    EmpleadoComponent,
    MembresiaComponent,
    InventarioComponent, // 👈 ¡Nuevo componente aquí!
    VentasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,              // para ngModel y formularios template
    ReactiveFormsModule,      // para formularios reactivos (como inventario)
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  exports: [
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
