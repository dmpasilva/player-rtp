import { Injectable } from '@angular/core';
import { TvProgram } from '../../models/tv-program';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flatMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListDownloaderService {
  private static VOD_URL = 'https://www.rtp.pt/play/programas';
  private static LIVE_URL = '';

  constructor(private http: HttpClient) { }

  /*getPrograms(): Observable<TvProgram[]> {
    return of([
      {
        title: 'O meu programa',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'lindo'
      },
      {
        title: 'O meu programa 2',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'bonito'
      },
      {
        title: 'O meu 12313213',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'fofo'
      },
      {
        title: 'O2222',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'fofinho'
      },
      {
        title: 'O meu programa11111',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'querido'
      },
      {
        title: 'Mais uma linha',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'meigo'
      },
      {
        title: 'E outra',
        channel: 'rtp1',
        thumbnail: 'https://cdn-images.rtp.pt/EPG/radio/imagens/7002_10090_2787.jpg?q=90&v=3&w=275&auto=enhance&vib=52',
        description: 'uma descrição',
        href: 'amor'
      }
    ]);
  }

   */

  getPrograms(): Observable<TvProgram[]> {
    return this.http.get(`${environment.serverUrl}/programas`)
      .pipe(
        map((downloaded: any) => downloaded.map (d => new TvProgram(d))
      ));
  }

  getVodCategories(): Observable<any> {
    return this.http.get(`${environment.serverUrl}/programas/categorias`);
  }
}
