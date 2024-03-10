import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'property-list', loadComponent: () => import('./Pages/property/property-list/property-list.component').then(mod => mod.PropertyListComponent), canActivate:[authGuard] },
    {path: 'property-detail/:id', loadComponent: () => import('./Pages/property/property-detail/property-detail.component').then(mod => mod.PropertyDetailComponent)},
    {path: 'property-new', loadComponent: () => import('./Pages/property/property-new/property-new.component').then(mod => mod.PropertyNewComponent)},
    {path: 'my-properties', loadComponent: () => import('./Pages/property/my-properties/my-properties.component').then(mod => mod.MyPropertiesComponent)},
    {path: 'users', loadComponent: () => import('./Pages/user/user.component').then(mod => mod.UserComponent)},
    {path: 'login', loadComponent: () => import('./Pages/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'register', loadComponent: () => import('./Pages/register/register.component').then(mod => mod.RegisterComponent)}
   
];
