/* eslint-disable new-cap */
import expect from 'expect.js';
import PropTypes from 'proptypes';
var IPropTypes;
var React;
var Immutable;

var requiredMessage =
  'Required prop `testProp` was not specified in `testComponent`.';

function typeCheckFail(declaration, value, message) {
  var props = {testProp: value};
  var error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  expect(error instanceof Error).to.be(true);
  expect(error.message).to.be(message);
}

function typeCheckPass(declaration, value) {
  var props = {testProp: value};
  var error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  expect(error).not.to.be.ok();
}

describe('ImmutableIPropTypes', function() {
  beforeEach(function() {
    IPropTypes = require('../ImmutablePropTypes');
    React = require('react');
    Immutable = require('immutable');
  });

  describe('IPropTypes config', function() {
    it('should fail if typeChecker is not a function', function() {
      typeCheckFail(
        IPropTypes.listOf({x: PropTypes.string}),
        Immutable.List([Immutable.Map({x: 'y'})]),
        'Invalid typeChecker supplied to ' +
        '`testComponent` for propType `testProp`, expected a function.'
      );
      typeCheckPass(
        IPropTypes.listOf(IPropTypes.contains({x: PropTypes.string})),
        Immutable.List([Immutable.Map({x: 'y'})]));
    });
  });

  describe('Primitive Types', function() {
    it('should not warn for valid values', function() {
      typeCheckPass(IPropTypes.list, Immutable.List());
      typeCheckPass(IPropTypes.map, Immutable.Map());
      typeCheckPass(IPropTypes.map, Immutable.OrderedMap());
      typeCheckPass(IPropTypes.orderedMap, Immutable.OrderedMap());
      typeCheckPass(IPropTypes.record, new (Immutable.Record({a: 1}))());
      typeCheckPass(IPropTypes.set, Immutable.Set());
      typeCheckPass(IPropTypes.set, Immutable.OrderedSet());
      typeCheckPass(IPropTypes.orderedSet, Immutable.OrderedSet());
      typeCheckPass(IPropTypes.stack, Immutable.Stack());
      typeCheckPass(IPropTypes.seq, Immutable.Seq());
      typeCheckPass(IPropTypes.iterable, Immutable.Iterable());
      typeCheckPass(IPropTypes.iterable, Immutable.List());
      typeCheckPass(IPropTypes.iterable, Immutable.Map());
      typeCheckPass(IPropTypes.iterable, Immutable.OrderedMap());
      typeCheckPass(IPropTypes.iterable, Immutable.Set());
      typeCheckPass(IPropTypes.iterable, Immutable.OrderedSet());
      typeCheckPass(IPropTypes.iterable, Immutable.Stack());
      typeCheckPass(IPropTypes.iterable, Immutable.Seq());
      typeCheckPass(IPropTypes.iterable, Immutable.Seq());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.Iterable.Indexed());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.List());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.Stack());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.Range());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.Repeat());
      typeCheckPass(IPropTypes.iterable.indexed, Immutable.Seq.Indexed());
      typeCheckPass(IPropTypes.iterable.keyed, Immutable.Iterable.Keyed());
      typeCheckPass(IPropTypes.iterable.keyed, Immutable.Map());
      typeCheckPass(IPropTypes.iterable.keyed, Immutable.OrderedMap());
      typeCheckPass(IPropTypes.iterable.keyed, new (Immutable.Record({a: 1}))());
      typeCheckPass(IPropTypes.iterable.keyed, Immutable.Seq.Keyed());
    });
    it('should warn for invalid lists', function() {
      typeCheckFail(
        IPropTypes.list,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        Immutable.Map(),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        IPropTypes.list,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `List`.'
      );
    });
    it('should warn for invalid maps', function() {
      typeCheckFail(
        IPropTypes.map,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        Immutable.List(),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        IPropTypes.map,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
    });
    it('should warn for invalid records', function() {
      typeCheckFail(
        IPropTypes.record,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        Immutable.List(),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        IPropTypes.record,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
    });
    it('should warn for invalid iterables', function() {
      typeCheckFail(
        IPropTypes.iterable,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Iterable`.'
      );
      typeCheckFail(
        IPropTypes.iterable,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Iterable`.'
      );
      typeCheckFail(
        IPropTypes.iterable,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Iterable`.'
      );
      typeCheckFail(
        IPropTypes.iterable,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Iterable`.'
      );
      typeCheckFail(
        IPropTypes.iterable,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Iterable`.'
      );
    });
    it('should warn for invalid indexed iterables', function() {
      typeCheckFail(
        IPropTypes.iterable.indexed,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        Immutable.Map(),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
        Immutable.Set(),
        'Invalid prop `testProp` of type `Immutable.Set` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.indexed,
         new (Immutable.Record({a: 1}))(),
        'Invalid prop `testProp` of type `Immutable.Record` supplied to ' +
        '`testComponent`, expected `Iterable.Indexed`.'
      );
    });
    it('should warn for invalid keyed iterables', function() {
      typeCheckFail(
        IPropTypes.iterable.keyed,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.List(),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.Set(),
        'Invalid prop `testProp` of type `Immutable.Set` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.OrderedSet(),
        'Invalid prop `testProp` of type `Immutable.OrderedSet` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.Stack(),
        'Invalid prop `testProp` of type `Immutable.Stack` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.Range(),
        'Invalid prop `testProp` of type `Immutable.Range` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
      typeCheckFail(
        IPropTypes.iterable.keyed,
        Immutable.Repeat(),
        'Invalid prop `testProp` of type `Immutable.Repeat` supplied to ' +
        '`testComponent`, expected `Iterable.Keyed`.'
      );
    });
    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.list, null);
      typeCheckPass(IPropTypes.list, undefined);
    });
    it('should warn for missing required values', function() {
      typeCheckFail(IPropTypes.list.isRequired, null, requiredMessage);
      typeCheckFail(IPropTypes.list.isRequired, undefined, requiredMessage);
    });
  });

  describe('ListOf Type', function() {
    it('should support the listOf propTypes', function() {
      typeCheckPass(IPropTypes.listOf(PropTypes.number), Immutable.List([1, 2, 3]));
      typeCheckPass(IPropTypes.listOf(PropTypes.string), Immutable.List(['a', 'b', 'c']));
      typeCheckPass(IPropTypes.listOf(PropTypes.oneOf(['a', 'b'])), Immutable.List(['a', 'b']));
    });

    it('should support listOf with complex types', function() {
      typeCheckPass(
        IPropTypes.listOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        IPropTypes.listOf(IPropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.listOf(PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), new Thing()])
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number),
        Immutable.List([1, 2, 'b']),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.listOf(PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.List', function() {
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
    });

    it('should not warn when passing an empty array', function() {
      typeCheckPass(IPropTypes.listOf(PropTypes.number), Immutable.List());
      typeCheckPass(IPropTypes.listOf(PropTypes.number), Immutable.List([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.listOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.listOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.listOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('StackOf Type', function() {
    it('should support the stackOf propTypes', function() {
      typeCheckPass(IPropTypes.stackOf(PropTypes.number), Immutable.Stack([1, 2, 3]));
      typeCheckPass(IPropTypes.stackOf(PropTypes.string), Immutable.Stack(['a', 'b', 'c']));
      typeCheckPass(IPropTypes.stackOf(PropTypes.oneOf(['a', 'b'])), Immutable.Stack(['a', 'b']));
    });

    it('should support stackOf with complex types', function() {
      typeCheckPass(
        IPropTypes.stackOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.Stack([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.stackOf(PropTypes.instanceOf(Thing)),
        Immutable.Stack([new Thing(), new Thing()])
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number),
        Immutable.Stack([1, 2, 'b']),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.stackOf(PropTypes.instanceOf(Thing)),
        Immutable.Stack([new Thing(), 'xyz']),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Stack', function() {
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Stack.'
      );
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Stack.'
      );
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Stack.'
      );
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Stack.'
      );
    });

    it('should not warn when passing an empty array', function() {
      typeCheckPass(IPropTypes.stackOf(PropTypes.number), Immutable.Stack());
      typeCheckPass(IPropTypes.stackOf(PropTypes.number), Immutable.Stack([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.stackOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.stackOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.stackOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('MapOf Type', function() {
    it('should support the mapOf propTypes', function() {
      typeCheckPass(IPropTypes.mapOf(PropTypes.number), Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(IPropTypes.mapOf(PropTypes.string), Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(IPropTypes.mapOf(PropTypes.oneOf(['a', 'b'])), Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support mapOf with complex types', function() {
      typeCheckPass(
        IPropTypes.mapOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        IPropTypes.mapOf(IPropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.mapOf(PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the map', function() {
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number),
        Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.mapOf(PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Map', function() {
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(IPropTypes.mapOf(PropTypes.number), Immutable.Map());
      typeCheckPass(IPropTypes.mapOf(PropTypes.number), Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.mapOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.mapOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.mapOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should support keys validation by passing typeChecker as a second argument', function() {
      typeCheckPass(
        IPropTypes.mapOf(
          PropTypes.any,
          PropTypes.string
        ),
        Immutable.Map({a: 1, b: 2})
      );
      typeCheckPass(
        IPropTypes.mapOf(
          PropTypes.any,
          PropTypes.number
        ),
        Immutable.Map([[1, 1], [1, 2]])
      );
      typeCheckPass(
        IPropTypes.mapOf(
          PropTypes.any,
          PropTypes.function
        ),
        Immutable.Map([[() => 1 + 1, 1], [(foo) => 'bar', 2]])
      );
    });

    it('should support keys validation with Immutable keys', function() {
      typeCheckPass(
        IPropTypes.mapOf(
          PropTypes.any,
          IPropTypes.mapContains({
            a: PropTypes.number.isRequired,
            b: PropTypes.string
          })
        ),
        Immutable.Map([
          [Immutable.Map({a: 1, b: '2'}), 1],
          [Immutable.Map({a: 3}), 2]
        ])
      );
    });

    it('should warn with invalid keys in the map', function() {
      typeCheckFail(
        IPropTypes.mapOf(
          PropTypes.any,
          PropTypes.number
        ),
        Immutable.Map({a: 1, b: 2}),
        'Invalid prop `testProp -> key(a)` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );

      typeCheckFail(
        IPropTypes.mapOf(
          PropTypes.any,
          PropTypes.string
        ),
        Immutable.Map([
          [{a: 1}, 2],
          ['a', 1]
        ]),
        'Invalid prop `testProp -> key([object Object])` of type `object` supplied to `testComponent`, ' +
        'expected `string`.'
      );
    });

    it('should cause inner warning with invalid immutable key in the map', function() {
      typeCheckFail(
        IPropTypes.mapOf(
          PropTypes.any,
          IPropTypes.mapContains({
            a: PropTypes.number.isRequired,
            b: PropTypes.string
          })
        ),
        Immutable.Map([
          [Immutable.Map({b: '2'}), 1],
          [Immutable.Map({a: 3}), 2]
        ]),
        'Required prop `testProp -> key(Map { "b": "2" }).a` was not specified in `testComponent`.'
      );
    });
  });

  describe('OrderedMapOf Type', function() {
    it('should support the orderedMapOf propTypes', function() {
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.number), Immutable.OrderedMap({1: 1, 2: 2, 3: 3}));
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.string), Immutable.OrderedMap({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.oneOf(['a', 'b'])), Immutable.OrderedMap({1: 'a', 2: 'b'}));
    });

    it('should support orderedMapOf with complex types', function() {
      typeCheckPass(
        IPropTypes.orderedMapOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.OrderedMap({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        IPropTypes.orderedMapOf(IPropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}}).toOrderedMap()
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.orderedMapOf(PropTypes.instanceOf(Thing)),
        Immutable.OrderedMap({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the map', function() {
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        Immutable.OrderedMap({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.instanceOf(Thing)),
        Immutable.OrderedMap({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.OrderedMap', function() {
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number),
        Immutable.fromJS({a: 1, b: 2 }),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.number), Immutable.OrderedMap());
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.number), Immutable.OrderedMap({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.orderedMapOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.orderedMapOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should support keys validation by passing typeChecker as a second argument', function() {
      typeCheckPass(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          PropTypes.string
        ),
        Immutable.OrderedMap({a: 1, b: 2})
      );
      typeCheckPass(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          PropTypes.number
        ),
        Immutable.OrderedMap([[1, 1], [1, 2]])
      );
      typeCheckPass(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          PropTypes.function
        ),
        Immutable.OrderedMap([[() => 1 + 1, 1], [(foo) => 'bar', 2]])
      );
    });

    it('should support keys validation with Immutable keys', function() {
      typeCheckPass(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          IPropTypes.mapContains({
            a: PropTypes.number.isRequired,
            b: PropTypes.string
          })
        ),
        Immutable.OrderedMap([
          [Immutable.Map({a: 1, b: '2'}), 1],
          [Immutable.Map({a: 3}), 2]
        ])
      );
    });

    it('should warn with invalid keys in the map', function() {
      typeCheckFail(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          PropTypes.number
        ),
        Immutable.OrderedMap({a: 1, b: 2}),
        'Invalid prop `testProp -> key(a)` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );

      typeCheckFail(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          PropTypes.string
        ),
        Immutable.OrderedMap([
          [{a: 1}, 2],
          ['a', 1]
        ]),
        'Invalid prop `testProp -> key([object Object])` of type `object` supplied to `testComponent`, ' +
        'expected `string`.'
      );
    });

    it('should cause inner warning with invalid immutable key in the map', function() {
      typeCheckFail(
        IPropTypes.orderedMapOf(
          PropTypes.any,
          IPropTypes.mapContains({
            a: PropTypes.number.isRequired,
            b: PropTypes.string
          })
        ),
        Immutable.OrderedMap([
          [Immutable.Map({b: '2'}), 1],
          [Immutable.Map({a: 3}), 2]
        ]),
        'Required prop `testProp -> key(Map { "b": "2" }).a` was not specified in `testComponent`.'
      );
    });
  });

  describe('SetOf Type', function() {
    it('should support the setOf propTypes', function() {
      typeCheckPass(IPropTypes.setOf(PropTypes.number), Immutable.Set([1, 2, 3]));
      typeCheckPass(IPropTypes.setOf(PropTypes.string), Immutable.Set(['a', 'b', 'c']));
      typeCheckPass(IPropTypes.setOf(PropTypes.oneOf(['a', 'b'])), Immutable.Set(['a', 'b']));
    });

    it('should support setOf with complex types', function() {
      typeCheckPass(
        IPropTypes.setOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.Set([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.setOf(PropTypes.instanceOf(Thing)),
        Immutable.Set([new Thing(), new Thing() ])
      );
    });

    it('should warn with invalid items in the set', function() {
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number),
        Immutable.Set([1, 2, 'b']),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.setOf(PropTypes.instanceOf(Thing)),
        Immutable.Set([new Thing(), 'xyz' ]),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Set', function() {
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(IPropTypes.setOf(PropTypes.number), Immutable.Set());
      typeCheckPass(IPropTypes.setOf(PropTypes.number), Immutable.Set([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.setOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.setOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.setOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('OrderedSetOf Type', function() {
    it('should support the orderedSetOf propTypes', function() {
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.number), Immutable.OrderedSet([1, 2, 3]));
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.string), Immutable.OrderedSet(['a', 'b', 'c']));
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.oneOf(['a', 'b'])), Immutable.OrderedSet(['a', 'b']));
    });

    it('should support orderedSetOf with complex types', function() {
      typeCheckPass(
        IPropTypes.orderedSetOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.OrderedSet([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        IPropTypes.orderedSetOf(PropTypes.instanceOf(Thing)),
        Immutable.OrderedSet([new Thing(), new Thing() ])
      );
    });

    it('should warn with invalid items in the set', function() {
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        Immutable.OrderedSet([1, 2, 'b']),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.instanceOf(Thing)),
        Immutable.OrderedSet([new Thing(), 'xyz' ]),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.OrderedSet', function() {
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        Immutable.List([1, 2, 3]),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number),
        Immutable.Set([1, 2, 3]),
        'Invalid prop `testProp` of type `Immutable.Set` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.number), Immutable.OrderedSet());
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.number), Immutable.OrderedSet([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.orderedSetOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.orderedSetOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('IterableOf Type', function() {
    it('should support the iterableOf propTypes', function() {
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), Immutable.List([1, 2, 3]));
      typeCheckPass(IPropTypes.iterableOf(PropTypes.string), Immutable.List(['a', 'b', 'c']));
      typeCheckPass(IPropTypes.iterableOf(PropTypes.oneOf(['a', 'b'])), Immutable.List(['a', 'b']));

      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(IPropTypes.iterableOf(PropTypes.string), Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(IPropTypes.iterableOf(PropTypes.oneOf(['a', 'b'])), Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support iterableOf with complex types', function() {
      function Thing() {}

      typeCheckPass(
        IPropTypes.iterableOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        IPropTypes.iterableOf(IPropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        IPropTypes.iterableOf(PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), new Thing()])
      );

      typeCheckPass(
        IPropTypes.iterableOf(PropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        IPropTypes.iterableOf(IPropTypes.shape({a: PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        IPropTypes.iterableOf(PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        Immutable.List([1, 2, 'b']),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );

      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `testProp[2]` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );

      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `testProp[1]` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Iterable', function() {
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn when passing an empty iterable', function() {
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), Immutable.List());
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), Immutable.List([]));
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), null);
      typeCheckPass(IPropTypes.iterableOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.iterableOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('RecordOf Type', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        IPropTypes.recordOf({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        IPropTypes.recordOf({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        IPropTypes.recordOf({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        IPropTypes.recordOf({}),
        Immutable.Map({ a: 1 }),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(IPropTypes.recordOf({}), undefined);
      typeCheckPass(IPropTypes.recordOf({}), null);
    });

    it('should not warn for an empty Record object', function() {
      typeCheckPass(IPropTypes.recordOf({}).isRequired, new (Immutable.Record({}))());
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(IPropTypes.recordOf({}), new (Immutable.Record({key: 1}))());
    });

    it('should not warn for valid types', function() {
      typeCheckPass(IPropTypes.recordOf({key: PropTypes.number}), new (Immutable.Record({key: 1}))());
    });

    it('should ignore null keys', function() {
      typeCheckPass(IPropTypes.recordOf({key: null}), new (Immutable.Record({key: 1}))());
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        IPropTypes.recordOf({key: PropTypes.number.isRequired}),
        new (Immutable.Record({}))(),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        IPropTypes.recordOf({
          key: PropTypes.number.isRequired,
          secondKey: PropTypes.number.isRequired
        }),
        new (Immutable.Record({}))(),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(IPropTypes.recordOf({key: PropTypes.number}),
        new (Immutable.Record({key: 'abc'}))(),
        'Invalid prop `testProp.key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        IPropTypes.recordOf(IPropTypes.recordOf({key: PropTypes.number})), null
      );
      typeCheckPass(
        IPropTypes.recordOf(IPropTypes.recordOf({key: PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.recordOf({key: PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.recordOf({key: PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('Shape Types [deprecated]', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        IPropTypes.shape({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.shape({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.shape({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(IPropTypes.shape({}), undefined);
      typeCheckPass(IPropTypes.shape({}), null);
      typeCheckPass(IPropTypes.shape({}), Immutable.fromJS({}));
    });

    it('should not warn for an empty Immutable object', function() {
      typeCheckPass(IPropTypes.shape({}).isRequired, Immutable.fromJS({}));
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(IPropTypes.shape({}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for valid types', function() {
      typeCheckPass(IPropTypes.shape({key: PropTypes.number}), Immutable.fromJS({key: 1}));
    });

    it('should ignore null keys', function() {
      typeCheckPass(IPropTypes.shape({key: null}), Immutable.fromJS({key: 1}));
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        IPropTypes.shape({key: PropTypes.number.isRequired}),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        IPropTypes.shape({
          key: PropTypes.number.isRequired,
          secondKey: PropTypes.number.isRequired
        }),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(IPropTypes.shape({key: PropTypes.number}),
        Immutable.fromJS({key: 'abc'}),
        'Invalid prop `testProp.key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        IPropTypes.shape(IPropTypes.shape({key: PropTypes.number})), null
      );
      typeCheckPass(
        IPropTypes.shape(IPropTypes.shape({key: PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.shape({key: PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.shape({key: PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should probably not validate a list, but does', function() {
      var shape = {
        0: PropTypes.number.isRequired,
        1: PropTypes.string.isRequired,
        2: PropTypes.string
      };
      typeCheckPass(IPropTypes.shape(shape), Immutable.List([1, '2']));
    });
  });

  describe('Contains Types', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        IPropTypes.contains({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.contains({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        IPropTypes.contains({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(IPropTypes.contains({}), undefined);
      typeCheckPass(IPropTypes.contains({}), null);
      typeCheckPass(IPropTypes.contains({}), Immutable.fromJS({}));
    });

    it('should not warn for an empty Immutable object', function() {
      typeCheckPass(IPropTypes.contains({}).isRequired, Immutable.fromJS({}));
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(IPropTypes.contains({}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for valid types', function() {
      typeCheckPass(IPropTypes.contains({key: PropTypes.number}), Immutable.fromJS({key: 1}));
    });

    it('should ignore null keys', function() {
      typeCheckPass(IPropTypes.contains({key: null}), Immutable.fromJS({key: 1}));
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        IPropTypes.contains({key: PropTypes.number.isRequired}),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        IPropTypes.contains({
          key: PropTypes.number.isRequired,
          secondKey: PropTypes.number.isRequired
        }),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(IPropTypes.contains({key: PropTypes.number}),
        Immutable.fromJS({key: 'abc'}),
        'Invalid prop `testProp.key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        IPropTypes.contains(IPropTypes.contains({key: PropTypes.number})), null
      );
      typeCheckPass(
        IPropTypes.contains(IPropTypes.contains({key: PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.contains({key: PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.contains({key: PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should probably not validate a list, but does', function() {
      var contains = {
        0: PropTypes.number.isRequired,
        1: PropTypes.string.isRequired,
        2: PropTypes.string
      };
      typeCheckPass(IPropTypes.contains(contains), Immutable.List([1, '2']));
    });
  });

  describe('MapContains Types', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        IPropTypes.mapContains({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        IPropTypes.mapContains({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        IPropTypes.mapContains({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(IPropTypes.mapContains({}), undefined);
      typeCheckPass(IPropTypes.mapContains({}), null);
      typeCheckPass(IPropTypes.mapContains({}), Immutable.fromJS({}));
    });

    it('should not warn for an empty Immutable object', function() {
      typeCheckPass(IPropTypes.mapContains({}).isRequired, Immutable.fromJS({}));
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(IPropTypes.mapContains({}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for valid types', function() {
      typeCheckPass(IPropTypes.mapContains({key: PropTypes.number}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for nested valid types', function() {
      typeCheckPass(
        IPropTypes.mapContains({
          data: IPropTypes.listOf(IPropTypes.mapContains({
            id: PropTypes.number.isRequired
          })).isRequired
        }),
        Immutable.fromJS({data: [{id: 1}, {id: 2}]})
      );
    });

    it('should warn for nested invalid types', function() {
      typeCheckFail(
        IPropTypes.mapContains({
          data: IPropTypes.listOf(IPropTypes.mapContains({
            id: PropTypes.number.isRequired
          })).isRequired
        }),
        Immutable.fromJS({data: [{id: 1}, {}]}),
        'Required prop `testProp.data[1].id` was not specified in `testComponent`.'
      );
    });

    it('should ignore null keys', function() {
      typeCheckPass(IPropTypes.mapContains({key: null}), Immutable.fromJS({key: 1}));
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        IPropTypes.mapContains({key: PropTypes.number.isRequired}),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        IPropTypes.mapContains({
          key: PropTypes.number.isRequired,
          secondKey: PropTypes.number.isRequired
        }),
        Immutable.fromJS({}),
        'Required prop `testProp.key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(IPropTypes.mapContains({key: PropTypes.number}),
        Immutable.fromJS({key: 'abc'}),
        'Invalid prop `testProp.key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        IPropTypes.mapContains(IPropTypes.mapContains({key: PropTypes.number})), null
      );
      typeCheckPass(
        IPropTypes.mapContains(IPropTypes.mapContains({key: PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        IPropTypes.mapContains({key: PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        IPropTypes.mapContains({key: PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should not validate a list', function() {
      var contains = {
        0: PropTypes.number.isRequired,
        1: PropTypes.string.isRequired,
        2: PropTypes.string
      };
      typeCheckFail(
        IPropTypes.mapContains(contains),
        Immutable.List([1, '2']),
        'Invalid prop `testProp` of type `Immutable.List` supplied to `testComponent`, expected an Immutable.js Map.'
      );
    });
  });
});
