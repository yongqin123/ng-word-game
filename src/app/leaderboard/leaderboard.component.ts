import { Component, InjectionToken, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../leaderboard.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Leaderboard } from '../leaderboard';
import { error } from 'console';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  //leaderboardService = inject(LeaderboardComponent);
  //console.log(this.leaderboardService.getAllLeaderboard());
  leaderboards: Leaderboard[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.getLeaderboard();
  }

  public getLeaderboard() {
    this.leaderboardService.getAllLeaderboard().subscribe(( data : Leaderboard[] ) => {
      this.leaderboards = data;
      console.log(data);
    })
      
    ;
  }
}
