import assert from 'node:assert/strict';
import test from 'node:test';

import event from 'codeceptjs/lib/event';
import { Given, clearSteps } from 'codeceptjs/lib/mocha/bdd';
import recorder from 'codeceptjs/lib/recorder';

import { restoreListeners } from '../../run-parallel/tests/unit-test-support.mjs';

import { runBeforeHookSteps } from '../before-hook-steps.mjs';

const setup = context => {
  clearSteps();
  context.after(clearSteps);
  restoreListeners(context, event.dispatcher);
  context.mock.method(recorder, 'promise', () => Promise.resolve());
  const events = [];
  for (const name of Object.values(event.bddStep)) {
    event.dispatcher.on(name, value => events.push([name, value]));
  }
  return events;
};

test('runs registered steps in order with parsed parameters and BDD lifecycle events', async context => {
  const events = setup(context);
  const calls = [];
  const first = value => calls.push(value);
  await Given('a number {int}', first);
  await Given('another step', () => calls.push('next'));
  const steps = [
    { keyword: 'Given ', text: 'a number 42' },
    { keyword: 'And ', text: 'another step' },
  ];

  await runBeforeHookSteps(steps);

  assert.deepEqual(calls, [42, 'next']);
  assert.deepEqual(
    events.map(([name]) => name),
    [
      event.bddStep.before,
      event.bddStep.started,
      event.bddStep.finished,
      event.bddStep.after,
      event.bddStep.before,
      event.bddStep.started,
      event.bddStep.finished,
      event.bddStep.after,
    ]
  );
  const step = events[0][1];
  const meta = events[1][1];
  assert.notEqual(step, steps[0]);
  assert.equal(step.match, first.line);
  assert.equal(step.status, 'passed');
  assert.ok(step.endTime >= step.startTime);
  assert.equal(meta.actor, 'Given');
  assert.equal(events[2][1], meta);
  assert.deepEqual(first.params, [42]);
  assert.equal(steps[0].status, undefined);
  assert.equal(event.dispatcher.listenerCount(event.step.before), 0);
});

test('passes data tables and doc strings without mutating the Gherkin arguments', async context => {
  const events = setup(context);
  const table = {
    rows: [
      ['name', 'value'],
      ['item', '123'],
    ].map(values => ({ cells: values.map(value => ({ value })) })),
  };
  const original = structuredClone(table);
  let argument;
  await Given('a table', value => {
    argument = value;
  });
  let document;
  await Given('a document', value => {
    document = value;
  });
  await runBeforeHookSteps([
    { keyword: 'Given ', text: 'a table', dataTable: table },
    { keyword: 'And ', text: 'a document', docString: { content: 'some text' } },
  ]);
  assert.deepEqual(argument.parse().hashes(), [{ name: 'item', value: '123' }]);
  assert.notEqual(argument, table);
  assert.deepEqual(table, original);
  assert.equal(document, 'some text');
  assert.match(events[1][1].comment, /name\s+\| value/);
  assert.equal(events[5][1].comment, '\n"""\nsome text\n"""');
});

test('attaches Before hook metadata to nested helper steps before other listeners run', async context => {
  const events = setup(context);
  const leaf = {};
  const helper = { metaStep: leaf };
  const observed = [];
  event.dispatcher.on(event.step.before, () => observed.push(leaf.metaStep));
  await Given('a helper', () => {
    event.dispatcher.emit(event.step.before, helper);
    event.dispatcher.emit(event.step.before, helper);
  });
  await runBeforeHookSteps([{ keyword: 'Given ', text: 'a helper' }]);
  assert.equal(helper.metaStep, leaf);
  assert.deepEqual(observed, [events[1][1], events[1][1]]);
  assert.equal(leaf.metaStep.metaStep, undefined);
  assert.equal(event.dispatcher.listenerCount(event.step.before), 1);
});

test('waits for queued helpers before running the next definition', async context => {
  setup(context);
  let release;
  const pending = new Promise(resolve => {
    release = resolve;
  });
  context.mock.method(recorder, 'promise', () => pending);
  const calls = [];
  await Given('first step', () => calls.push('first'));
  await Given('second step', () => calls.push('second'));
  const run = runBeforeHookSteps([
    { keyword: 'Given ', text: 'first step' },
    { keyword: 'And ', text: 'second step' },
  ]);
  await Promise.resolve();
  assert.deepEqual(calls, ['first']);
  release();
  await run;
  assert.deepEqual(calls, ['first', 'second']);
});

for (const queued of [false, true]) {
  test(`propagates ${queued ? 'queued helper' : 'definition'} failures and removes its metadata listener`, async context => {
    const events = setup(context);
    const failure = new Error('step failed');
    const later = context.mock.fn();
    await Given('a failed step', () => {
      if (!queued) {
        throw failure;
      }
    });
    await Given('a later step', later);
    if (queued) {
      context.mock.method(recorder, 'promise', () => Promise.reject(failure));
    }
    await assert.rejects(
      runBeforeHookSteps([
        { keyword: 'Given ', text: 'a failed step' },
        { keyword: 'And ', text: 'a later step' },
      ]),
      error => error === failure
    );
    assert.deepEqual(
      events.map(([name]) => name),
      [event.bddStep.before, event.bddStep.started]
    );
    assert.equal(events[0][1].status, 'failed');
    assert.equal(events[0][1].err, failure);
    assert.ok(events[0][1].endTime >= events[0][1].startTime);
    assert.equal(later.mock.callCount(), 0);
    assert.equal(event.dispatcher.listenerCount(event.step.before), 0);
  });
}

test('rejects undefined steps without registering helper listeners', async context => {
  const events = setup(context);
  await assert.rejects(runBeforeHookSteps([{ keyword: 'Given ', text: 'an undefined step' }]), /No steps matching/);
  assert.deepEqual(events, []);
  assert.equal(event.dispatcher.listenerCount(event.step.before), 0);
});
