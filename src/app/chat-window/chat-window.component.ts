import { ChatmessagesService } from './../services/chatmessages.service';
import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
    private data;

     @Input() channel: number;


    constructor(private http: Http, private chatService: ChatmessagesService){    }

    ngOnInit() {

      this.chatService.getMessages(this.channel).subscribe(
      (res) => {
        this.data = res;
      });
    }

    ngOnChanges () {
    if (!!this.channel){

      this.chatService.getMessages(this.channel).subscribe(
      (res) => {
        this.data = res;
      });
      }}

}
