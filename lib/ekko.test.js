const Ekko = require("./ekko");
jest.mock("./ekko");
const ekko = new Ekko();

describe("testing instantiation", () => {
  test("ekko is an instance of Ekko", () => {
    expect(ekko instanceof Ekko).toBe(true);
  });
});

describe("testing method presence", () => {
  test("ekko is an instance of Ekko", () => {
    expect(ekko instanceof Ekko).toBe(true);
  });

  test("ekko has access to the constructor method", () => {
    expect(ekko.constructor instanceof Function).toBe(true);
  });

  test("ekko has access to the subscribe method", () => {
    expect(ekko.subscribe instanceof Function).toBe(true);
  });

  test("ekko has access to the unsubscribe method", () => {
    expect(ekko.unsubscribe instanceof Function).toBe(true);
  });

  test("ekko has access to the publish method", () => {
    expect(ekko.publish instanceof Function).toBe(true);
  });

  test("ekko has access to the stop method", () => {
    expect(ekko.stop instanceof Function).toBe(true);
  });

  test("ekko has access to the cleanHost method", () => {
    expect(ekko.cleanHost instanceof Function).toBe(true);
  });
});
