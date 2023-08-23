/**
 * Netatmo API module.
 * Provides API access to Netatmo.
 * https://dev.netatmo.com/apidocumentation
 */
const axios = require("axios");


const oauth2_token_url = "https://api.netatmo.com/oauth2/token";
const homes_data_url = "https://api.netatmo.com/api/homesdata";
const set_state_url = "https://api.netatmo.com/api/setstate";


function GetApiAccessToken(cid, cst, rt)
{
    const payload =
    {
        grant_type: "refresh_token",
        client_id: cid,
        client_secret: cst,
        refresh_token: rt
    };
    const config =
    {
        headers: { "content-type": "application/x-www-form-urlencoded" }
    }

    return axios.post(oauth2_token_url, payload, config)
    .catch((err) =>
    {
        err.NetatmoApiDescription = "Failed to get API access token";
        throw err;
    });
}


function GetHomesData(accessToken)
{
    const config =
    {
        headers: { "authorization" : "Bearer " + accessToken }
    };

    return axios(homes_data_url, config)
    .catch((err) =>
    {
        err.NetatmoApiDescription = "Failed to get homes data";
        throw err;
    });
}


function SetMonitoringState(accessToken, home)
{
    const config =
    {
        headers:
        {
            "content-type": "application/json",
            "authorization" : "Bearer " + accessToken
        }
    };

    return axios.post(set_state_url, home, config)
    .catch((err) =>
    {
        err.NetatmoApiDescription = "Failed to set monitoring state";
        throw err;
    });
}


module.exports =
{
    GetApiAccessToken,
    GetHomesData,
    SetMonitoringState
}