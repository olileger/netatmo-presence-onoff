/**
 * Netatmo Presence testing code.
 */
const expect = require("chai").expect;
const netatmopresence = require("../src/netatmopresence.cjs");
require("dotenv").config({ path: "./test/.env" });


describe("Object construction", function()
{
    function checkError(err)
    {
        expect(err.message).not.undefined;
        expect(err.message).equals("Required parameter is missing");
    }

    let homes =
    [
        {
            id: process.env.NETATMO_HOME_ID,
            modules:
            [
                { id: process.env.NETATMO_CAM_1_ID },
                { id: process.env.NETATMO_CAM_2_ID }
            ]
        }
    ];

    it ("Should build an object", function()
    {
        let o;
        let e;
        try
        {
            o = new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(o).not.undefined;
            expect(o).not.null;
            expect(e).undefined;
        }
    });

    it ("Should build an object even if homes is missing", function()
    {
        let o;
        let e;
        try
        {
            o = new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN);
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(o).not.undefined;
            expect(o).not.null;
            expect(e).undefined;
        }
    });

    it("Should throw an error if client id is missing", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                undefined,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if client id is null", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                null,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if client id is void", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                "",
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if client secret is missing", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                undefined,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if client secret is null", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                null,
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if client secret is void", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                "",
                process.env.NETATMO_REFRESH_TOKEN,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if refresh token is missing", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                undefined,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if refresh token is null", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                null,
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if refresh token is void", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                "",
                homes);
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it("Should throw an error if everything is missing", function()
    {
        try
        {
            new netatmopresence.NetatmoPresenceController(
                undefined,
                undefined,
                undefined);
        }
        catch (err)
        {
            checkError(err);
        }
    });
});


describe("TurnMonitoringOn, TurnMonitoringOff", function()
{
    function checkError(err)
    {
        expect(err.NetatmoApiDescription).not.undefined;
    }

    let o;
    it ("Starts by building an object", function()
    {
        let e;
        try
        {
            o = new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                [
                    {
                        id: process.env.NETATMO_HOME_ID,
                        modules:
                        [
                            { id: process.env.NETATMO_CAM_1_ID }
                        ]
                    }
                ]);
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(o).not.undefined;
            expect(o).not.null;
            expect(e).undefined;
        }
    });

    it ("Should turn monitoring on", async function()
    {
        let e;
        try
        {
            await o.TurnMonitoringOn();
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(e).undefined;
        }
    });

    it ("Should turn monitoring off", async function()
    {
        let e;
        try
        {
            await o.TurnMonitoringOff();
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(e).undefined;
        }
    });

    it ("Should turn monitoring on all cameras if home is not passed along", async function()
    {
        let e;
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN)
                .TurnMonitoringOn();
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(e).undefined;
            expect(o.GetHomes()).to.not.be.null;
        }
    });

    it ("Should turn monitoring off all cameras if home is not passed along", async function()
    {
        let e;
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            e = err;
        }
        finally
        {
            expect(e).undefined;
            expect(o.GetHomes()).to.not.be.null;
        }
    });

    it ("Should throw an error if home id is missing", async function()
    {
        let h = [{  id: undefined,
                    modules: [ { id: process.env.NETATMO_CAM_1_ID }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if home id is null", async function()
    {
        let h = [{  id: null,
            modules: [ { id: process.env.NETATMO_CAM_1_ID }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if home id is void", async function()
    {
        let h = [{  id: "",
            modules: [ { id: process.env.NETATMO_CAM_1_ID }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if home id is unknown", async function()
    {
        let h = [{  id: "undefined",
            modules: [ { id: process.env.NETATMO_CAM_1_ID }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if cam id is missing", async function()
    {
        let h = [{  id: process.env.NETATMO_HOME_ID,
            modules: [ { id: undefined }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if cam id is null", async function()
    {
        let h = [{  id: process.env.NETATMO_HOME_ID,
            modules: [ { id: null }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if cam id is void", async function()
    {
        let h = [{  id: process.env.NETATMO_HOME_ID,
            modules: [ { id: "" }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });

    it ("Should throw an error if cam id is unknown", async function()
    {
        let h = [{  id: process.env.NETATMO_HOME_ID,
            modules: [ { id: "undefined" }]}];
        try
        {
            await new netatmopresence.NetatmoPresenceController(
                process.env.NETATMO_CLIENT_ID,
                process.env.NETATMO_CLIENT_SECRET,
                process.env.NETATMO_REFRESH_TOKEN,
                h)
                .TurnMonitoringOff();
        }
        catch (err)
        {
            checkError(err);
        }
    });
});