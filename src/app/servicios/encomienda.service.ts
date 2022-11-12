
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { EncomiendaModel } from '../modelos/encomienda.model'; 
  import { SeguridadService } from './seguridad.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class EncomiendaService {
  
    url = "http://localhost:3000"
    token: string = ''
  
    constructor(private http: HttpClient,
      private seguridadService: SeguridadService) { 
        this.token = this.seguridadService.getToken();
      }
      //Crear un encomienda
      store(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
        return this.http.post<EncomiendaModel>(`${this.url}/encomiendas`, {
          descripcion: encomienda.descripcion,
          peso: encomienda.peso,
          tipo: encomienda.tipo,
          presentacion: encomienda.presentacion
        });
      }
      //Obtiene todos los encomiendas
      getAll(): Observable<EncomiendaModel[]>{
        return this.http.get<EncomiendaModel[]>(`${this.url}/encomiendas`, {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
      }
      //Actualiza un encomienda
      update(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
        return this.http.patch<EncomiendaModel>(`${this.url}/encomiendas/${encomienda.id}`, {
          descripcion: encomienda.descripcion,
          peso: encomienda.peso,
          tipo: encomienda.tipo,
          presentacion: encomienda.presentacion
        }, {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        });
      }
      //Elimina un encomienda
      delete(id: string): Observable<EncomiendaModel[]>{
        return this.http.delete<EncomiendaModel[]>(`${this.url}/encomiendas/${id}`, {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
      }
      //Obtiene la informacion de un encomienda
      getWithId(id: string): Observable<EncomiendaModel>{
        return this.http.get<EncomiendaModel>(`${this.url}/encomiendas/${id}`,{
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
      }
  
      //Obtiene la cantidad de encomiendas
      getCount(): Observable<EncomiendaModel[]>{
        return this.http.get<EncomiendaModel[]>(`${this.url}/encomiendas/count`, {
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
      }
  }