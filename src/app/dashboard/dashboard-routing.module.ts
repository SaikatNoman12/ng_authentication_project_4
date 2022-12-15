import { AuthGuard } from './../appGurd/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: DashboardComponent
  },
  {
    path: ':employeeId',
    canActivate:[AuthGuard],
    loadChildren: () => import('../employee-details/employee-details.module')
      .then(m => m.EmployeeDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
