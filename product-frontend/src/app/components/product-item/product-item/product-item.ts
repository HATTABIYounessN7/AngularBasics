import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
  standalone: true,
})
export class ProductItem implements OnInit {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();
  @Output() details = new EventEmitter<number>();

  viewDetails() {
    this.details.emit(this.product.id);
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }

  ngOnInit(): void {}
}
