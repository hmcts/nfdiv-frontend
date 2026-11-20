import { StatusCodes } from 'http-status-codes';

const common = {
  en: {
    info: 'This could be because you’ve followed a broken or outdated link, or because there’s an error on our site.',
    youCan: 'You can either:',
    goBack: 'go back to the previous page',
    signInAgain: 'sign in again',
  },
  cy: {
    info: 'Efallai eich bod wedi defnyddio dolen nad yw’n gweithio neu hen ddolen, neu bod yna nam ar ein safle.',
    youCan: 'Gallwch:',
    goBack: 'fynd yn ôl i’r dudalen flaenorol',
    signInAgain: 'mewngofnodi eto',
  },
};

const en = {
  [StatusCodes.BAD_REQUEST]: {
    ...common.en,
    title: 'Bad request',
    titleId: 'badRequestTitle',
  },
  [StatusCodes.NOT_FOUND]: {
    ...common.en,
    title: 'Page not found',
    titleId: 'pageNotFoundTitle',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    ...common.en,
    title: 'Sorry, we’re having technical problems',
    titleId: 'internalServerErrorTitle',
    info: 'Please try again in a few minutes',
  },
};

const cy: typeof en = {
  [StatusCodes.BAD_REQUEST]: {
    ...common.cy,
    title: 'Cais gwael',
    titleId: 'badRequestTitle',
  },
  [StatusCodes.NOT_FOUND]: {
    ...common.cy,
    title: 'Ni ellir dod o hyd i’r dudalen',
    titleId: 'pageNotFoundTitle',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    ...common.cy,
    title: 'Yn anffodus, rydym yn cael problemau technegol',
    titleId: 'internalServerErrorTitle',
    info: 'Rhowch gynnig arall arni ymhen ychydig funudau',
  },
};

export const errorContent = { en, cy };
