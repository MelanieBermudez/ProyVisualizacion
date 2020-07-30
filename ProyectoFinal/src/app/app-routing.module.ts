import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {path:'', component:PrincipalComponent, pathMatch: 'full'},
  {path:'principal', component:PrincipalComponent, pathMatch: 'full'},
  {path:'peliculas', component:PeliculaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
