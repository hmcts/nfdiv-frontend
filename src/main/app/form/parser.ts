export type Parser = (property: string, body: Record<string, unknown>) => void;

export const covertToDateObject: Parser = (property, body) => {
  const dateObject = ['day', 'month', 'year'].reduce((newDateObj: string | Record<string, string>, date: string) => {
    const propertyName = `${property}-${date}`;
    newDateObj[date] = body[propertyName];
    delete body[propertyName];
    return newDateObj;
  }, {});
  body[property] = dateObject;
};
