/**
 * Here we are !
 */
require("dotenv").config();
const np = require("./src/netatmopresence.cjs");

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

let npc = new np.NetatmoPresenceController(process.env.NETATMO_CLIENT_ID,
    process.env.NETATMO_CLIENT_SECRET,
    process.env.NETATMO_USERNAME,
    process.env.NETATMO_PASSWORD,
    homes);


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
        console.log("Ca a foiré: " + err.NetatmoApiDescription);
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
