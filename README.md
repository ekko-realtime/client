# Ekko client

A JavaScript client for Ekko, the realtime serverless platform.

If you have not already done so, you should first deploy your Ekko infrastructure using the Ekko CLI [https://github.com/ekko-live/cli](https://github.com/ekko-live/cli)

## Download ekko-client

Download Ekko client from any of the following sources:

### Use the CDN

```html
<script src="https://d3irfuxwybyrt2.cloudfront.net/ekko-client-v2.2.2.js"></script>
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
| `UUID`    | String | No       | Randomly generated UUID | Unique identifier for each user. Useful for maintaining user state across devices                                           |

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
    const channel = ekkoEvent.channel;
    const message = ekkoEvent.message;
  },
  message: (ekkoEvent) => {
    addMessage(ekkoEvent);
  },
  presence: (ekkoEvent) => {
    addStatus(ekkoEvent.message);
  },
});
```

<!--  -->
<!--  -->
<!--  -->

## Update distribution file

Use the following commands to create new distribution JavaScript files. [Browserfy](http://browserify.org/) is used to bundle dependencies into one file.

- `./lib/ekko-client.js` is used as the source file
- The bundled file is saved to `./dist/ekko-client-v#.#.#.js
- The current npm project version is automatically used when naming the file

### Manually generate distribution file

```bash
npm run build
```

### Automatically generate distribution file when source file changes

```bash
npm run watch
```

## Initialize ekko object

```

```

### Provide a UUID

https://www.npmjs.com/package/lil-uuid
