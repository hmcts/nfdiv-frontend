const { event, output } = require('codeceptjs');

module.exports = () => {
  // CodeceptJS 3.7.9 assigns its exit status before emitting workers.result,
  // but does not include failed hooks when deciding whether the run failed.
  event.dispatcher.on(event.workers.result, result => {
    const failedHooks = result.stats.failedHooks || 0;

    if (failedHooks > 0) {
      output.error(`Failing test run: ${failedHooks} hook failure(s).`);
      if (!process.exitCode) {
        process.exitCode = 1;
      }
    }
  });
};
