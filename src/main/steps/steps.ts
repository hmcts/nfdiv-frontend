
export const Steps: Steps = {
  HOME: '/',
  FIRST_PAGE: '/first-page',
  SECOND_PAGE: 'second-page'
};

type Steps = Record<string, URLString>;
type URLString = `/${string}`;
