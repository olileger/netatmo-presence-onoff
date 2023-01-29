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
    #username;
    #password;
    #homes;
    #accessToken;


    constructor(clientid, clientsecret, username, password, homes)
    {
        this.#clientid = clientid;
        this.#clientsecret = clientsecret;
        this.#username = username;
        this.#password = password;

        if (homes && homes.length)
            this.#homes = Array.from(homes);
    }


    #getAccessToken()
    {
        return new Promise((resolve, reject) =>
        {
            if (this.#accessToken == undefined)
            {
                api.GetApiAccessToken(this.#clientid, this.#clientsecret, this.#username, this.#password)
                .then((token) =>
                {
                    this.#accessToken = token;
                    resolve();
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
                .then((homes) =>
                {
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
        this.#getAccessToken()
        .then(() =>
        {
            return this.#buildHomes();
        })
        .then(() =>
        {
            return new Promise((resolve, reject) =>
            {
                api.SetMonitoringState(this.#accessToken, this.#homes, state)
                .then(resolve, reject);
            });
        });
    }


    TurnMonitoringOn()
    {
        let ret = {};
        
        this.#setMonitoring("on").
        then((success) =>
        {
            ret.status = true;
        },
        (error) =>
        {
            ret.status = false;
            ret.error = error;
        });

        return ret;
    }


    TurnMonitoringOff()
    {
        this.#setMonitoring("off");
    }
}


module.exports =
{
    NetatmoPresenceController
};