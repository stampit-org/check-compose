const test = require('tape');

module.exports = (compose) => {

  const assignmentProps = [
    'methods',
    'properties',
    'deepProperties',
    'staticProperties',
    'staticDeepProperties',
    'configuration',
    'deepConfiguration'
  ];

  const build = (num) => {
    const composable = function () {};
    composable.compose = function () {};

    assignmentProps.forEach(prop => {
      composable.compose[prop] = {
        [num]: num,
        override: num,

        actualValue: null,
        get getter() {
          return this.actualValue;
        },
        set setter(val) {
          this.actualValue = val;
        },
        get getterAndSetter() {
          return this.actualValue;
        },
        set getterAndSetter(val) {
          this.actualValue = val;
        }
      };
    });

    return composable;
  };

  // Loop over each property that is copied by assignment and ensure
  // that copy and priority are implemented correctly.
  assignmentProps.forEach(prop => {
    test(`${ prop } assignment 1`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      const actual = descr[prop][1];
      const expected = 1;

      assert.equal(actual, expected,
        `${ prop } should be copied by assignment from first argument`);

      assert.end();
    });

    test(`${ prop } assignment 2`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      const actual = descr[prop][2];
      const expected = 2;

      assert.equal(actual, expected,
        `${ prop } should be copied by assignment from 2nd argument`);

      assert.end();
    });

    test(`${ prop } assignment 3`, (assert) => {
      const subject = compose(build(1), build(2), build(3));
      const descr = subject.compose;

      const actual = descr[prop][3];
      const expected = 3;

      assert.equal(actual, expected,
        `${ prop } should be copied by assignment from subsequent arguments`);

      assert.end();
    });

    test(`${ prop } assignment priority`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      const actual = descr[prop].override;
      const expected = 2;

      assert.equal(actual, expected,
        `${ prop } should be copied by assignment with last-in priority`);

      assert.end();
    });

    test(`${ prop } getters copying`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      const actual = descr[prop].getter;
      const expected = descr[prop].actualValue;

      assert.equal(actual, expected,
        `${ prop } getter should be copied`);

      assert.end();
    });

    test(`${ prop } setters copying`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      descr[prop].setter = 4;
      const actual = descr[prop].actualValue;
      const expected = 4;

      assert.equal(actual, expected,
        `${ prop } setter should be copied`);

      assert.end();
    });

    test(`${ prop } getter+setter copying`, (assert) => {
      const subject = compose(build(1), build(2));
      const descr = subject.compose;

      let actual = descr[prop].getterAndSetter;
      let expected = descr[prop].actualValue;

      assert.equal(actual, expected,
        `${ prop } getter should be copied`);

      descr[prop].getterAndSetter = 4;
      actual = descr[prop].actualValue;
      expected = 4;

      assert.equal(actual, expected,
        `${ prop } setter after getter should be copied`);

      descr[prop].getterAndSetter = 5;
      actual = descr[prop].getterAndSetter;
      expected = 5;

      assert.equal(actual, expected,
        `${ prop } getter should return setter's value`);

      assert.end();
    });
  });

};
