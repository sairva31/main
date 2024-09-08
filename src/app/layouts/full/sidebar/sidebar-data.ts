import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Reportes',
  },
  {
    displayName: 'Sucursales',
    iconName: 'aperture',
    route: '/ui-components/branches',
  },
  {
    displayName: 'Inventario',
    iconName: 'list',
    route: '/ui-components/inventory',
  }
];
