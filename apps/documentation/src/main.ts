import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { DocAppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app/app.routing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BlizzModule } from '@blizz/ui';
import { blizzConfig } from './blizz.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DocAppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTING), BlizzModule.forRoot(blizzConfig)),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
