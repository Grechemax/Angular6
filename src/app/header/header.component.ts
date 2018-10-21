import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeSService} from "../recipes/recipe-s.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipeSRV: RecipeSService,
              private authSRV: AuthService) { }
  onSaveData() {
    this.recipeSRV.saveData();
  }

  onFetchData() {
    this.recipeSRV.fetchData();
  }
  onLogout() {
    this.authSRV.logout();
  }
}
