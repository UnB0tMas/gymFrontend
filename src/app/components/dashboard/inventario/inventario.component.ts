//src/app/components/dashboard/inventario/inventario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaPResponseDTO, CategoriaPCreateDTO } from '../../../models/dashboard/categoria-p.model';
import { ProductoResponseDTO, ProductoCreateDTO } from '../../../models/dashboard/producto.model';
import { CategoriaPService } from '../../../services/dashboard/categoria-p.service';
import { ProductoService } from '../../../services/dashboard/producto.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  // Sidebar
  sidebarVisible = true;

  // Categorías
  categorias: CategoriaPResponseDTO[] = [];
  formCategoria: FormGroup;
  editCatId: number | null = null;
  buscandoCat = '';
  errorCat: string | null = null;
  loadingCat = false;

  // Productos
  productos: ProductoResponseDTO[] = [];
  formProducto: FormGroup;
  editProdId: number | null = null;
  buscandoProd = '';
  errorProd: string | null = null;
  loadingProd = false;

  constructor(
    private categoriaSvc: CategoriaPService,
    private productoSvc: ProductoService,
    private fb: FormBuilder
  ) {
    // Formularios reactivos
    this.formCategoria = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(255)]]
    });
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      categoriaPId: [null, [Validators.required]],
      unidadMedida: ['', [Validators.required, Validators.maxLength(50)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductos();
  }

  // --------- CATEGORÍAS ----------
  cargarCategorias() {
    this.loadingCat = true;
    this.categoriaSvc.getAll().subscribe({
      next: list => { this.categorias = list; this.loadingCat = false; },
      error: () => { this.errorCat = 'Error cargando categorías'; this.loadingCat = false; }
    });
  }
  buscarCategoria() {
    if (!this.buscandoCat.trim()) { this.cargarCategorias(); return; }
    this.loadingCat = true;
    this.categoriaSvc.buscarPorNombre(this.buscandoCat).subscribe({
      next: list => { this.categorias = list; this.loadingCat = false; },
      error: () => { this.errorCat = 'Error en la búsqueda'; this.loadingCat = false; }
    });
  }
  guardarCategoria() {
    if (this.formCategoria.invalid) return;
    const dto: CategoriaPCreateDTO = this.formCategoria.value;
    if (this.editCatId) {
      this.categoriaSvc.update(this.editCatId, dto).subscribe({
        next: _ => { this.cargarCategorias(); this.resetCategoria(); },
        error: () => { this.errorCat = 'Error actualizando'; }
      });
    } else {
      this.categoriaSvc.create(dto).subscribe({
        next: _ => { this.cargarCategorias(); this.resetCategoria(); },
        error: () => { this.errorCat = 'Error guardando'; }
      });
    }
  }
  editarCategoria(cat: CategoriaPResponseDTO) {
    this.editCatId = cat.categoriaPId;
    this.formCategoria.patchValue(cat);
  }
  eliminarCategoria(id: number) {
    if (!confirm('¿Eliminar la categoría?')) return;
    this.categoriaSvc.delete(id).subscribe(_ => this.cargarCategorias());
  }
  resetCategoria() {
    this.editCatId = null;
    this.formCategoria.reset();
    this.errorCat = null;
  }

  // --------- PRODUCTOS ----------
  cargarProductos() {
    this.loadingProd = true;
    this.productoSvc.getAll().subscribe({
      next: list => { this.productos = list; this.loadingProd = false; },
      error: () => { this.errorProd = 'Error cargando productos'; this.loadingProd = false; }
    });
  }
  buscarProducto() {
    if (!this.buscandoProd.trim()) { this.cargarProductos(); return; }
    this.loadingProd = true;
    this.productoSvc.buscarPorNombre(this.buscandoProd).subscribe({
      next: list => { this.productos = list; this.loadingProd = false; },
      error: () => { this.errorProd = 'Error en la búsqueda'; this.loadingProd = false; }
    });
  }
  guardarProducto() {
    if (this.formProducto.invalid) return;
    const dto: ProductoCreateDTO = this.formProducto.value;
    if (this.editProdId) {
      this.productoSvc.update(this.editProdId, dto).subscribe({
        next: _ => { this.cargarProductos(); this.resetProducto(); },
        error: () => { this.errorProd = 'Error actualizando'; }
      });
    } else {
      this.productoSvc.create(dto).subscribe({
        next: _ => { this.cargarProductos(); this.resetProducto(); },
        error: () => { this.errorProd = 'Error guardando'; }
      });
    }
  }
  editarProducto(prod: ProductoResponseDTO) {
    this.editProdId = prod.productoId;
    this.formProducto.patchValue({
      nombre: prod.nombre,
      categoriaPId: prod.categoriaPId,
      unidadMedida: prod.unidadMedida,
      precio: prod.precio,
      stock: prod.stock,
    });
  }
  eliminarProducto(id: number) {
    if (!confirm('¿Eliminar el producto?')) return;
    this.productoSvc.delete(id).subscribe(_ => this.cargarProductos());
  }
  resetProducto() {
    this.editProdId = null;
    this.formProducto.reset();
    this.errorProd = null;
  }
}
