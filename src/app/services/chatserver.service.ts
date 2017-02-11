import { StorageService } from './storage.service';
import { ChatmessagesService } from './chatmessages.service';

import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatserverService {

  private url = 'http://212.24.98.139:5000';
  private socket;
  private sessionId;
  private $rootScope;
  private user;

  constructor(private storage: StorageService, private chatMessages: ChatmessagesService) { }

   init() {

    let host = window.location.origin;
    console.log('connecting to', host);

     this.socket = io(this.url);

      this.socket.on('connect', () => {
          this.sessionId = this.socket.io.engine.id;
          this.user = this.storage.getUser();
         // let activeChannel = this.storage.getActive();
          this.socket.emit('new_user', { name: this.user.name });
          this.socket.on('new_connection', (data) => {

          });
      });
  }

  // get existing channels
  askChannels() {
    this.socket.emit('get-channels');
    console.log("hei");
  }

  getChannels() {
    let observable = new Observable (observer => {
        this.socket.on('new-channels', (data) => {
          console.log(data);
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }

  //get messages from channel

   askOldMessages(data) {
    this.socket.emit('get-old-messages', data);
  }

  getOldMessages() {
    let observable = new Observable (observer => {
        this.socket.on('old-messages', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }

  joinChannel(channel: number) {
    this.socket.emit('join_channel', channel, this.sessionId);
  }

  joinSavedChannels(savedChannels) {
    console.log(savedChannels);
    for (let i = 0; i < savedChannels.length; i++) {      
        this.joinChannel(savedChannels[i].ch_id);
        console.log(savedChannels[i].ch_id);
    }
  }

   on(key, callback) {
    this.socket.on(key, (data) => {
      this.$rootScope.$apply(() => {
        callback(data)
      });
    });
  }

  sendMessage(message, channel, user, date) {
      let newMessage: Object = {};
      newMessage['msg_channel'] = channel;
      newMessage['msg_content'] = message;
      newMessage['msg_sender'] = user;

      this.socket.emit('add-message', newMessage, date);
  }

  getMessages() {
      let observable = new Observable (observer => {
        this.socket.on('message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
  }
}