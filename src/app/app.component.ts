import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  private user: any;

  constructor(private cRouter: Router) { }

  ngOnInit() {

  }
}
