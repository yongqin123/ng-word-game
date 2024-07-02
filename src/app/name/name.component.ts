import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component'; 

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [],
  templateUrl: './name.component.html',
  styleUrl: './name.component.scss'
})
export class NameComponent {
  submitName() {
    localStorage.setItem("name", (document.getElementById("name") as HTMLInputElement).value);
    window.location.href = "/game";
  }
  
}
