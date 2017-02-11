import { StorageService } from './../services/storage.service';
import { Http } from '@angular/http';
import { ChatmessagesService } from './../services/chatmessages.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-channels-nav',
  templateUrl: './channels-nav.component.html',
  styleUrls: ['./channels-nav.component.scss']
})
export class ChannelsNavComponent implements OnInit {

  @Output() changeChannel = new EventEmitter();

  @Input() channels = [];
  @Input() messageNotifiers: Array<number> = [];
  @Input() activeChannel: Array<boolean>;


  private active;

  constructor(private chatService: ChatmessagesService, private storage: StorageService, private http: Http) {   }


   changeActiveChannel(id: string) {
     this.active = id;
     this.changeChannel.emit(this.active);
   }

  ngOnInit() {
  //  this.active = localStorage.getItem('active');
  }

   ngOnChanges () {
      if (!!this.channels){

      }}

}
