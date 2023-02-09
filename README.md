# netatmo-presence-onoff
Code to turn ON or OFF the monitoring state of your Netatmo Presence cameras directly from Javascript !


# usage
## Prerequisite
You may rely on environment variables either as system env vars or within a `.env` file loaded with a tool such as dotenv to create a Netatmo Presence controller. While this is not mandatory to rely on env vars, the controller expect 4 parameters as described below:
```
NETATMO_USERNAME="XXXXXXXXXX"
NETATMO_PASSWORD="XXXXXXXXXX"
NETATMO_CLIENT_ID="XXXXXXXXXX"
NETATMO_CLIENT_SECRET="XXXXXXXXXX"
```

- `NETATMO_USERNAME` and `NETATMO_PASSWORD` is your credentials to access your Netatmo Security application.
- `NETATMO_CLIENT_ID` and `NETATMO_CLIENT_SECRET` are two values you get when you create an application within Netatmo Connect which is the landing portal for the developper community.
  * Connect to https://dev.netatmo.com/apps/ with your Netatmo credentials
  * Create a new app and fill only the required fields (marked by a *)
  * Once saved you instantly get your Cliend ID and Client Secret to fill both environment variable


## Turning your cameras ON or OFF
This is as simple as that:
```
const netatmo = require("netatmo-presence-onoff");

console.log("Et c'est parti pour le show");

let ctrl = new netatmo.NetatmoPresenceController(
            process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_USERNAME,
            process.env.NETATMO_PASSWORD);

await ctrl.TurnMonitoringOn();
await ctrl.TurnMonitoringOff();
```
The function returns a Promise so you have the choice to `await` or `then/catch` something such as:
```
ctrl.TurnMonitoringOn()
.then(() =>
{
    console.log("C'est magnifique");
});
```

## Passing your Home IDs along
### Introduction
If you don't know your home ID and camera ID the library will get it for you. However there are cases where you're already aware of them and it may be easier for you to pass these values along at the object creation.
Doing so will avoid an HTTP request to the Netatmo endpoint to get your home information thus making your overall call to `TurnMonitoringOn()` or `TurnMonitoringOff()` a little bit faster.
There are no API calls during the object creation so if you make mistakes regarding the values at the creation time you'll only be able to be aware when calling the public functions of the object.

### Now the code
The expected format to add your Home IDs is as below:
```
let homes =
[
    {
        id: "My first home ID",
        modules:
        [
            { id: "My first camera ID for my current home ID" },
            { id: "My second camera ID for my current home ID" }
            /* and so on */
        ]
    },
    {
        id: "My second home ID",
        modules:
        [
            { id: "My first camera ID for my current home ID" },
            { id: "My second camera ID for my current home ID" }
        ]
    },
    /* and so on */
];
```

Most of the time you'll have only one Home ID with one or two camera such as:
```
let homes =
[
    {
        id: "ABCDEFGHIJKLMNPO",
        modules:
        [
            { id: "AB:CD:EF:00:00:01" },
            { id: "AB:CD:EF:00:00:02" }
        ]
    }
];
```

Then you can build the controller by adding your homes tab as the last parameter:
```
let ctrl = new netatmo.NetatmoPresenceController(
            process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_USERNAME,
            process.env.NETATMO_PASSWORD,
            homes);
```

### Troubleshooting the dev side
- "Ok bro but **where could I get my camera IDs ??**" => Heads to your Netatmo Security app on your smartphone, the camera ID is the serial number of your camera.

- "You killing it man but **I'm stuck finding my home ID. Any ideas ?**" => That's more tricky as you need to call the Netatmo API on the `/homesdata` path. The `GetHomes()` function on the controller returns a deep copy of the homes tab so my advise would be to create an object without homes passed along, turn the monitoring either on or off then call the `GetHomes()` and console.log the object to get the values.
```
let ctrl = new netatmo.NetatmoPresenceController(
            process.env.NETATMO_CLIENT_ID,
            process.env.NETATMO_CLIENT_SECRET,
            process.env.NETATMO_USERNAME,
            process.env.NETATMO_PASSWORD);

await ctrl.TurnMonitoringOff();

console.log(JSON.stringify(ctrl.GetHomes()));
```
Fair enough? :-)