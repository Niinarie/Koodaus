import { ChannelsNavComponent } from './../channels-nav/channels-nav.component';
import { StorageService } from './../services/storage.service';
import { Router } from '@angular/router';
import { ChatmessagesService } from './../services/chatmessages.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-setup',
  templateUrl: './channel-setup.component.html',
  styleUrls: ['./channel-setup.component.scss']
})
export class ChannelSetupComponent implements OnInit {

  private data;

  constructor(private http: Http, private chatService: ChatmessagesService, private storage: StorageService, private cRouter: Router) { }

  ngOnInit() {
     this.chatService.getChannels().subscribe(
      (res) => {
        this.data = res;
      });
  }

  chooseChannel(chan) {
    this.storage.addChannel(chan);
    if (localStorage.getItem('active') === null){
      localStorage.setItem('active', chan.ch_id);
    }
    this.cRouter.navigate(['chat']);
  }

  /*  ngOnChanges () {
    if (!!this.channel){

      this.chatService.getMessages(this.channel).subscribe(
      (res) => {
        this.data = res;
      });
      }} */

}
