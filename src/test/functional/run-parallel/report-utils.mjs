export const xmlEscape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const xmlUnescape = value =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');

export const featureReportDirectoryName = featureFile =>
  featureFile
    .split(/[\\/]/)
    .at(-1)
    .replace(/\.feature$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');

export const scenarioKey = (featureName, scenarioName) => `${featureName}\u0000${scenarioName}`;
