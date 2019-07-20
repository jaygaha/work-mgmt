import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user = []
  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user.getMe()
    .subscribe(
      res => this.user = res,
      err => console.log(err)
    );
  }
}
