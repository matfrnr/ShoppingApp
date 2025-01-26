import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// fichier par défaut pour lancer l'application
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // j'ai eu un gros problème avec ça
    provideAnimations()
  ]
}).catch(err => console.error(err));