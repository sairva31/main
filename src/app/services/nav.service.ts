import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
/**
 * Servicio de navegación de las páginas,
 * Permite de definir conforme al menú y dependiendo de las constructor obtener la página a mostrar
*/

@Injectable({ providedIn: 'root' })
export class NavService {

    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }


}
