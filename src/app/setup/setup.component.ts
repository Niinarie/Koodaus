import { StorageService } from './../services/storage.service';

import { ChatserverService } from './../services/chatserver.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  private user: any = {};
  private connection;

  constructor(private cRouter: Router, private storage: StorageService , private chatService: ChatserverService) { }

  ngOnInit() {
  }

   setUsername = (formValues: any) => {
    this.storage.saveUser(this.user);
    localStorage.setItem('user', JSON.stringify(formValues));
    this.cRouter.navigate(['channel-setup']);
  }

}
