import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdaterService {

  constructor() { }

  private updateSubject = new BehaviorSubject<void>(undefined);
  update$ = this.updateSubject.asObservable();

  // Método para emitir un evento de actualización
  emitirActualizacion(): void {
    this.updateSubject.next();
  }
}
