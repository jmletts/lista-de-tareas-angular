import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TareasService } from './services/tareas.service';
import { Tarea } from './models/tarea.interface';
import { InicioComponent } from "./inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InicioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(InicioComponent) inicioComponent!: InicioComponent;
  listatareas: Tarea[] = [];
  nuevaTarea: Tarea = {
    index: 0,
    nombre: '',
    descripcion: '',
    fecha: '',
    completada: false,
    subtarea: [],
  };
  visible = false;

  private _tareasService = inject(TareasService);

  setVisible(value: boolean): void {
    this.visible = value;
  }

  addTarea(): void {
    if (this.nuevaTarea.nombre.trim() && this.nuevaTarea.descripcion.trim()) {
      this.nuevaTarea.index = this.listatareas.length + 1;
      this._tareasService.addTarea(this.nuevaTarea);
      this.nuevaTarea = {
        index: 0,
        nombre: '',
        descripcion: '',
        fecha: '',
        completada: false,
        subtarea: [],
      };
      this.listatareas = this._tareasService.getTareas();
      this.visible = false;
    }
  }


  addSubtarea(): void {
    this.nuevaTarea.subtarea.push('');
  }

  removeSubtarea(index: number): void {
    this.nuevaTarea.subtarea.splice(index, 1);
  }

  private resetNuevaTarea(): void {
    this.nuevaTarea = {
      index: 0,
      nombre: '',
      descripcion: '',
      fecha: '',
      completada: false,
      subtarea: [],
    };
  }
}
