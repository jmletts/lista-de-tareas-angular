import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private localStorageKey = 'listaTareas';

  private listaTareas : Tarea[] = []

  getTareas(): Tarea[] {

      return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    return [];
  }

  addTarea(tarea: Tarea): void {

      const tareas = this.getTareas();
      tareas.push(tarea);
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    
  }

  deleteTarea(index: number): void {

      const tareas = this.getTareas();
      if (index >= 0 && index < tareas.length) {
        tareas.splice(index, 1);
        localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
      }
    
  }

  updateTarea(index: number, tareaActualizada: Tarea): void {
    const tareas = this.getTareas();
    if (index >= 0 && index < tareas.length) {
      tareas[index] = tareaActualizada;
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    }
  }
}
