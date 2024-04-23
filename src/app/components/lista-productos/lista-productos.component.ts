import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productos.service'; // Import ProductService or any service to fetch products
import { Product } from '../../models/product';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PaginationComponent} from "../pagination/pagination.component";
import {Router} from "@angular/router"; // Import Product model if available

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    PaginationComponent
  ],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.scss'
})

export class ListaProductosComponent implements OnInit {
  products: Product[] = [];
  pagedProducts: Product[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages: number = 1;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductos()
      .subscribe((products: Product[]) => {
        this.products = products.map((product, index) => ({ ...product, id: index + 1, loaded: false }));
        console.log(this.products);
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.changePage(1);
      });
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    this.pagedProducts = this.products.slice(startIndex, endIndex);
    this.loadImages(startIndex, endIndex);
  }

  loadImages(startIndex: number, endIndex: number): void {
    for (let i = startIndex; i < endIndex; i++) {
      const img = new Image();
      img.src = this.products[i].Image1;
      img.onload = () => {
        this.products[i].loaded = true;
      };
    }
  }

  viewProductDetails(product_id: number): void {
    if (product_id) {
      // Navigate to product detail view
      this.router.navigate(['/product', product_id]);
    } else {
      console.error('Invalid product or product ID');
    }
  }

  protected readonly toString = toString;
}
