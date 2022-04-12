import { HttpClient, 
         HttpHeaders } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { catchError,
         map,
         Observable,
         of,
         tap         } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse,
         Usuario     } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbUrlApi: string = environment.dbUrl
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario }
  }

  constructor(private http: HttpClient) { }

  registro(nameUser:string, email:string, password:string){

    const urlApp = `${this.dbUrlApi}/auth/new`
    const body = { nameUser,email, password }
    return this.http.post<AuthResponse>(urlApp, body )
      .pipe(
        tap(({ok,token}) => {
          if (ok) {
            // Se crea el localStorage para almacenar el token
            localStorage.setItem('token', token!)
          }
      }),
      map(res => res.ok),
      catchError(err => of(err.error.msg))
    )
  }

  login(email: string, password: string) {

    const urlApp = `${this.dbUrlApi}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(urlApp, body)
      .pipe(
        tap(response => {
          if (response.ok) {
            // Se crea el localStorage para almacenar el token
            localStorage.setItem('token', response.token!)
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.msg))
      )
  }
  validarToken():Observable<boolean> {
    const urlApp = `${this.dbUrlApi}/auth/newToken`
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
      // Se hace una peticion http, pasandole la url y los headers
    return this.http.get<AuthResponse>(urlApp, {headers})
      .pipe (
        map(resp=>{
         localStorage.setItem('token', resp.token!)
         this._usuario = {
           nameUser: resp.nameUser!,
           uid: resp.uid!,
           email: resp.email!
         }
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }
  logOut(){
    // Si se desea borrar solo el token 
    // localStorage.removeItem('token')
    // Borra todo 
    localStorage.clear();
  }
}
