/**
 * Netatmo API testing code.
 */
const expect = require("chai").expect;
const netatmoapi = require("../src/netatmoapi.cjs");
require("dotenv").config({ path: "./test/.env" });


/**
 * Check if there's an error description
 * and if it matches what's expected.
 * @param {*} err 
 * @param {*} message 
 */
function CheckExpectedError(err, message)
{
    expect(err.NetatmoApiDescription).not.undefined;
    expect(err.NetatmoApiDescription).equals(message);
}


describe("GetApiAccessToken", function()
{
    function checkError(err)
    {
        CheckExpectedError(err, "Failed to get API access token");
    }

    it("Should return an access token", async function()
    {
        let res = await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                                     process.env.NETATMO_CLIENT_SECRET,
                                                     process.env.NETATMO_USERNAME,
                                                     process.env.NETATMO_PASSWORD);
        
        expect(res).not.undefined;
        expect(res.data).not.undefined;
        expect(res.data.access_token).not.undefined;
        expect(res.data.access_token.length).greaterThan(1);
    });

    it("Should throw an error when client id is void", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken("",
                                               process.env.NETATMO_CLIENT_SECRET,
                                               process.env.NETATMO_USERNAME,
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when client id is unknown", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken("ABCDEF",
                                               process.env.NETATMO_CLIENT_SECRET,
                                               process.env.NETATMO_USERNAME,
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when client secret is void", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               "",
                                               process.env.NETATMO_USERNAME,
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when client secret is unknown", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               "ABCDEF",
                                               process.env.NETATMO_USERNAME,
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when username is void", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               process.env.NETATMO_CLIENT_SECRET,
                                               "",
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when username is unknown", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               process.env.NETATMO_CLIENT_SECRET,
                                               "ABCDEF",
                                               process.env.NETATMO_PASSWORD);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when password is void", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               process.env.NETATMO_CLIENT_SECRET,
                                               process.env.NETATMO_USERNAME,
                                               "");
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when password is unknown", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
                                               process.env.NETATMO_CLIENT_SECRET,
                                               process.env.NETATMO_USERNAME,
                                               "ABCDEF");
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when everything is void", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken("", "", "", "");
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when everything is missing", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error when everything is unknown", async function()
    {
        try
        {
            await netatmoapi.GetApiAccessToken("A", "B", "C", "D");
        }
        catch (err)
        {
            checkError(err);
        }
    });
});


describe("GetHomesData", function()
{
    function checkError(err)
    {
        CheckExpectedError(err, "Failed to get homes data");
    }

    let token;
    it("Should start by getting an access token", async function()
    {
        let res = await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_USERNAME,
            process.env.NETATMO_PASSWORD);
        token = res.data.access_token;
    });

    it("Should return home informations", async function()
    {
        let res = await netatmoapi.GetHomesData(token);
        
        expect(res).not.undefined;
        expect(res.data).not.undefined;
        expect(res.data.body).not.undefined;
        expect(res.data.body.homes).not.undefined;
        expect(res.data.body.homes.length).equals(1);
        expect(res.data.body.homes[0].id).not.undefined;
        expect(res.data.body.homes[0].modules).not.undefined;
        expect(res.data.body.homes[0].modules.length).greaterThanOrEqual(1);
        expect(res.data.body.homes[0].modules[0].id).not.undefined;
    });

    it("Should throw an error if access token is missing", async function()
    {
        try
        {
            await netatmoapi.GetHomesData();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if access token is void", async function()
    {
        try
        {
            await netatmoapi.GetHomesData("");
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if access token is unknown", async function()
    {
        try
        {
            await netatmoapi.GetHomesData("ABCDEF");
        }
        catch (err)
        {
            checkError(err);
        }
    });
});


describe("SetMonitoringState", function()
{
    function deepCopy(obj)
    {
        return JSON.parse(JSON.stringify(obj));
    }

    function checkError(err)
    {
        CheckExpectedError(err, "Failed to set monitoring state");
    }

    let token;
    it("Should start by getting an access token", async function()
    {
        let res = await netatmoapi.GetApiAccessToken(process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_USERNAME,
            process.env.NETATMO_PASSWORD);
        token = res.data.access_token;
    });

    let refPayload =
    {
        home:
        {
            id: process.env.NETATMO_HOME_ID,
            modules:
            [
                {
                    id: process.env.NETATMO_CAM_1_ID,
                    monitoring: "on"
                }
            ]
        }
    };

    it("Turns the monitoring on", async function()
    {
        await netatmoapi.SetMonitoringState(token, refPayload);
    });

    it("Turns the monitoring off", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules[0].monitoring = "off";
        await netatmoapi.SetMonitoringState(token, payload);
    });

    it("Should throw an error if access token is missing", async function()
    {
        try {  await netatmoapi.SetMonitoringState(null, refPayload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if access token is void", async function()
    {
        try {  await netatmoapi.SetMonitoringState("", refPayload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if access token is unknown", async function()
    {
        try {  await netatmoapi.SetMonitoringState("ABCDEF", refPayload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if payload is missing", async function()
    {
        try {  await netatmoapi.SetMonitoringState(token); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if payload is void", async function()
    {
        try {  await netatmoapi.SetMonitoringState(token, {}); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if payload is not an object", async function()
    {
        try {  await netatmoapi.SetMonitoringState(token, "ABCDEF"); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if the state is missing", async function()
    {
        let payload = deepCopy(refPayload);
        delete payload.home.modules[0].monitoring;
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if the state is void", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules[0].monitoring = "";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if the state is unknown", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules[0].monitoring = "ABCDEF";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home is missing", async function()
    {
        let payload = deepCopy(refPayload);
        delete payload.home;
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home is void", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home = { };
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home is not an object", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home = "ABCDEF";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home id is missing", async function()
    {
        let payload = deepCopy(refPayload);
        delete payload.home.id;
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home id is void", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.id = "";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if home id is unknown", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.id = "ABCDEF";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules is missing", async function()
    {
        let payload = deepCopy(refPayload);
        delete payload.home.modules;
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules is void", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules = new Array();
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules is not an array", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules = "ABCDEF";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules id is missing", async function()
    {
        let payload = deepCopy(refPayload);
        delete payload.home.modules[0].id;
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules id is void", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules[0].id = "";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });

    it("Should throw an error if modules id is unknown", async function()
    {
        let payload = deepCopy(refPayload);
        payload.home.modules[0].id = "ABCDEF";
        try {  await netatmoapi.SetMonitoringState(token, payload); }
        catch(err) { checkError(err); }
    });
});