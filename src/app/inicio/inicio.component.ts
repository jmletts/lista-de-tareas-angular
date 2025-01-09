
import { Tarea } from '../models/tarea.interface';
import { TareasService } from '../services/tareas.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TareaDetailComponent } from '../tarea-detail/tarea-detail.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioComponent implements OnInit {
  listatareas: Tarea[] = [];
  nuevaTarea: Tarea = { index: 0, nombre: '', descripcion: '', completada: false };
  visible = false;
  alert : boolean = false;

  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.listatareas = this._tareasService.getTareas();
  }

  addTarea(): void {
    if (this.nuevaTarea) {
      this._tareasService.addTarea(this.nuevaTarea);
      this.nuevaTarea = { index: 0, nombre: '', descripcion: '', completada: false };
      this.listatareas = this._tareasService.getTareas();
      this.visible = false
    }
  }

  deleteTarea(index: number): void {
    this._tareasService.deleteTarea(index);
    this.listatareas = this._tareasService.getTareas();
  }

  setVisible() {
    this.visible = true
  }

  updateTarea(tarea: Tarea, index: number): void {
    this._tareasService.updateTarea(index, tarea);
    this.listatareas = this._tareasService.getTareas();
  }
}
