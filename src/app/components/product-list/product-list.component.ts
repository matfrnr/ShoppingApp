import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from './../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ProductModel } from '../../models/product_models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  //? je crée un tableau pour stocker les produits à afficher
  products: ProductModel[] = [];

  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  /**
   * ? j'initialise la liste des produits au chargement du composant 
   * ? je souscris à l'observable cartItems$ pour mettre à jour les quantités des produits
   */
  ngOnInit(): void {
    this.displayProductList();
    this.cartService.cartItems$.subscribe(cartItems => {
      this.updateProductQuantities(cartItems);
    });
  }

  /**
   * ? augmenter la quantité d'un produit
   * @param product 
   */
  incrementProduct(product: ProductModel) {
    //? je limite le maximum de produit 
    if (product.quantity < 9) {
      product.quantity++;
    }
  }

  /**
   * ? diminuer la quantité d'un produit
   * @param product 
   */
  decrementProduct(product: ProductModel) {
    //? si la quantité est valide alors je décrémente
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  /**
   * ? ajouter un produit au panier
   * @param product 
   */
  addToCart(product: ProductModel) {
    //? si j'ajoute au panier un produit avec une quantité valide j'affiche une snackbar et je mets à jour le panier
    if (product.quantity > 0) {
      this.snackBar.open('Produit ajouté au panier', 'Fermer', {
        duration: 2000
      });
      this.cartService.updateCart(product);
    }
    //? si j'essaye d'ajouter au panier un produit avec une quantité de 0 alors snackbar
    else {
      this.snackBar.open('Quantité invalide', 'Fermer', {
        duration: 2000
      });
    }
  }

  /**
   * ? je souscris à l'observable qui me permet de récupérer la liste des produits depuis l'API 
   * ? sachant que la quantité n'existe pas dans l'API je dois l'initialiser
   */
  displayProductList(): void {
    this.productsService.getProduct().subscribe(data => {
      this.products = data.map(product => {
        product.quantity = 0;
        return product;
      });
    });
  }

  /**
   * ? synchroniser les quantités des produits avec le panier
   * @param cartItems 
   */
  updateProductQuantities(cartItems: ProductModel[]): void {
    //? pour chaque produit je récupère la quantité depuis le panier
    this.products.forEach(product => {
      //? si le produit est dans le panier je récupère la quantité sinon je mets 0
      const cartItem = cartItems.find(item => item.id === product.id);
      //? je mets à jour la quantité du produit
      if (cartItem) {
        product.quantity = cartItem.quantity;
      }
      //? si le produit n'est pas dans le panier je mets 0
      else {
        product.quantity = 0;
      }
    });
  }
}