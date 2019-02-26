import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgxChartsModule,
  ],
  declarations: [
    LoadingComponent,
  ],
  exports: [
    LoadingComponent,
    NgxChartsModule

  ]
})
export class SharedModule { }
