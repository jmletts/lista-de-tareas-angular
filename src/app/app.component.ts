import { Component, inject, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TareasService } from './services/tareas.service';
import { Tarea } from './models/tarea.interface';
import { InicioComponent } from "./inicio/inicio.component";
import { UpdaterService } from './services/updater.service';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InicioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Estado inicial: no visible
      transition(':enter', [               // Al entrar
        animate('500ms ease-in', style({ opacity: 1 })) // Duración y estilo de entrada
      ]),
      transition(':leave', [               // Al salir
        animate('500ms ease-out', style({ opacity: 0 })) // Duración y estilo de salida
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy{
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
  showHero: boolean = true;

  private _tareasService = inject(TareasService);
  private _updaterService = inject(UpdaterService);
  private router = inject(Router);

  ngOnInit(): void {
    this._updaterService.update$.subscribe(()=>{
      this.listatareas = this._tareasService.getTareas();
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la raíz
        this.showHero = event.urlAfterRedirects === '/';
      }
    });
  }

  ngOnDestroy(): void {
  }

  setVisible(value: boolean): void {
    this.visible = value;
  }


  addTarea(): void {
    if (this.nuevaTarea.nombre.trim() && this.nuevaTarea.descripcion.trim()) {
      this._tareasService.addTarea(this.nuevaTarea);
      this.resetNuevaTarea();
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
