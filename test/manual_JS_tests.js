const netatmoapi = require("../src/netatmoapi.cjs");
require("dotenv").config({ path: "./test/.env" });

let access_token = "";

async function GetToken()
{
    console.log("Get a token");

    let res = await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
        process.env.NETATMO_CLIENT_SECRET,
        process.env.NETATMO_REFRESH_TOKEN);

    console.log(res.status);
    console.log(res.data.access_token);
    access_token = res.data.access_token;
}


async function ReadDatas()
{
    console.log("Read Home Datas");

    let res = await netatmoapi.GetHomesData(access_token);

    console.log(res.status);
    console.log(JSON.stringify(res.data));
}

(async function()
{
    await GetToken();
    await ReadDatas();
})();