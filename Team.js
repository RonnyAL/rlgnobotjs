class Team {
    constructor(name, players, teamURL) {
        this._name = name;
        this._players = players;
        this._teamURL = teamURL;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }

    get teamURL() {
        return this._teamURL;
    }

    set teamURL(value) {
        this._teamURL = value;
    }
}