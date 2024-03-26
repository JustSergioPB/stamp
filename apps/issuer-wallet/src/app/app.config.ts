import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  LucideAngularModule,
  Braces,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Braces,
        ChevronLeft,
        ChevronRight,
        ChevronsLeft,
        ChevronsRight,
      }),
    ),
    importProvidersFrom(TranslateModule.forRoot()),
  ],
};
