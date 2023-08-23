/**
 * NetatmoPresence module.
 * This module provides libraries to ease the management
 * of Netatmo Presence camera.
 * https://www.netatmo.com/en-us/security/cam-outdoor
 * https://www.netatmo.com/en-us/security/cam-outdoor-siren
 */
const api = require("./netatmoapi.cjs");


class NetatmoPresenceController
{
    #clientid;
    #clientsecret;
    #refreshToken;
    #homes;
    #accessToken;


    constructor(clientid, clientsecret, refreshToken, homes)
    {
        if ((clientid == "" || clientid == undefined || clientid == null) ||
            (clientsecret == "" || clientsecret == undefined || clientsecret == null) ||
            (refreshToken == "" || refreshToken == undefined || refreshToken == null))
        {
            throw new Error("Required parameter is missing");
        }

        this.#clientid = clientid;
        this.#clientsecret = clientsecret;
        this.#refreshToken = refreshToken;

        if (homes && homes.length)
            this.#homes = Array.from(homes);
    }


    #getAccessToken()
    {
        return new Promise((resolve, reject) =>
        {
            if (this.#accessToken == undefined)
            {
                api.GetApiAccessToken(this.#clientid, this.#clientsecret, this.#refreshToken)
                .then((res) =>
                {
                    this.#accessToken = res.data.access_token;
                    resolve();
                })
                .catch((err) =>
                {
                    reject(err);
                });
            }
            else
            {
                resolve();
            }
        });
    }


    #buildHomes()
    {
        return new Promise((resolve, reject) =>
        {
            if (this.#homes == undefined)
            {
                this.#homes = new Array();
                api.GetHomesData(this.#accessToken)
                .then((res) =>
                {
                    let homes = res.data.body.homes;
                    for (let h of homes)
                    {
                        let home =
                        {
                            id: h.id,
                            modules: new Array()
                        };

                        for (let m of h.modules)
                        {
                            home.modules.push({ id: m.id });
                        }
                        this.#homes.push(home);
                    }
                    resolve();
                })
                .catch((err) =>
                {
                    reject(err);
                });
            }
            else
            {
                resolve();
            }
        });
    }
    
    
    #setMonitoring(state)
    {
        let promises = new Array();
        for (let h of this.#homes)
        {
            let payload =
            {
                home:
                {
                    id: h.id,
                    modules: []
                }
            };
            for (let m of h.modules)
            {
                payload.home.modules.push({
                    id: m.id,
                    monitoring: state
                });
            }
            promises.push(new Promise((resolve, reject) =>
            {
                api.SetMonitoringState(this.#accessToken, payload)
                .then(resolve, reject);
            }));
        }

        return Promise.all(promises);
    }


    TurnMonitoringOn()
    {
        return this.#getAccessToken()
        .then(() =>
        {
            return this.#buildHomes();
        })
        .then(() =>
        {
            return this.#setMonitoring("on");
        });
    }


    TurnMonitoringOff()
    {
        return this.#getAccessToken()
        .then(() =>
        {
            return this.#buildHomes();
        })
        .then(() =>
        {
            return this.#setMonitoring("off");
        });
    }

    GetHomes()
    {
        return JSON.parse(JSON.stringify(this.#homes));
    }
}


module.exports =
{
    NetatmoPresenceController
};