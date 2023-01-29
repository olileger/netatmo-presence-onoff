/**
 * Netatmo API module.
 * Provides API access to Neetatmo through
 * this static class.
 */
const axios = require("axios");


const oauth2_token_url = "https://api.netatmo.com/oauth2/token";
const homes_data_url = "https://api.netatmo.com/api/homesdata";
const set_state_url = "https://api.netatmo.com/api/setstate";


async function GetApiAccessToken(cid, cst, usr, pwd)
{
    try
    {
        let res = await axios.post(
                        oauth2_token_url,
                        {
                            grant_type: "password",
                            client_id: cid,
                            client_secret: cst,
                            username: usr,
                            password: pwd,
                            scope: "read_presence write_presence"
                        },
                        {
                            headers: { "content-type": "application/x-www-form-urlencoded" }
                        }
                    );
        return res.data.access_token;
    }
    catch (err)
    {
        throw(err);
    }
}


async function GetHomesData(accessToken)
{
    try
    {
        let res = await axios(homes_data_url,
                                {
                                    headers:
                                    {
                                        "authorization" : "Bearer " + accessToken
                                    }
                                }
                            );
        return res.data.body.homes;
    }
    catch (err)
    {
        throw(err);
    }
}


async function SetMonitoringState(accessToken, homes, state)
{
    try
    {
        for (h of homes)
        {
            let payload =
            {
                home:
                {
                    id: h.id,
                    modules: []
                }
            };
            for (m of h.modules)
            {
                payload.home.modules.push({
                    id: m.id,
                    monitoring: state
                });
            }
            await axios.post(
                set_state_url,
                payload,
                {
                    headers:
                    {
                        "content-type": "application/json",
                        "authorization" : "Bearer " + accessToken
                    }
                });
        }
    }
    catch (err)
    {
        throw err;
    }
}


module.exports =
{
    GetApiAccessToken,
    GetHomesData,
    SetMonitoringState
}