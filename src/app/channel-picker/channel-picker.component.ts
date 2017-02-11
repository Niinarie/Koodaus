import { StorageService } from './../services/storage.service';
import { ChatserverService } from './../services/chatserver.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-channel-picker',
  templateUrl: './channel-picker.component.html',
  styleUrls: ['./channel-picker.component.scss']
})
export class ChannelPickerComponent implements OnInit {

  private isVisible: boolean = false;
  private data;
  private connection;

  @Output()
  newChannel: EventEmitter<number> = new EventEmitter<number>();

  constructor(private chatServer: ChatserverService) { }

  ngOnInit() {
      this.connection = this.chatServer.getChannels().subscribe( response => {
         this.data = response;
         console.log(response);
       });

       this.chatServer.askChannels(); 
  }

  updateData() {
    this.chatServer.askChannels(); 
  }

  showSelector(value: boolean) {
    this.isVisible = value;
  }

   chooseChannel(channel) {
    this.newChannel.emit(channel);
    this.isVisible = false;

  }

}
