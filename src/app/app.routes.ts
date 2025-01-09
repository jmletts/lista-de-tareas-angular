import { Routes } from '@angular/router';
import { TareaDetailComponent } from './tarea-detail/tarea-detail.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
    {path : '', component : InicioComponent},
    {path : 'tarea/:index',  component : TareaDetailComponent}
];
