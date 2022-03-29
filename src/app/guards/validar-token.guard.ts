import { Injectable  } from '@angular/core';
import { CanActivate, 
         CanLoad     } from '@angular/router';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  canActivate(): Observable<boolean> | boolean  {
    return true;
  }
  canLoad(): Observable<boolean> | boolean  {
    return true;
  }
}
