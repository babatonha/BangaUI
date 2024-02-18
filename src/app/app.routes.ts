import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PropertyListComponent } from './Pages/property/property-list/property-list.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'property-list', loadComponent: () => import('./Pages/property/property-list/property-list.component').then(mod => mod.PropertyListComponent), canActivate:[authGuard] },
    {path: 'property-detail/:id', loadComponent: () => import('./Pages/property/property-detail/property-detail.component').then(mod => mod.PropertyDetailComponent)},
    {path: 'users', loadComponent: () => import('./Pages/user/user.component').then(mod => mod.UserComponent)},
    {path: 'login', loadComponent: () => import('./Pages/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'register', loadComponent: () => import('./Pages/register/register.component').then(mod => mod.RegisterComponent)}
   
];
