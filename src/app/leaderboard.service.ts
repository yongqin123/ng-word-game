import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Leaderboard } from "./leaderboard";

@Injectable({
    providedIn: 'root'
})
export class LeaderboardService {
    private apiServeUrl = '';

    constructor(private http: HttpClient) {
        this.apiServeUrl = 'http://localhost:8080';
    }

    public getAllLeaderboard(): Observable<Leaderboard[]> {
        return this.http.get<Leaderboard[]>(`http://localhost:8080/leaderboard/all`);
    }

    public addLeaderboard(data: any): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/leaderboard/add`,data);
    }
}