# Ekko client

A JavaScript client for Ekko, the realtime serverless platform.

If you have not already done so, you should first deploy your Ekko infrastructure using the Ekko CLI [https://github.com/ekko-live/cli](https://github.com/ekko-live/cli)

## Download ekko-client

Download Ekko client from any of the following sources:

### Use the CDN

```html
<script src="https://d3irfuxwybyrt2.cloudfront.net/ekko-client-v2.2.3.js"></script>
```

### Use a package manager

```bash
npm install ekko-realtime-client
```

### Get the source code

[https://github.com/ekko-live/client](https://github.com/ekko-live/client)

## Initialization

### Description

Use this method to initialize the Ekko client. At a minimum you will need to provide the host endpoint and a valid JWT which can be generated with the [Ekko CLI](https://github.com/ekko-live/cli)

### Method

```JavaScript
Ekko( {String host, String JWT, String AppName, String UUID} )
```

| Parameter | Type   | Required | Defaults                | Description                                                                                                                 |
| :-------- | :----- | :------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `host`    | String | Yes      |                         | URL endpoint for your Ekko server provided by your [Ekko CLI](https://github.com/ekko-live/cli)                             |
| `JWT`     | String | Yes      |                         | App specific JWT for authenticating your Ekko client instance provided by your [Ekko CLI](https://github.com/ekko-live/cli) |
| `AppName` | String | Yes      |                         | Name of the application you are working on. Used for message routing                                                        |
| `UUID`    | String | Optional | Randomly generated UUID | Unique identifier for each user. Useful for maintaining user state across devices                                           |

Note: [https://www.npmjs.com/package/lil-uuid](https://www.npmjs.com/package/lil-uuid) is an NPM package that can be used to generate UUID's

### Basic Usage

Applications can `initialize` the Ekko client object by passing the `host` and `JWT` provided by your [Ekko CLI](https://github.com/ekko-live/cli). Each client will also need the `appName` that was used to generate the `JWT`. Each client should also pass a `UUID` that represents the user or the device that connects to th [Ekko server](https://github.com/ekko-live/server).

```JavaScript
const ekko = new Ekko({
  host: "myEkkoServerEndpoint",
  jwt: "myAppJWT",
  appName: "myAppName",
  uuid: "myUniqueUUID",
});
```

## Event Listeners

### Description

You can add callback functions to status, message, and presence events using the `addListener` method.

### Adding Listeners

```JavaScript
ekko.addListener({
  status: (ekkoEvent) => {
    const event = ekkeEvent.event // Description of the event that occurred
    const app = ekkoEvent.app; // App that the event occurred on
    const admin = ekkoEvent.admin; // True if user that triggered event is an Admin, False otherwise
  },
  message: (ekkoEvent) => {
    const message = ekkoEvent.message; // Message object
    const channel = ekkoEvent.channel; // Channel on which the message was published
    const uuid = ekkoEvent.uuid; // Message publisher
  },
  presence: (ekkoEvent) => {
    // TODO: FILL OUT
  },
});
```

### Listener Status Events

TODO: FILL OUT

### Listener Presence Event

TODO: FILL OUT

## Publish

### Description

The `publish()` method is used to send a message to all subscribers of a channel within the same app as teh publisher.

#### Publish Anytime

The publisher can only publish to other users within the same app, but they do not necessarily need to be a subscriber to the channel they are publishing to.

#### Message Data

The message argument can be any valid JavaScript object. You are able to define any properties you need to meet your app's requirements.

### Method

```JavaScript
publish(Object message, String channel)
```

| Parameter | Type   | Required | Defaults | Description                                       |
| :-------- | :----- | :------- | :------- | :------------------------------------------------ |
| `message` | Object | Yes      |          | The `message` may be any valid JavaScript object. |
| `channel` | String | Yes      |          | Specifies `channel` name to publish messages to.  |

### Basic Usage

```JavaScript
ekko.publish({
  channel: "my_channel",
  message: {
    text: "my message text",
    otherProperty: "any other data you need to pass to subscribers",
  },
});
```

## Subscribe

### Description

This method causes the client to create an open TCP socket connection to the Ekko server and begin listening for messages on a specific `channel`.

### Method

```JavaScript
subscribe({Array channels, Boolean withPresence})
```

| Parameter      | Type    | Required | Defaults | Description                                                                                         |
| :------------- | :------ | :------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `channels`     | Array   | Yes      |          | Specifies the `channels` to subscribe to. It is possible to specify multiple `channels` as an array |
| `withPresence` | Boolean | Optional | False    | If `true` it also subscribes to presence events                                                     |

### Basic Usage

#### Subscribe to single channel

```JavaScript
ekko.subscribe({
  channels: ["my_channel"],
});
```

#### Subscribe to multiple channels

```JavaScript
ekko.subscribe({
  channels: ["my_channel_1", "my_channel_2", "my_channel_3"],
});
```

#### Subscribe with presence

```JavaScript
ekko.subscribe({
  channels: ["my_channel"],
  withPresence: true,
});
```

## Accessing Ekko client information

### Description

Ekko client information is stored on the `ekko` instance and can be accessed.

#### Host

```JavaScript
ekko.host // Ekko server host endpoint URL
```

#### uuid

```JavaScript
ekko.uuid // Ekko client instance uuid
```

#### Host

```JavaScript
ekko.appName // Ekko app name
```

# Open Source Development

## Update Distribution File

### Description

Ekko is an open source project - modification and further development is encouraged!

The distribution files within the `/dist` directory are useful when developing front-end only applications. This file contains all of the necessary dependencies to run Ekko client. These are the files that are uploaded to the Ekko CDN.

Changes to the Ekko client code should be made within `/lib/ekko.js`. If you changes are made, you will need to make a new distribution file. There are two ways to make a new distribution file detailed below.

### Methods

#### Automatic distribution file creation (for development)

Run the following command in your terminal from the root of the Ekko client project directory. When any changes are made to `lib/ekko.js`, a new distribution file will be generated within the `/dist` directory. This file will be named based off the current npm project version and will overwrite any file that has the same name. This distribution file will not be minified to allow for easier troubleshooting.

```bash
npm run watch
```

#### Manual distribution file creation (for production)

When you are ready to generate the production version of your distribution file, run the below command to generate a new distribution file in the `/dist` directory. This file will be named based on the current npm project version and will overwrite any file that has the same name. This distribution file will be minified to reduce the size.

```bash
npm run build
```
