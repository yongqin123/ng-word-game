import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h2>test</h2>`,
  //templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class HomeComponent {
  
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-word-game';
}