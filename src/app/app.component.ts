import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/// <reference path="../../typings/globals/socket.io-client/index.d.ts" /> 

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
     localStorage.removeItem('user');
        this.cRouter.navigate(['setup']);

  }
}
