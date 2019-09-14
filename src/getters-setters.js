const test = require("tape");
// const _ = require('lodash');

module.exports = (compose) => {
  const getsetProps = [
    "methods",
    "properties",
    "deepProperties",
    "staticProperties",
    "staticDeepProperties",
    "configuration",
    "deepConfiguration"
  ];

  test("getter and setter", nest => {

    nest.test("should merge into stamp descriptor", assert => {
      const createGS = () => ({ get info() { return `getter${this._info}`; }, set info(info) { this._info += `PREFIX-${info}`; } });
      const stamp = getsetProps.reduce((stamp, propName) => stamp.compose({ [propName]: createGS() }), compose());

      const descriptor = stamp.compose;
      getsetProps.forEach(propName => {
        const info = Object.getOwnPropertyDescriptor(descriptor[propName], "info");
        assert.equal(typeof info.get, "function", "should have getter in " + propName);
        assert.equal(typeof info.set, "function", "should have setter in " + propName);
      });

      assert.end();
    });

    nest.test("should be okay to overwrite with different getters and setters", assert => {
      const createGS = () => ({ get info() { return `getter${this._info}`; }, set info(info) { this._info += `PREFIX-${info}`; } });
      let stamp = getsetProps.reduce((stamp, propName) => stamp.compose({ [propName]: createGS() }), compose());

      const createGS2 = () => ({ get info() { return "2"; }, set info(info) { this._info = `3${info}`; } });
      stamp = getsetProps.reduce((stamp, propName) => stamp.compose({ [propName]: createGS2() }), stamp);

      const descriptor = stamp.compose;
      getsetProps.forEach(propName => {
        const info = Object.getOwnPropertyDescriptor(descriptor[propName], "info");
        assert.equal(typeof info.get, "function", "should have getter in " + propName);
        assert.equal(typeof info.set, "function", "should have setter in " + propName);
      });

      const instance = stamp();
      const info = Object.getOwnPropertyDescriptor(instance, "info");
      assert.equal(typeof info.get, "function", "should have getter on object instance");
      assert.equal(typeof info.set, "function", "should have setter on object instance");
      assert.equal(instance.info, "2", "getter should be the last");
      instance.info = "3";
      assert.equal(instance._info, "33", "setter should be the last");

      const info2 = Object.getOwnPropertyDescriptor(instance.__proto__, "info");
      assert.equal(typeof info2.get, "function", "should have getter on object prototype");
      assert.equal(typeof info2.set, "function", "should have setter on object prototype");
      assert.equal(instance.__proto__.info, "2", "getter should be the last");
      instance.__proto__.info = "3";
      assert.equal(instance.__proto__._info, "33", "setter should be the last");

      const info3 = Object.getOwnPropertyDescriptor(stamp, "info");
      assert.equal(typeof info3.get, "function", "should have getter on object prototype");
      assert.equal(typeof info3.set, "function", "should have setter on object prototype");
      assert.equal(stamp.info, "2", "getter should be the last");
      stamp.info = "3";
      assert.equal(stamp._info, "33", "setter should be the last");

      const info4 = Object.getOwnPropertyDescriptor(stamp.compose.configuration, "info");
      assert.equal(typeof info4.get, "function", "should have getter on object prototype");
      assert.equal(typeof info4.set, "function", "should have setter on object prototype");
      assert.equal(stamp.compose.configuration.info, "2", "getter should be the last");
      stamp.compose.configuration.info = "3";
      assert.equal(stamp.compose.configuration._info, "33", "setter should be the last");

      assert.end();
    });

    nest.test("in methods", assert => {
      const stamp = compose({
        properties: { _info: "_initial_" },
        methods: {
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      const instance = stamp();
      instance.info = "TEXT";

      assert.equal(instance.info, "getter_initial_PREFIX-TEXT", "Getter should be copied");
      assert.equal(instance._info, "_initial_PREFIX-TEXT", "Setter should be copied");

      assert.end();
    });

    nest.test("in properties", assert => {
      const stamp = compose({
        properties: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      const instance = stamp();
      instance.info = "TEXT";

      assert.equal(instance.info, "getter_initial_PREFIX-TEXT");
      assert.equal(instance._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

    nest.test("in deepProperties", assert => {
      const stamp = compose({
        deepProperties: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      const instance = stamp();
      instance.info = "TEXT";

      assert.equal(instance.info, "getter_initial_PREFIX-TEXT");
      assert.equal(instance._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

    nest.test("in staticProperties", assert => {
      const stamp = compose({
        staticProperties: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      stamp.info = "TEXT";

      assert.equal(stamp.info, "getter_initial_PREFIX-TEXT");
      assert.equal(stamp._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

    nest.test("in staticDeepProperties", assert => {
      const stamp = compose({
        staticDeepProperties: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      stamp.info = "TEXT";

      assert.equal(stamp.info, "getter_initial_PREFIX-TEXT");
      assert.equal(stamp._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

    nest.test("in configuration", assert => {
      const stamp = compose({
        configuration: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      const configuration = stamp.compose.configuration;
      configuration.info = "TEXT";

      assert.equal(configuration.info, "getter_initial_PREFIX-TEXT");
      assert.equal(configuration._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

    nest.test("in deepConfiguration", assert => {
      const stamp = compose({
        deepConfiguration: {
          _info: "_initial_",
          get info() {
            return `getter${this._info}`;
          },
          set info(info) {
            this._info += `PREFIX-${info}`;
          }
        }
      });

      const deepConfiguration = stamp.compose.deepConfiguration;
      deepConfiguration.info = "TEXT";

      assert.equal(deepConfiguration.info, "getter_initial_PREFIX-TEXT");
      assert.equal(deepConfiguration._info, "_initial_PREFIX-TEXT");

      assert.end();
    });

  });

};
