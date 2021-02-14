import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {PokemonDetailsComponent} from "./components/pokemon-details/pokemon-details.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [{
  path: "pokemon/:pokemonId",
  component: PokemonDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
