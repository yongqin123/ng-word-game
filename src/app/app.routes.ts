import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { NameComponent } from './name/name.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InstructionsComponent } from './instructions/instructions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Home page',
  },
  {
    path: 'game',
    component: GameComponent,
    title: 'Home details',
  },
  {
    path: 'name',
    component: NameComponent,
    title: 'Enter Your Name',
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    title: 'Leaderboard',
  },
  {
    path: 'instructions',
    component: InstructionsComponent,
    title: 'Instructions',
  }
  
  ,];
