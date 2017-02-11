import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let user = JSON.parse(localStorage.getItem('user'));
      let username = user['name'];
      console.log(username);

      var n = value.search(username);
      if (n >= 0) {
        return value;
      } 
      return value;
      
    }
  }

}
