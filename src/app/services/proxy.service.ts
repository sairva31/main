import { ResponseJsonSuc, ResponseJsonProd } from '../interface/response-api'
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio Consulta APIRest,
 * Permite obtener los datos de los servicios API
*/

@Injectable({ providedIn: 'root' })
export class ApiService {
 
  baseURL: string = environment.endpoint;
 
  constructor(private http: HttpClient) {
  }
 
  //Funcion de consulta API para obtner sucursales
  getBranches(): Observable<ResponseJsonSuc> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbHZhZG9yLmdvbWV6IiwibmFtZWlkIjoic2FsdmFkb3IuZ29tZXpAZXhpbWFnZW4uY29tLm14IiwiY2VydHNlcmlhbG51bWJlciI6IjAxMjEzMjU0NjU5ODciLCJuYmYiOjE1MjQ4OTAzNDIsImV4cCI6MTUzNTQzMTE0MSwiaWF0IjoxNTI0ODkwMzQyLCJpc3MiOiJwcm9tb2xpbmUiLCJhdWQiOiJodHRwOi8vcHJvbW9saW5lLmNvbSJ9.0QcaTwxvc92FbNCYy0N3NNA6LIl0kDYOAJrjadE6qdc'
    });
    return this.http.get<ResponseJsonSuc>(this.baseURL + 'stores', { headers },)
  }

  //Funcion de consulta API para obtner articulos
  getArticles(): Observable<ResponseJsonProd> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbHZhZG9yLmdvbWV6IiwibmFtZWlkIjoic2FsdmFkb3IuZ29tZXpAZXhpbWFnZW4uY29tLm14IiwiY2VydHNlcmlhbG51bWJlciI6IjAxMjEzMjU0NjU5ODciLCJuYmYiOjE1MjQ4OTAzNDIsImV4cCI6MTUzNTQzMTE0MSwiaWF0IjoxNTI0ODkwMzQyLCJpc3MiOiJwcm9tb2xpbmUiLCJhdWQiOiJodHRwOi8vcHJvbW9saW5lLmNvbSJ9.0QcaTwxvc92FbNCYy0N3NNA6LIl0kDYOAJrjadE6qdc'
    });
    return this.http.get<ResponseJsonProd>(this.baseURL + 'articles', { headers },)
  }

  //Funcion de consulta API para obtner articulos con el id de sucursales
  getArtByBranch(id: string): Observable<ResponseJsonProd> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbHZhZG9yLmdvbWV6IiwibmFtZWlkIjoic2FsdmFkb3IuZ29tZXpAZXhpbWFnZW4uY29tLm14IiwiY2VydHNlcmlhbG51bWJlciI6IjAxMjEzMjU0NjU5ODciLCJuYmYiOjE1MjQ4OTAzNDIsImV4cCI6MTUzNTQzMTE0MSwiaWF0IjoxNTI0ODkwMzQyLCJpc3MiOiJwcm9tb2xpbmUiLCJhdWQiOiJodHRwOi8vcHJvbW9saW5lLmNvbSJ9.0QcaTwxvc92FbNCYy0N3NNA6LIl0kDYOAJrjadE6qdc'
    });
    return this.http.get<ResponseJsonProd>(this.baseURL + 'articles/stores/' + id, { headers },)
  }
}