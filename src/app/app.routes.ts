import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartModule } from './components/cart/cart.module';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cart', loadChildren: () => CartModule },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MainComponent, PageNotFoundComponent,
];
