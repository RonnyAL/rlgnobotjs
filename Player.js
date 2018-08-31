class Player {
    constructor(userName, steamId) {
        this._userName = userName;
        this._steamId = steamId;
    }


    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get steamId() {
        return this._steamId;
    }

    set steamId(value) {
        this._steamId = value;
    }

}