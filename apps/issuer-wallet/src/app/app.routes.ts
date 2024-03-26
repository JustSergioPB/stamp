import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'schemas',
    loadComponent: () =>
      import('./pages/schemas/schemas.component').then(
        (m) => m.SchemasComponent,
      ),
  },
];
