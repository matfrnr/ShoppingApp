import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //? récuperer les méthodes du service
  private cartService = inject(CartService);
  //? pour ouvrir la popup
  private dialog = inject(MatDialog);
  //? pour affi
  private snackBar = inject(MatSnackBar);

  /**
   * ? pour afficher le nombre d'éléments dans le badge
   * ? j'utilise un get pour l'utiliser directement comme une propriété et pas une méthode dans le template (pour avoir un code plus lisible)
   */
  get cartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  /**
   * ? méthode pour ouvrir le panier lorsque on clique sur l'icone 
   */
  openCartDialog(): void {
    //? si le panier n'est pas vide, ouvrir la fenetre
    if (this.cartItemCount > 0) {
      this.dialog.open(CartDialogComponent);
    }
    //? si le panier est vide, afficher une snackbar
    else {
      this.snackBar.open('Le panier est vide', 'Fermer', {
        duration: 3000
      });
    }
  }
}