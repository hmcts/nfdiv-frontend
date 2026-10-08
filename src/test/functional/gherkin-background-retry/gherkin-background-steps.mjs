import DataTableArgument from 'codeceptjs/lib/data/dataTableArgument';
import event from 'codeceptjs/lib/event';
import { matchStep } from 'codeceptjs/lib/mocha/bdd';
import recorder from 'codeceptjs/lib/recorder';
import MetaStep from 'codeceptjs/lib/step/meta';

// Background callbacks are closed over inside CodeceptJS's built-in retry
// wrapper. Execute the registered steps locally so intermediate failures never
// enter that wrapper's final-failure handling.
export const runBackgroundSteps = async steps => {
  for (const source of steps) {
    const step = { ...source };
    const metaStep = new MetaStep(null, step.text);
    metaStep.actor = step.keyword.trim();
    const attachMetaStep = helperStep => {
      if (helperStep.metaStep === metaStep) {
        return;
      }
      if (helperStep.metaStep) {
        attachMetaStep(helperStep.metaStep);
      } else {
        helperStep.metaStep = metaStep;
      }
    };
    const fn = matchStep(step.text);
    const parameters = [...fn.params];
    if (step.dataTable) {
      parameters.push({ ...step.dataTable, parse: () => new DataTableArgument(step.dataTable) });
      metaStep.comment = `\n${step.dataTable.rows.map(row => row.cells.map(cell => cell.value.padEnd(15)).join(' | ')).join('\n')}\n`;
    }
    if (step.docString) {
      parameters.push(step.docString.content);
      metaStep.comment = `\n"""\n${step.docString.content}\n"""`;
    }
    step.startTime = Date.now();
    step.match = fn.line;
    event.emit(event.bddStep.before, step);
    event.emit(event.bddStep.started, metaStep);
    event.dispatcher.prependListener(event.step.before, attachMetaStep);
    try {
      await fn(...parameters);
      // Some definitions enqueue helper calls without returning their promises.
      await recorder.promise();
      step.status = 'passed';
    } catch (error) {
      step.status = 'failed';
      step.err = error;
      throw error;
    } finally {
      step.endTime = Date.now();
      event.dispatcher.removeListener(event.step.before, attachMetaStep);
    }
    event.emit(event.bddStep.finished, metaStep);
    event.emit(event.bddStep.after, step);
  }
};
