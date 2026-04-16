import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ProductItem } from '../../product-item/product-item/product-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem, CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true,
})
export class ProductList implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);
  searchTerm: string = '';
  selectedProduct?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
        //this.cdr.markForCheck();
      },
      error: (error) => console.error(error),
    });
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      },
      error: (error) => console.error(error),
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProdcut(id).subscribe({
      next: () => {
        this.products.update((current) => current.filter((product) => product.id !== id));
      },
      error: (error) => console.log(error),
    });
  }

  searchProducts() {
    if (this.searchTerm.trim() === '') {
      this.loadProducts();
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.products.update((current) =>
        current.filter((product) => product.name.toLowerCase().includes(term)),
      );
    }
  }

  trackById(idx: number, product: Product) {
    return product.id;
  }
}
