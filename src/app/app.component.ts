import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';
import { Tarea } from './models/tarea.interface';
import { RouterModule } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,  InicioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
