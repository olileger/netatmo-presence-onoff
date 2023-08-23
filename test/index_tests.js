/**
 * Index testing code.
 */
const index = require("../index.js");
require("dotenv").config({ path: "./test/.env" });


describe("Name is accessible", function()
{
    let ctrl;
    it("Should build an object", function()
    {
        ctrl = new index.NetatmoPresenceController(
            process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_REFRESH_TOKEN);
    });

    it("Should turn monitoring on", async function()
    {
        await ctrl.TurnMonitoringOn();
    });

    it("Should turn monitoring off", async function()
    {
        await ctrl.TurnMonitoringOff();
    });

    it("Should turn monitoring on", function(done)
    {
        ctrl.TurnMonitoringOn()
        .then(() =>
        {
            done();
        })
    });

    it("Should turn monitoring off", function(done)
    {
        ctrl.TurnMonitoringOff()
        .then(() =>
        {
            done();
        })
    });
});