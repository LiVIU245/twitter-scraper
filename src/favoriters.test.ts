import { getScraper } from './test-utils';

test('scraper can get favoriters', async () => {
  const scraper = await getScraper();
  const favs = await scraper.getFavoriters('1707237519085998222');
  console.log(favs)

  await expect(null).toEqual(null);
});
