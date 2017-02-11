import { ChannelsNavComponent } from './../channels-nav/channels-nav.component';
import { StorageService } from './../services/storage.service';
import { Router } from '@angular/router';
import { ChatmessagesService } from './../services/chatmessages.service';
import { ChatserverService } from './../services/chatserver.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-setup',
  templateUrl: './channel-setup.component.html',
  styleUrls: ['./channel-setup.component.scss']
})
export class ChannelSetupComponent implements OnInit {

  private data;
  private connection;

  constructor(private http: Http, private chatServer: ChatserverService,
   private chatService: ChatmessagesService, private storage: StorageService, private cRouter: Router) { }

  ngOnInit() {
     this.connection = this.chatServer.init();

       this.connection = this.chatServer.getChannels().subscribe( response => {
         this.data = response;
         console.log(response);
       });

       this.chatServer.askChannels();


   /*  this.chatService.getChannels().subscribe(
      (res) => {
        this.data = res;
      });*/
  }

  chooseChannel(chan) {
    this.storage.addChannel(chan);
    localStorage.setItem('active', chan.ch_id);
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
