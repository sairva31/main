import { Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { InventoryComponent } from './inventory/inventory.component';

// ui


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'branches',
        component: BranchesComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      }
    ],
  },
];
