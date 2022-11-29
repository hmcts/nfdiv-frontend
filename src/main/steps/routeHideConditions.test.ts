import { routeHideConditions } from './routeHideConditions';
import { PageLink } from './urls';

describe('hideRouteFromUser', () => {
  test('URLs should only be associated with one condition each', () => {
    const allUrls: PageLink[] = routeHideConditions.map(i => i.urls).flat();
    expect(new Set(allUrls).size).toEqual(allUrls.length);
  });
});
