import { Component, OnInit, inject } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from '../models/tarea.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-detail',
  imports: [CommonModule],
  templateUrl: './tarea-detail.component.html',
  styleUrl: './tarea-detail.component.css'
})
export class TareaDetailComponent implements OnInit{
  tareaActual? : Tarea;
  listatareas: Tarea[] = [];
  listaSub ?:string []= []
  private _tareasService = inject(TareasService)
  private _route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.listatareas = this._tareasService.getTareas();
    this._route.params.subscribe(params => {
      this.tareaActual = this.listatareas.find(tareaActual => tareaActual.nombre == params['tareaNombre'])
    })
    this.listaSub = this.tareaActual?.subtarea
  }
}
