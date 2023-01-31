/**
 * Here we are !
 */
require("dotenv").config();
const np = require("./src/netatmopresence.cjs");

let npc = new np.NetatmoPresenceController(process.env.NETATMO_CLIENT_ID,
    process.env.NETATMO_CLIENT_SECRET,
    process.env.NETATMO_USERNAME,
    process.env.NETATMO_PASSWORD);

let on = false;
if (on)
{
    npc.TurnMonitoringOn()
    .then(() =>
    {
        console.log("Youpi !");
    })
    .catch((err) =>
    {
        console.log("Ca a foiré: " + err);
    });
}
else
{
    npc.TurnMonitoringOff()
    .then(() =>
    {
        console.log("Youpi !");
    })
    .catch((err) =>
    {
        console.log("Ca a foiré: " + err.NetatmoApiDescription);
    });
}
