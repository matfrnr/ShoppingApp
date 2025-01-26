import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product_models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //? je crée un BehaviorSubject pour stocker les produits du panier ce qui permet d'émettre la dernière valeur directement aux abonnées (Observable ne retient pas la dernière valeur)
  private cartItems = new BehaviorSubject<ProductModel[]>([]);
  //? pour convertir le BehaviorSubject en Observable
  cartItems$ = this.cartItems.asObservable();

  /**
   * ? ajouter un produit au panier 
   * @param product 
   */
  updateCart(product: ProductModel): void {
    //? je récupère les produits actuels
    const currentItems = this.cartItems.value;
    //? je cherche l'index du produit dans le panier
    const itemIndex = currentItems.findIndex(item => item.id === product.id);

    //? si le produit est déjà dans le panier je mets à jour la quantité sinon j'ajoute le produit
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = product.quantity;
    }
    //? si le produit n'est pas dans le panier je l'ajoute
    else {
      currentItems.push(product);
    }

    //? j'émet la nouvelle valeur
    this.cartItems.next([...currentItems]);
  }

  /**
   * ? récupérer le nombre d'éléments dans le panier
   * @returns 
   */
  getCartItemCount(): number {
    //? je récupère les produits actuels et je fais la somme des quantités
    return this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  /**
   * ? récupérer le prix total du panier
   * @returns 
   */
  getTotalPrice(): number {
    //? je fais la somme de tous les prix des produits en fonction de leur quantité
    return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  /**
   * ? supprimer un produit du panier
   * @param productId 
   */
  removeProduct(productId: number): void {
    //? je filtre les produits pour supprimer le produit avec l'id donné
    const currentItems = this.cartItems.value.filter(item => item.id !== productId);
    this.cartItems.next(currentItems);
  }

  /**
   * ? pour vider le panier en rénitialisant la liste avec un tableau vide
   */
  clearCart(): void {
    this.cartItems.next([]);
  }
}