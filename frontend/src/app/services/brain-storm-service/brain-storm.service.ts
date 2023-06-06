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
  private _selectedIdea!: Idea;

  public get selectedBrainStorm(): BrainStorm {
    return this._selectedBrainStorm;
  }

  public set selectedBrainStorm(value: BrainStorm) {
    this._selectedBrainStorm = value;
  }

  public get selectedIdea(): Idea {
    return this._selectedIdea;
  }

  public set selectedIdea(value: Idea){
    this._selectedIdea = value;
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

  editBrainStorm(brainStorm: BrainStorm): Observable<HttpResponse<BrainStorm>> {
    return this.http.put<BrainStorm>(
      environment.baseApiUrlBrainStorm + 'update',
      brainStorm,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  deleteBrainStorm(brainStormId: number): Observable<any> {
    return this.http.delete(
      environment.baseApiUrlBrainStorm + 'delete/' + brainStormId
    );
  }

  createIdea(idea: any, brainStormId: number): Observable<HttpResponse<Idea>> {
    return this.http.post<Idea>(
      environment.baseApiUrlBrainStorm + 'idea/add-idea/' + brainStormId,
      idea,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getSelectedBrainStormFromLocalStorage(): BrainStorm | null {
    const storedBrainStorm = localStorage.getItem('selectedBrainStorm');
    let parsedBrainStorm: BrainStorm | null = null;
    if (storedBrainStorm) {
      parsedBrainStorm = JSON.parse(storedBrainStorm) as BrainStorm;
    }
    return parsedBrainStorm;
  }

  editIdea(idea: Idea): Observable<HttpResponse<Idea>> {
    return this.http.put<Idea>(
      environment.baseApiUrlBrainStorm + 'idea/update',
      idea,
      {
        observe: 'response',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
