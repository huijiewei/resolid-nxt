// noinspection PointlessBooleanExpressionJS,ConstantConditionalExpressionJS

import { cx } from './index';
import { describe, expect, test } from 'vitest';
describe('utils/dom', () => {
  test('undefined', () => {
    expect(cx()).toBe('');
    expect(cx(undefined)).toBe('');
    expect(cx(undefined, 'foo')).toBe('foo');
  });

  test('null', () => {
    expect(cx(null)).toBe('');
    expect(cx(null, 'foo')).toBe('foo');
  });

  test('string', () => {
    expect(cx('')).toBe('');
    expect(cx('foo')).toBe('foo');
    expect(cx('foo bar')).toBe('foo bar');
    expect(cx('foo', 'bar')).toBe('foo bar');
    expect(cx('foo bar', 'foo2 bar2')).toBe('foo bar foo2 bar2');
    expect(cx('foo', '', 'bar')).toBe('foo bar');
  });

  test('boolean', () => {
    expect(cx(true)).toBe('');
    expect(cx(false)).toBe('');

    expect(cx(true && 'foo')).toBe('foo');
    expect(cx(false && 'foo')).toBe('');

    expect(cx('foo', true && 'bar')).toBe('foo bar');
    expect(cx('foo', false && 'bar')).toBe('foo');

    // eslint-disable-next-line no-constant-condition
    expect(cx(true ? 'foo' : 'bar')).toBe('foo');
    // eslint-disable-next-line no-constant-condition
    expect(cx(false ? 'foo' : 'bar')).toBe('bar');

    // eslint-disable-next-line no-constant-condition
    expect(cx('foo', true ? 'bar1' : 'bar2')).toBe('foo bar1');
    // eslint-disable-next-line no-constant-condition
    expect(cx('foo', false ? 'bar1' : 'bar2')).toBe('foo bar2');

    expect(cx('0')).toBe('0');
    expect(cx('7')).toBe('7');
  });

  test('number', () => {
    // @ts-expect-error Testing outside of types
    expect(cx(0)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(7)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(-7)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(-0)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(1_000_000)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(1.5)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(333e9)).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(Infinity)).toBe('');
  });

  test('object', () => {
    // @ts-expect-error Testing outside of types
    expect(cx({})).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx({ foo: 'bar' })).toBe('');
  });

  test('array', () => {
    expect(cx(...['foo', 'bar'])).toBe('foo bar');
    // @ts-expect-error Testing outside of types
    expect(cx([])).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(['foo'])).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx([[['foo']]])).toBe('');
  });

  test('function', () => {
    // @ts-expect-error Testing outside of types
    expect(cx(() => '')).toBe('');
    // @ts-expect-error Testing outside of types
    expect(cx(() => 'foo')).toBe('');
  });
});
