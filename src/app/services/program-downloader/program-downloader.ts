import { Injectable } from '@angular/core';
import { TvProgram } from '../../models/tv-program';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Episode } from '../../models/episode';

@Injectable({
  providedIn: 'root'
})
export class ProgramDownloaderService {
  constructor(private http: HttpClient) {
  }

  getProgramEpisodes(itemId: string): Observable<any> {
    return this.http.get(`${environment.serverUrl}/programa/${itemId}`);
  }

  getEpisodeDetails(episodeHref: string): Observable<any> {
    return this.http.get(`${environment.serverUrl}/programa/${episodeHref}`);
  }
}
