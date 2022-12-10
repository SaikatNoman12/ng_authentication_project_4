import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  constructor() { }

  // use popup
  addEmployee:any = new BehaviorSubject(false);

}
