import { StatusCodes } from 'http-status-codes';

const en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Bad request',
    info: 'This could be because you’ve followed a broken or outdated link, or because there’s an error on our site.',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Page not found',
    info: 'This could be because you’ve followed a broken or outdated link, or because there’s an error on our site.',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Sorry, we’re having technical problems',
    info: 'Please try again in a few minutes'
  }
};

const cy: typeof en = {
  [StatusCodes.BAD_REQUEST]: {
    title: 'Cais gwael',
    info: 'Efallai eich bod wedi defnyddio dolen nad yw’n gweithio neu hen ddolen, neu bod yna nam ar ein safle.',
  },
  [StatusCodes.NOT_FOUND]: {
    title: 'Ni ellir dod o hyd i’r dudalen',
    info: 'Efallai eich bod wedi defnyddio dolen nad yw’n gweithio neu hen ddolen, neu bod yna nam ar ein safle.',
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    title: 'Yn anffodus, rydym yn cael problemau technegol',
    info: 'Rhowch gynnig arall arni ymhen ychydig funudau'
  }
};

export const errorContent = { en, cy };
