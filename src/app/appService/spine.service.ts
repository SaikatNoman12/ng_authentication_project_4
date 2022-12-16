import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpineService {

  spine:any = new BehaviorSubject(false);

  constructor() { }
}
