import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductModel } from '../models/product_models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//? Service qui permet de recuperer les produits depuis l'api
export class ProductsService {

  //? L'url de l'api pour recup les produits
  private URL = "https://dummyjson.com/products/category/smartphones?limit=8&select=description,price,category,title,images";

  private http = inject(HttpClient);

  /**
   * *Fonction pour recuperer les produits depuis l'api
   * ?Elle prend un observable de ProductModel[] qui type la réponse de l'api
   * @returns ProductModel[]
   */
  getProduct(): Observable<ProductModel[]> {
    //? l'api renvoie pluieurs object, donc je fais un map pour récuperer uniquement ce qui m'intéresse
    return this.http.get<{ products: ProductModel[] }>(this.URL).pipe(
      map(response => response.products)
    )
  }
}
