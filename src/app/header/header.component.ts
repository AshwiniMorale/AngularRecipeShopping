import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticate = false;
  private userSub : Subscription;
  constructor(private datastorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(user => {
        this.isAuthenticate = !user ? false : true;
        console.log(!user);
        console.log(!user);

    });
  }
  onSaveData(){
    this.datastorageService.storeRecipe();
  }

  onFetchData() {
    this.datastorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
