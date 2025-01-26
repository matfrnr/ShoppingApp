import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

// je vois pas trop l'interet du router sur une single page
export const routes: Routes = [
    { path: '', component: ProductListComponent}
];
