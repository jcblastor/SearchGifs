import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, GifsResponse } from '../interfaces/gifs-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'dwkGuO65WNStf2xPTtoTyDPUOzaAbewu';
  private urlBase: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    // no olvidarse de romper la referencia
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // vemos si existe datos en localstorage
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string): void {
    query = query.toLocaleLowerCase();

    if ( !this._historial.includes(query) ) {
      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 10);
      // grabamos en localstorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    };

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<GifsResponse>(`${this.urlBase}/search`, { params }).subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  }
}
