import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';
import { plainToClass } from 'class-transformer';
import { GET_ITEMS } from 'src/app/constants/urls';
import { CartInfoService } from 'src/app/services/cart.info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  items: any;
  is_loading = true;
  my_cart: any = { items: [] };

  constructor(
    private http: ApiService,
    private cart_svc: CartInfoService
  ) { }

  async ngOnInit() {
    await this.getItems();
  }

  private getItems() {
    this.http.get_list(GET_ITEMS()).subscribe(
      res => {
        this.items = res;
        this.is_loading = false;
      }
    );
  }

  public getBg(idx: number) {
    return (idx % 2) === 0 ? 'bg-dark' : 'bg-light';
  }

  public getText(idx: number) {
    return (idx % 2) === 0 ? 'text-white' : 'text-dark';
  }

  public changQuantity(item: any, add = true) {
    const qty = add ? (Number.isNaN(item.quantity) || !item.quantity) ? 1 : item.quantity + 1 :
      (Number.isNaN(item.quantity) || !item.quantity) ? 0 : item.quantity - 1;

    item.quantity = qty;
    this.addToCart(item);
  }

  private addToCart(item) {
    item.total = item.price * item.quantity;

    const idx = this.my_cart.items.indexOf(this.my_cart.items.find(x => x.id === item.id));

    idx >= 0 ? (item.quantity === 0) ? this.my_cart.items.splice(idx, 1) : this.my_cart.items[idx] = item : this.my_cart.items.push(item);
    this.updateCart();
    this.cart_svc.applyCartChanges(this.my_cart);
  }

  private updateCart() {
    const total_sales = this.my_cart.items.map(item => item.price * item.quantity)
      .reduce((sum: number, current: number) => (sum * 1) + (current * 1));

    const total_vat = this.my_cart.items.map(item => item.tax_amount * item.quantity)
      .reduce((sum: number, current: number) => (sum * 1) + (current * 1));

    this.my_cart.total_sales = total_sales;
    this.my_cart.total_vat = total_vat;
    this.my_cart.amount_payable = total_sales + total_vat;
    this.my_cart.discount = 0;
  }

}
