import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  socket = io('http://localhost:3000', {
    // path: '/my-custom-path/',
  });
  title = 'social-network-front';
}
