import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // viewChild nos trae una referencia de cualquier elemento del dom
  // ya sea por clase, id, tag o referencia como lo hacemos en el ejemplo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  busqueda() {
    const query = this.txtBuscar.nativeElement.value;
    if (query.trim().length === 0) return;

    this.gifsService.buscarGifs(query);
    this.txtBuscar.nativeElement.value = '';
  }
}
