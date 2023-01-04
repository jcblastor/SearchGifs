import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  get searchList(): string[] {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  buscar(term: string) {
    this.gifsService.buscarGifs(term);
    console.log(term)
  }
}
