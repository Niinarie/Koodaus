import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ChatmessagesService {

  objToQueryString(obj){
        var k = Object.keys(obj);
        var s = "";
        for(var i=0;i<k.length;i++) {
            s += k[i] + "=" + encodeURIComponent(obj[k[i]]);
            if (i != k.length -1) s += "&";
        }
        return s;
     }

  constructor(private http: Http) { }

  getChannels = () => {
    return this.http.get('http://212.24.98.139/chat/api/channels.php').map(res => res.json());
    }


  getMessages = (channelId: number) => {
        return this.http.get('http://212.24.98.139/chat/api/messages.php?channelId=' + channelId + '').map(res => res.json());
    }

  saveMessage = (message: any) => {
      let headers = new Headers();
      message = this.objToQueryString(message);
      console.log(message);
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

this.http.post('http://212.24.98.139/chat/api/savemessage.php', message, {
    headers: headers
}).subscribe(res => {
    console.log('post result ', res);
});
  }

}
