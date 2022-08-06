import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() displayContent = new EventEmitter<string>();

  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !user ? false : true;
    // });
    this.userSub = this.store.select('auth').pipe(map(authState=>{return authState.user})).subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // buttonClicked(link) {
  //   if (link == 'recipe') {
  //     this.displayContent.emit('display recipes');
  //   }
  //   if (link == 'shopping-list') {
  //     this.displayContent.emit('display shopping list');
  //   }
  // }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
