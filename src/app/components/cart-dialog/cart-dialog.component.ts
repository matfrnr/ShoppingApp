import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { ProductModel } from '../../models/product_models';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
  standalone: true,
  imports: [NgFor, MatIconModule]
})

//?La gestion du panier
export class CartDialogComponent implements OnInit {

  //? je crée un tableau vide pour stocker les produits du panier
  cartItems: ProductModel[] = [];
  //? je crée une variable pour stocker le prix total du panier
  totalPrice: number = 0;

  //? pour injecter les services
  private cartService = inject(CartService);
  private dialogRef = inject(MatDialogRef<CartDialogComponent>);
  private snackBar = inject(MatSnackBar);

  /**
   * ?Je souscris à l'observable du service pour mettre à jour le panier dès qu'il y a un changement 
   */
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      //? mon tableau vide prend la valeur du tableau du service contenant les produits du panier  
      this.cartItems = items;
      //? ma variable s'initialise avec le prix total du panier récuperer depuis la fonction
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  /**
   * ?Fonction pour supprimer un produit du panier
   * ?Pour cela, j'appelle la fonction removeProduct du service en lui passant l'id du produit
   * ?Je met à jour le prix total du panier après la suppression
   * @param productId 
   */
  deleteProduct(productId: number): void {
    //? je supprime le produit du panier avec la fonction de mon service
    this.cartService.removeProduct(productId);
    //? je met à jour le prix total du panier 
    this.totalPrice = this.cartService.getTotalPrice();

    //!*?ça permet de fermer le panier lorsque ya plus rien psk sinon c'est bizarre
    if (this.totalPrice === 0) {
      this.closeDialog();
    }
  }

  /**
   * ?Fonction pour fermer le panier
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * ?Quand je clique sur payer, j'affiche une snackbar avec le prix total
   * ?Je vide le panier et je le ferme
   */
  pay(): void {
    //? je stocke le prix total du panier dans une variable pour pouvoir l'afficher
    const totalPrice = this.totalPrice;
    //? je vide le panier avec la fonction de mon service
    this.cartService.clearCart();
    //? je ferme le panier
    this.dialogRef.close();
    //? j'affiche une snackbar avec le prix total
    this.snackBar.open(`Vous avez payé ${totalPrice} €. Merci pour votre commande.`, 'Fermer', {
      duration: 3000
    });
  }
}