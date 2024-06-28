import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  template: '<h1>Hello world</h1>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-word-game';
}
