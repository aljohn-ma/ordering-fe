import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { CartInfoService } from './services/cart.info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  my_cart: any = { items: [] };

  constructor(private cart_svc: CartInfoService) {
    cart_svc.object.subscribe(
      () => {
        if (localStorage.getItem('cart') !== null) {
          this.my_cart = JSON.parse(atob(localStorage.getItem('cart')));
        }
      }
    );
  }
}
