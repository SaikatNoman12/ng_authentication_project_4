import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './appGurd/auth.guard';

const routes: Routes = [
  /*  
  {
     path: '',
     pathMatch: 'full',
     redirectTo: 'login'
   },
   {
     path: 'login',
     loadChildren: () => import('./login/login.module')
       .then(m => m.LoginModule),
   }, */
  {
    path: '',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module')
      .then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
