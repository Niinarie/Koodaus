import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  saveUser(data: any)  {
    localStorage.setItem('user', data);
  }

  getUser()  {
    return localStorage.getItem('user');
  }

  emptyUser() {
    localStorage.removeItem('user');
  }

  saveActive(channel: string) {
    localStorage.setItem('active', channel);
  }

  getActive() {
    return localStorage.getItem('active');
  }

  addChannel(channel: Object) {
    let channels: Array<Object>;
    if (localStorage.getItem('channels') === null) {
      channels = [];
    } else {
      channels = JSON.parse(localStorage.getItem('channels'));
    }

      if (!this.channelExists(channel, channels)) {
        channels.push(channel);
        localStorage.setItem('channels', JSON.stringify(channels));
      }
  }

  /*removeChannel(channel: Object) {
    let channels: Array<Object>;
    channels = JSON.parse(localStorage.getItem('channels'));
     if !this.channelExists(channel, channels)) {
        channels.push(channel);
        localStorage.setItem('channels', JSON.stringify(channels));
      }

  } */

  channelExists(obj, list) {
      let i;
        for (i = 0; i < list.length; i++) {
          if (list[i].ch_id === obj.ch_id) {
            return true;
          }
        }
       return false;
    }

    removeByAttr (arr, attr, value) {
    let i = arr.length;
    while (i--) {
       if ( arr[i]
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ) {
           arr.splice(i, 1);
       }
    }
    return arr;
    }

  getChannels = () => {
     let channels;
     channels = JSON.parse(localStorage.getItem('channels'));
     return channels;
  }

  removeChannels () {
    localStorage.removeItem('user');
    localStorage.removeItem('active');
    localStorage.removeItem('channels');
  }
}
