const tap = require("tap");
const Ekko = require("./ekko");

const iofn = () => {
  return {
    on: (eventType, callback) => {
      switch (eventType) {
        case "connected":
          return callback;
          break;
      }
    },
  };
};

tap.beforeEach(() => {
  tap.context.ekko = new Ekko({
    host: "inputHost",
    jwt: "inputJwt",
    appName: "inputAppName",
    uuid: "inputUuid",
    iofn,
  });
});

tap.test("ekko instantiates correctly with all params", (t) => {
  const ekko = t.context.ekko;

  t.ok(ekko instanceof Ekko, "ekko is an instance of Ekko");
  t.equal(ekko.host, "inputHost/", "host property assigned");
  t.equal(ekko.appName, "inputAppName", "appnName property assigned");
  t.equal(ekko.uuid, "inputUuid", "uuid property assigned");
  t.ok(ekko.socket, "socket property assigned");
  t.end();
});

tap.test("ekko instantiates correctly without uuid param", (t) => {
  const ekko = new Ekko({
    host: "inputHost",
    jwt: "inputJwt",
    appName: "inputAppName",
    iofn,
  });

  t.ok(ekko instanceof Ekko, "ekko is an instance of Ekko");
  t.equal(ekko.host, "inputHost/", "host property assigned");
  t.equal(ekko.appName, "inputAppName", "appnName property assigned");
  t.ok(ekko.socket, "socket property assigned");
  t.not(ekko.uuid, "", "random uuid assigned");
  t.type(ekko.uuid, "string", "random uuid is a string");
  t.ok(ekko.uuid.length > 0, "random uuid is not empty");
  t.end();
});

tap.test("ekko doesn't instantiates without host param", (t) => {
  const ekko = new Ekko({
    jwt: "inputJwt",
    appName: "inputAppName",
    iofn,
  });

  t.ok(ekko instanceof Error, "error returned when host is missing");
  t.equal(ekko.message, "Invalid params", "expected error message");
  t.end();
});

tap.test("ekko doesn't instantiates without jwt param", (t) => {
  const ekko = new Ekko({
    host: "inputHost",
    appName: "inputAppName",
    iofn,
  });

  t.ok(ekko instanceof Error, "error returned when jwt is missing");
  t.equal(ekko.message, "Invalid params", "expected error message");
  t.end();
});

tap.test("ekko doesn't instantiates without appName param", (t) => {
  const ekko = new Ekko({
    host: "inputHost",
    jwt: "inputJwt",
    iofn,
  });

  t.ok(ekko instanceof Error, "error returned when appName is missing");
  t.equal(ekko.message, "Invalid params", "expected error message");
  t.end();
});

tap.test("ekko doesn't instantiates without params", (t) => {
  const ekko = new Ekko();

  t.ok(ekko instanceof Error, "error returned when params are missing");
  t.equal(ekko.message, "Invalid params", "expected error message");
  t.end();
});

tap.test("cleanHost functions correctly", (t) => {
  const ekko1 = new Ekko({
    host: "inputHost",
    jwt: "inputJwt",
    appName: "inputAppName",
    iofn,
  });

  const ekko2 = new Ekko({
    host: "inputHost/",
    jwt: "inputJwt",
    appName: "inputAppName",
    iofn,
  });

  t.equal(ekko1.host, ekko2.host, "slash added to end of host if missing");
  t.end();
});

tap.test("addListener method has expected behavior", (t) => {
  const ekko = t.context.ekko;

  t.type(ekko.addListener, "function", "addListener is function");
  // TODO: test functionality
  t.end();
});

tap.test("subscribe method has expected behavior", (t) => {
  const ekko = t.context.ekko;

  t.type(ekko.subscribe, "function", "subscribe is function");
  // TODO: test functionality
  t.end();
});

tap.test("undubscribe method has expected behavior", (t) => {
  const ekko = t.context.ekko;

  t.type(ekko.unsubscribe, "function", "undubscribe is function");
  // TODO: test functionality
  t.end();
});

tap.test("publish method has expected behavior", (t) => {
  const ekko = t.context.ekko;

  t.type(ekko.publish, "function", "publish is function");
  // TODO: test functionality
  t.end();
});

tap.test("stop method has expected behavior", (t) => {
  const ekko = t.context.ekko;

  t.type(ekko.stop, "function", "stop is function");
  // TODO: test functionality
  t.end();
});
