import { Directive, AfterContentChecked } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxDatatableWatcher]'
})
export class NgxDatatableWatcherDirective implements AfterContentChecked {

  private tbl: DatatableComponent;

  constructor(private table: DatatableComponent) {
    this.tbl = table;
  }

  ngAfterContentChecked() {
   this.tbl.recalculate();
   this.tbl.offset = 0;
   console.log('woa');
  }

}
