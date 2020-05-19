const Crawler = require('crawler');

const c = new Crawler({
  rateLimit: 1000,
  maxConnections: 10,
});

const queueList = [];

c.queue([
  {
    // uri: 'https://star-crawl.bertcode.com',
    uri: 'http://bcliquorstores.com/product-catalogue?sort=name.raw:asc&page=1',
    callback: (err: object, res: any, done: any) => {
      if (err) {
        //
      } else {
        const $ = res.$;
        console.log($('body').html());
      }
    },
  },
]);
