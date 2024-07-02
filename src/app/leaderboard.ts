export class Leaderboard {
    id: number;
    name: String;
    score: string;

    public constructor(id: number, name: String, score: string) {
        this.name = name;
        this.score = score;
        this.id = id;
    }

    public setScore(score: string) {
        this.score = score;
    }

    public setName(name: string) {
        this.name = name;
    }
}
