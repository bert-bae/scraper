# Scraper

The web scraping tool using the existing web scraping tools available on the web today. It allows you to create easy to configure YAML configuration files to pinpoint the data you want to pull from a HTML page into your custom object structures.

Scraper operates using `Crawler` with `Cheerio` built in.

- Crawler documentation: [https://www.npmjs.com/package/crawler](https://www.npmjs.com/package/crawler)
- Cheerio documentation: [https://www.npmjs.com/package/cheerio](https://www.npmjs.com/package/cheerio)

# Running the Program

Create a `.yaml/.yml` configuration file to run the program (details below).

Run `npm i` to install the dependencies. You also need to have `ts-node` installed globally with `npm i -g ts-node`.
Run the program with `npm run scrape`.

# Configuration

The YAML/YML configuration file to operate the tool should be located in the `/config/*` path. The command will find every file in that folder with the extensions for `.yml` and `.yaml`. The configuration file is set in `.yml/.yaml` to make it easy to set up.

### Settings

`Global`: The settings here will be applied to all resources listed.

- `BaseUrl`: Root URL of the site you want to run the scraper on
- `Options`: Global options to apply to `Crawler`. View the Crawler documentation for available options

`Resources`: Array of resources which will translate to a separate JSON file output. Each object key will be the name of the resouce and the name of the JSON output file.

- `Url`: This can be a string value representing the URL of the website you want to scrape. By default it is `false`.
- `Path`: To use the `path` property, you need the `Global.BaseUrl` set in the configuration file. This property represents the query parameters of the site. It is specifically useful if you need to scrape the same base url, but with different endpoints and different query strings.
- `Output`: Default is `false`. If it is `false`, the output file will not be written and the terminal will only log the result. If it is true, the result will be written to `/output/{ResourceName}.json`
- `Options`: Specific options to apply to `Crawler`. View the Crawler documentation for available options. If `Global.Options` is set, this will overwrite those options.
- `Instructions`: An array of instructions to scrape and output.
  - `Selector`: The text selector that is available with `Cheerio`. For more details, view the Cheerio documentation. If you are familiar with jQuery, it is a similar concept.
  - `Output`: The object key property you want the result to be associated with.
  - `Operation`: This represents the `Cheerio` operations available. Most common are `html` and `text`. File downloads are not yet supported.
    - Operation can also be an array representing a subset of `Instructions` with the same properties. Use case will be for nested object results. For a visual example, view the examples below.

Example HTML:

```
<html>
<body>
  <div class="person-container">
    <p class="name">Baeritto</p>
    <p class="age">28</p>
    <div class="vote-container">
      <p class="likes">10</p>
      <p class="dislikes">2</p>
    </div>
  </div>

  <div class="person-container">
    <p class="name">Toastalicious</p>
    <p class="age">27</p>
    <div class="vote-container">
      <p class="likes">300123</p>
      <p class="dislikes">17</p>
    </div>
  </div>

  <div class="person-container">
    <p class="name">Crazy Stew</p>
    <p class="age">27</p>
    <div class="vote-container">
      <p class="likes">20</p>
      <p class="dislikes">2</p>
    </div>
  </div>

  <div class="person-container">
    <p class="name">Beast Andrew</p>
    <p class="age">30</p>
    <div class="vote-container">
      <p class="likes">120</p>
      <p class="dislikes">5</p>
    </div>
  </div>
</body>
```

Example YAML:

```
Global:
  BaseUrl: 'https://www.baseUrl.ca'
  Options: # CrawlerIO options go here... https://www.npmjs.com/package/crawler

# Local options will always overwrite global options if two of the same values exist
Resources:
  ExampleSource:
    Url: false
    Path: /
    Output: true
    Options: # CrawlerIO options go here... https://www.npmjs.com/package/crawler
    Instructions:
      - Selector: 'div.person-container'
        Output: 'person'
        Operation:
          - Selector: '.name'
            Output: 'name'
            Operation: 'text'
          - Selector: '.age'
            Output: 'age'
            Operation: 'text'
          - Selector: '.vote-container'
            Output: 'votes'
            Operation: 'text'
            - Selector: '.likes'
              Output: 'likes'
              Operation: 'text'
            - Selector: '.dislikes'
              Output: 'dislikes'
              Operation: 'text'
```

Example Result:

```
{
  person: [
    {
      name: 'Baeritto',
      age: '28',
      votes: {
        likes: '10',
        dislikes: '2',
      },
    },
    {
      name: 'Toastalicious',
      age: '27',
      votes: {
        likes: '300123',
        dislikes: '17',
      },
    },
    {
      name: 'Crazy Stew',
      age: '27',
      votes: {
        likes: '20',
        dislikes: '2',
      },
    },
    {
      name: 'Beast Andrew',
      age: '30',
      votes: {
        likes: '120',
        dislikes: '5',
      },
    },
  ];
}
```

# Current Restrictions

Single Page Applications created using frameworks such as `React`, `Angular`, and `Vue` cannot yet be scraped. This only works with sites with serverloaded HTML. Sites that are loaded using serverside rendering such as `NextJS` should still work.

Future TODO in consideration:

- Implement Puppeteer to enable scraping Single Page Application websites
- Implement the ability to download files
