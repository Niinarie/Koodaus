
import { ChatserverService } from './../services/chatserver.service';
import { ChatmessagesService } from './../services/chatmessages.service';
import { Http } from '@angular/http';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']

})
export class ChatWindowComponent implements OnInit {
 



     @Input() messages: Array<Object> = [];

constructor(private http: Http, private chatMessagesService: ChatmessagesService, private chatService: ChatserverService){    }

   ngOnChanges () {
      if (!!this.messages){

      }}

   ngOnInit() {

   

  }

}




