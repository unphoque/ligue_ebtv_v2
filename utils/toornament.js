const request = require('request');

class Toornament {
    constructor(tr, tp, api, baseURL = "https://api.toornament.com/") {
        if (!key) throw new Error("Merci d'inclure une clé d'API.");
        this.keys = {
            normal: tr || null,
            participant: tp || null
        }
        this.ak = api;
        this.u = baseURL;
    }

    patch(path, params, key, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = Object.assign({ headers: { Authorization: this.keys[key], "X-Api-Key": this.ak } });

        request.patch(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

    get(path, params, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = Object.assign({ headers: { Authorization: this.keys[key], "X-Api-Key": this.ak } });

        request.get(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

    post(path, params, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = Object.assign({ headers: { Authorization: this.keys[key], "X-Api-Key": this.ak } });

        request.post(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

}

module.exports = Toornament;