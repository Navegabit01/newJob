import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/productos.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './detalle-producto.component.html',
  standalone: true,
  styleUrls: ['./detalle-producto.component.scss']
})

export class DetalleProductoComponent implements OnInit {
  productId: number = 1;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      // Fetch the product details using the product ID
      this.getProductDetails();
    });
  }

  getProductDetails(): void {
    // Call the ProductService to fetch the product details by ID
    this.productService.getProductById(this.productId)
      .subscribe(product => this.product = product);
  }

}
