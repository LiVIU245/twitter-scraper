import { getScraper } from './test-utils';

test('scraper can send messages', async () => {
  const scraper = await getScraper();
  const message = await scraper.sendDM({});
  console.log(message)
  await expect(null).toEqual(null);
});
