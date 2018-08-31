class Match {
    constructor(homeTeam, awayTeam, matchTime, matchUrl, awayTeamImg) {
        this._homeTeam = homeTeam;
        this._awayTeam = awayTeam;
        this._matchTime = matchTime;
        this._matchUrl = matchUrl;
        this._opponentImg = awayTeamImg;
    }


    get homeTeam() {
        return this._homeTeam;
    }

    set homeTeam(value) {
        this._homeTeam = value;
    }

    get awayTeam() {
        return this._awayTeam;
    }

    set awayTeam(value) {
        this._awayTeam = value;
    }

    get matchTime() {
        return this._matchTime;
    }

    set matchTime(value) {
        this._matchTime = value;
    }

    get matchUrl() {
        return this._matchUrl;
    }

    set matchUrl(value) {
        this._matchUrl = value;
    }

    get opponentImg() {
        return this._opponentImg;
    }

    set opponentImg(value) {
        this._opponentImg = value;
    }
}