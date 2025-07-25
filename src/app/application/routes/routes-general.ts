import {RouteItemGeneral} from "@core-interfaces/routes/route-item-general.interface";

export const routesGeneral: { [key: string]: RouteItemGeneral } = {
  'app': {
    code: 'app',
    path: '',
    name: 'app',
    icon: 'home',
  },
  'home': {
    code: 'home',
    path: '/bak-office/home',
    name: 'Inicio',
    icon: 'home',
    availableNavigation: true
  }
}
