import path from 'path';

const runtimeStepsBaseDir = path.resolve(process.cwd(), 'src/main/steps');

export const getStepTemplatePath = (stepPath: string, templateName: string): string => {
  return path.resolve(runtimeStepsBaseDir, stepPath, templateName);
};
