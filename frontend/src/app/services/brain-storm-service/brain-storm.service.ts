import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrainStorm } from 'src/app/model/BrainStorm';
import { Idea } from 'src/app/model/Idea';
import { UserData } from 'src/app/model/UserData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrainStormService {
  private _selectedBrainStorm!: BrainStorm;

  public get selectedBrainStorm(): BrainStorm {
    return this._selectedBrainStorm;
  }
  
  public set selectedBrainStorm(value: BrainStorm) {
    this._selectedBrainStorm = value;
  }

  constructor(private http: HttpClient) {}

  getAllBrainStorms(
    userId: number
  ): Observable<HttpResponse<Array<BrainStorm>>> {
    return this.http.get<Array<BrainStorm>>(
      environment.baseApiUrlBrainStorm + 'all/' + userId,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getIdeasFromBrainStorm(
    brainStormId: number
  ): Observable<HttpResponse<Array<Idea>>> {
    return this.http.get<Array<Idea>>(
      environment.baseApiUrlBrainStorm + 'idea/all/' + brainStormId,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  createBrainStorm(brainStorm: any): Observable<HttpResponse<BrainStorm>> {
    return this.http.post<BrainStorm>(
      environment.baseApiUrlBrainStorm + 'add',
      brainStorm,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  createIdea(idea: any, brainStormId: number): Observable<HttpResponse<Idea>> {
    return this.http.post<Idea>(
      environment.baseApiUrlBrainStorm + 'idea/add/' + brainStormId,
      idea,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
