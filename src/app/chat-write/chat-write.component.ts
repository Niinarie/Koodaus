import { ChatmessagesService } from './../services/chatmessages.service';
import { StorageService } from './../services/storage.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-write',
  templateUrl: './chat-write.component.html',
  styleUrls: ['./chat-write.component.scss']
})
export class ChatWriteComponent implements OnInit {

  private user: any = {};
  private text: string = '';

  @Input() channel;

  @Output()
  message: EventEmitter<string> = new EventEmitter<string>();

  constructor(private chatService: ChatmessagesService) { }

  /*saveMessage(message: any) {
      message.msg_sender = this.user.name;
      message.msg_channel = this.channel;
      console.log(message);
      this.chatService.saveMessage(message);
      this.message.msg_content = '';

  } */

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  sendText(text) {
    this.message.emit(text);
    this.text= '';
  }

 /*  ngOnChanges () {
    if (!!this.channel){
      }} */

}
