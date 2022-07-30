import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  public logout() {
    this._authService.logout();
  }
}