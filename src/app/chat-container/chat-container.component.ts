import { StorageService } from './../services/storage.service';
import { Http } from '@angular/http';
import { ChatmessagesService } from './../services/chatmessages.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {

  private channelsInfo: any;
  private user: any;
  private active;
  //console.log(this.active);

  constructor(private cRouter: Router, private chatService: ChatmessagesService, private storage: StorageService, private http: Http) { }

  logOut = () => {
    localStorage.removeItem('user');
    this.storage.removeChannels();
    this.cRouter.navigate(['setup']);
  }

  ngOnInit() {
    this.active = localStorage.getItem('active');

    let channels = this.storage.getChannels();


    if (localStorage.getItem('user') === null) {
      this.cRouter.navigate(['setup']);
     };

  }
  handleUserUpdated(id: string) {
    this.active = id;
    localStorage.setItem('active', id)
  }

}
