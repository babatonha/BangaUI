import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path: 'login', loadComponent: () => import('./Pages/auth/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'forgot-password', loadComponent: () => import('./Pages/auth/forgot-password/forgot-password.component').then(mod => mod.ForgotPasswordComponent)},
    {path: 'change-password', loadComponent: () => import('./Pages/auth/change-password/change-password.component').then(mod => mod.ChangePasswordComponent)},
    {path: 'register', loadComponent: () => import('./Pages/auth/register/register.component').then(mod => mod.RegisterComponent)},
    {path: 'users', loadComponent: () => import('./Pages/user/user.component').then(mod => mod.UserComponent)},
    {path: 'property-list', loadComponent: () => import('./Pages/property/property-list/property-list.component').then(mod => mod.PropertyListComponent), canActivate:[authGuard] },
    {path: 'property-detail/:id', loadComponent: () => import('./Pages/property/property-detail/property-detail.component').then(mod => mod.PropertyDetailComponent), canActivate:[authGuard]},
    {path: 'property-new', loadComponent: () => import('./Pages/property/property-new/property-new.component').then(mod => mod.PropertyNewComponent), canActivate:[authGuard]},
    {path: 'property-new/:id', loadComponent: () => import('./Pages/property/property-new/property-new.component').then(mod => mod.PropertyNewComponent), canActivate:[authGuard]},
    {path: 'my-properties', loadComponent: () => import('./Pages/property/my-properties/my-properties.component').then(mod => mod.MyPropertiesComponent)},
    {path: 'law-firm-manage', loadComponent: () => import('./Pages/admin/law-firm-manager/law-firm-manager.component').then(mod => mod.LawFirmManagerComponent)},
    {path: 'law-firm-new', loadComponent: () => import('./Pages/law-firms/lawfirm-new/lawfirm-new.component').then(mod => mod.LawfirmNewComponent), canActivate:[authGuard]},
    {path: 'law-firm-listing', loadComponent: () => import('./Pages/law-firms/law-firm-listing/law-firm-listing.component').then(mod => mod.LawFirmListingComponent)},
    {path: 'law-firm-detail/:id', loadComponent: () => import('./Pages/law-firms/law-firm-details/law-firm-details.component').then(mod => mod.LawFirmDetailsComponent)},
    {path: 'buyer-listing', loadComponent: () => import('./Pages/buyer-listing/buyer-listing/buyer-listing.component').then(mod => mod.BuyerListingComponent)},
    {path: 'buyer-listing-new', loadComponent: () => import('./Pages/buyer-listing/buyer-listing-new/buyer-listing-new.component').then(mod => mod.BuyerListingNewComponent)},
    {path: 'user-profile', loadComponent: () => import('./Pages/profile/user-profile/user-profile.component').then(mod => mod.UserProfileComponent), canActivate:[authGuard]},
    {path: 'messages/:id', loadComponent: () => import('./Pages/profile/message-thread/message-thread.component').then(mod => mod.MessageThreadComponent)},
    {path: 'admin', loadComponent: () => import('./Pages/admin/admin-settings/admin-settings.component').then(mod => mod.AdminSettingsComponent),  canActivate:[authGuard]},
];
