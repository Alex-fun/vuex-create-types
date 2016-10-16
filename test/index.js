import test from 'ava';
import createTypes from '../index.js';

test('will throw an error when no arguments are passed', t => {
  t.throws(() => createTypes())
})

test('will throw an error when a no-string arguments are passed', t => {
  t.throws(() => createTypes({}));
})

test('will throw an error when the type has already been defined', t => {
  t.throws(() => createTypes('test', 'test'));
})

test('will throw an error when setting type value outside', t => {
  t.throws(() => {
    let types = createTypes('test');
    types.test = 'hello';
  })
})

test('will throw an error when the action type is invalided', t => {
  t.throws(() => {
    let types = createTypes('test');
    console.log(types.hello);
  })
})

test('will return an object containing the type as key and value', t => {
  t.plan(2);
  let types = createTypes('Ok', 'No');
  t.deepEqual(types, {'Ok': 'Ok', 'No': 'No'});
  t.is(types.No, 'No');
})
