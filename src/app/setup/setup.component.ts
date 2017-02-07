import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  private user: any = {};

  constructor(private cRouter: Router) { }

  ngOnInit() {
  }

   setUsername = (formValues: any) => {
    localStorage.setItem('user', JSON.stringify(formValues));
    this.cRouter.navigate(['channel-setup']);
  }

}
