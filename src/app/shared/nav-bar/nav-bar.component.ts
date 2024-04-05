import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSlideToggleModule, MatSidenavModule,ReactiveFormsModule, CommonModule
  ]
})
export class NavBarComponent implements OnInit {

  loggedInUser: User | undefined;
  currentUserRole: string = "User";


  switchTheme  = new FormControl(false);
  
  @HostBinding('class') className = ''
  darkTheme = 'dark-theme';
  lightTheme = 'light-theme'

  isHandset$ = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map((result) => result.matches));

  constructor(private overlay: OverlayContainer,
    private router : Router,
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.switchTheme.valueChanges.subscribe((currentMode) => {

      this.className = currentMode ? this.darkTheme : this.lightTheme;
      
      if(currentMode){
        this.overlay.getContainerElement().classList.add(this.darkTheme);
        localStorage.setItem("theme", "dark");
      }else{
        this.overlay.getContainerElement().classList.remove(this.darkTheme);
        localStorage.setItem("theme", "light");
      }
    })

    this.tryGetPreviousThemePreference();

    this.getCurrentUser();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {
        if(user){
          this.loggedInUser = user;
        }
      },
      error: error =>{
       // console.log(error);
      }
    })
  }

  tryGetPreviousThemePreference(){
    const current  = localStorage.getItem("theme");

    this.className = current === "dark" ? this.darkTheme : this.lightTheme;

     if(current ==="dark"){
      this.switchTheme.setValue(true);
      this.overlay.getContainerElement().classList.add(this.darkTheme);
    }else{
      this.switchTheme.setValue(false);
      this.overlay.getContainerElement().classList.remove(this.darkTheme);
    }
  }

  logout(){
    this.accountService.logout();
    this.loggedInUser = undefined;
    this.router.navigate(['/login']);
  }
}
