import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Recipe_Book';

  constructor() {}

  pageContent: string = 'display recipes';

  contentToDisplay(content) {
    this.pageContent = content;
  }
}
