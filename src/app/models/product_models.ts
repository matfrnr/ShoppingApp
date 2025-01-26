// Interface pour la récuperation des produits depuis l'API
export interface ProductModel {
    id: number;
    category: string;
    description: string;
    images: string[];
    price: number;
    title: string;
    quantity: number; // n'est pas dans l'API, mais je l'ajoute pour gérer la quantité de chaque produit
}