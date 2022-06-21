import { getById } from './selectors';

const refreshInputFields = (fieldIds: string[]): void => {
  for (const field of fieldIds) {
    const element = getById(field) as HTMLFormElement | null;
    if (element) {
      element.value = '';
    }
  }
};

const fieldToRefresh = ['coClarificationResponses'];

refreshInputFields(fieldToRefresh);
