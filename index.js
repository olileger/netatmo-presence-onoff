/**
 * Here we are !
 */
require("dotenv").config();
const np = require("./src/netatmopresence.cjs");

let npc = new np.NetatmoPresenceController(process.env.NETATMO_CLIENT_ID,
    process.env.NETATMO_CLIENT_SECRET,
    process.env.NETATMO_USERNAME,
    process.env.NETATMO_PASSWORD);

npc.TurnMonitoringOn();
//npc.TurnMonitoringOff();
