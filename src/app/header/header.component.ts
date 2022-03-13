import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() displayContent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(link) {
    if (link == 'recipe') {
      this.displayContent.emit('display recipes');
    }
    if (link == 'shopping-list') {
      this.displayContent.emit('display shopping list');
    }
  }

}
