import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  { path: '', component: ListaProductosComponent },
  { path: 'products', component: ListaProductosComponent },
  { path: 'product/:id', component: DetalleProductoComponent },
  { path: '**', redirectTo: '' } // Redirect to home if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
