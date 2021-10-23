const request = require('request');
const config = require("../config.json");

class Toornament {
    constructor(baseURL = "https://api.toornament.com/organizer/v2/") {
        this.keys = {
            "normal": process.env.TOORNAMENT_TOKEN_RESULT || null,
            "participant": process.env.TOORNAMENT_TOKEN_PARTICIPANT || null
        }
        this.ak = config.TOORNAMENT_KEY;
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