import path from 'path';

const isTestRuntime = process.env.NODE_ENV === 'test' || Boolean(process.env.JEST_WORKER_ID);
const runtimeStepsBaseDir = isTestRuntime
  ? path.resolve(process.cwd(), 'src/main/steps')
  : path.resolve(process.cwd(), 'src/main/main/steps');

export const getStepTemplatePath = (stepPath: string, templateName: string): string => {
  return path.resolve(runtimeStepsBaseDir, stepPath, templateName);
};
