import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartInfoService } from 'src/app/services/cart.info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  my_cart: any = {};
  current_item = [];
  voucher_code = '';
  voucher_invalid = false;
  saving = false;

  constructor(
    private http: ApiService,
    private cart_svc: CartInfoService,
    private modal: NgbModal,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService

  ) { }

  async ngOnInit() {
    await this.cart_svc.object.subscribe(() => {
      if (localStorage.getItem('cart') !== null) {

        this.my_cart = JSON.parse(atob(localStorage.getItem('cart')));
      }
    });

  }

  public show(content, item) {
    this.current_item = item;
    this.open(content);
  }

  public open(content) {
    this.modal.open(content, { centered: true, backdrop: 'static' });
  }

  public cancel() {
    this.modal.dismissAll();
  }

  public removeItem() {
    const idx = this.my_cart.items.indexOf(this.current_item);
    if (idx >= 0) {
      this.my_cart.items.splice(idx, 1);

      if (this.my_cart.items.length > 0) {
        this.updateCart();
        this.cart_svc.applyCartChanges(this.my_cart);

      } else {
        this.cart_svc.applyCartChanges({ items: [] });
        this.router.navigate(['']);
      }
    }

    this.cancel();
  }

  public changQuantity(item: any, add = true) {

    const qty = add ? (Number.isNaN(item.quantity) || !item.quantity) ? 1 : item.quantity + 1 :
      (Number.isNaN(item.quantity) || !item.quantity) ? 0 : item.quantity - 1;

    item.quantity = qty;
    this.addToCart(item);
  }

  private addToCart(item) {
    const idx = this.my_cart.items.indexOf(this.my_cart.items.find(x => x.id === item.id));

    idx >= 0 ? this.my_cart.items[idx] = item : this.my_cart.items.push(item);
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

  applyVoucher() {
    this.http.get('api/check-voucher', this.voucher_code).subscribe(
      res => {
        this.voucher_invalid = !res['count'];

        this.my_cart.discount = this.getDiscount();

      }
    );

  }

  getDiscount() {

    const less = 0.1;
    const computed_discount = less * this.my_cart.amount_payable;

    return this.voucher_invalid ? 0 : Math.round(computed_discount);
  }

  saveOrder() {

    this.saving = true;
    this.http.post('api/save-order', this.my_cart).subscribe(
      res => {
        const success = res['success'];
        if (success) {
          localStorage.clear();
          const flashMessage = {
            messages: ['Order has been placed successfully.'],
            timeout: 2000,
            type: 'success',
            dismissible: false
          };
          this.cart_svc.applyCartChanges({ items: [] });
          this.ngFlashMessageService.showFlashMessage(flashMessage);
          this.router.navigate(['']);
        }
      }
    );
  }
}
