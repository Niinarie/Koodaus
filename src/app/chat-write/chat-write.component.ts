import { ChatmessagesService } from './../services/chatmessages.service';
import { StorageService } from './../services/storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-write',
  templateUrl: './chat-write.component.html',
  styleUrls: ['./chat-write.component.scss']
})
export class ChatWriteComponent implements OnInit {

  private user: any = {};
  private message: any = {};
  private active: number;

  @Input() channel: number;

  constructor(private chatService: ChatmessagesService) { }

  saveMessage(message: any) {
      message.msg_sender = this.user.name;
      message.msg_channel = this.channel;
      console.log(message);
      this.chatService.saveMessage(message);
      this.message.msg_content = '';

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

   ngOnChanges () {
    if (!!this.channel){
      }}

}
