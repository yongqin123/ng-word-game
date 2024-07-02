import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NameComponent } from '../name/name.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NameComponent, LeaderboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
