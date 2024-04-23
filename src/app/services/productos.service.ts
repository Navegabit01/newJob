import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Product } from '../models/product';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/DatosScraping.json'; // URL del archivo JSON de productos
  private products: Product[] = []; // Cache for products

  constructor(private http: HttpClient) { }

  // Método para obtener los productos desde el archivo JSON
  getProductos(): Observable<Product[]> {
    if (this.products.length) {
      return of(this.products); // Return cached products if available
    } else {
      return this.http.get<Product[]>(this.productsUrl)
        .pipe(
          tap(products => {
            // Generate unique IDs for products
            this.products = products.map((product, index) => ({ ...product, id: index + 1 }));
          }), // Cache products
          catchError(this.handleError<Product[]>('getProductos', []))
        );
    }
  }

  // Método para obtener un producto por su ID
  getProductById(id: number): Observable<Product> {
    const product = this.products[id];
    if (product) {
      return of(product); // Return the product if found in the cache
    } else {
      // If the product is not found in the cache, fetch it from the server
      const url = `${this.productsUrl}/${id}`;
      return this.http.get<Product>(url).pipe(
        catchError(this.handleError<Product>('getProductById'))
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log the error to the console
      console.error(error);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
