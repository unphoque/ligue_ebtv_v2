const request = require('request');

class Toornament {
    constructor(tokenRequest, tokenParticipant, apiKey, baseURL = "https://api.toornament.com/organizer/v2/") {
        if (!apiKey) throw new Error("Merci d'inclure une clé d'API.");
        this.keys = {
            "normal": tokenRequest || null,
            "participant": tokenParticipant || null
        }
        this.ak = apiKey;
        this.u = baseURL;
    }

    assignkey(params,key) {
        return Object.assign({headers: {Authorization: `Bearer ${key}`, "X-Api-Key": this.ak, "Content-Type": "application/json"}}, params)
    }

    patch(path, params, key, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = this.assignkey(params, this.keys[key]);

        request.patch(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

    get(path, params, key, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = this.assignkey(params, this.keys[key]);

        request.get(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

    post(path, params, key, callback) {
        if (typeof params == "function") {
            callback = params;
            params = {};
        }

        params = this.assignkey(params, this.keys[key]);

        request.post(this.u+path, params, (e, r, b) => {
            if (e) return callback(e, null);
            callback(null,b);
        })
    }

}

module.exports = Toornament;