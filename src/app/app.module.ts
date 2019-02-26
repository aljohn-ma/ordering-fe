import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// INSTALLED MODULES
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// PROJECT IMPORTS
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    NgFlashMessagesModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
