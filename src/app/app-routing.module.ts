import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ProgramComponent } from './components/program/program.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'program/:id/:episode/:name',
    component: ProgramComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
