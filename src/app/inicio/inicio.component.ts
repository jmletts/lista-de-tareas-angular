import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TareasService } from '../services/tareas.service';
import { Tarea } from '../models/tarea.interface';
import { UpdaterService } from '../services/updater.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
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
  private _updaterService = inject(UpdaterService);

  ngOnInit(): void {
    this._updaterService.update$.subscribe(()=>{
      this.listatareas = this._tareasService.getTareas();
    })
    
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

  deleteTarea(index: number): void {
    this._tareasService.deleteTarea(index);
    this.listatareas = this._tareasService.getTareas();
  }

  

  updateTarea(tarea: Tarea, index: number): void {
    this._tareasService.updateTarea(index, tarea);
    this.listatareas = this._tareasService.getTareas();
  }

  addSubtarea(): void {
    this.nuevaTarea.subtarea.push('');
  }

  removeSubtarea(index: number): void {
    this.nuevaTarea.subtarea.splice(index, 1);
  }

  setVisible(value: boolean){
    this.visible = value;
  }

  updateTareas() : void{
    this.listatareas = this._tareasService.getTareas(); // actualizar desde otro componente
  }
}
