// include the modules used in the project.
const axios = require('axios');
const cheerio = require('cheerio');

// use Axios to make a GET HTTP request to the target web page
axios.get('https://www.forextradingbig.com/instaforex-broker-review/')
.then(response => {

  /*
  when a request is sent to the web page, it returns a response.
  This Axios response object is made up of various components, including data that refers to the payload returned from the server. 
  when a GET request is made, we output the data from the response, which is in HTML format.
  */
  const html = response.data;

  /*
  load the response data into a Cheerio instance.
  This way, we can create a Cheerio object to help us in parsing through the HTML from the target web page 
  and finding the DOM elements for the data we want—just like when using jQuery.
  To uphold the jQuery convention, name the Cheerio object $. 
  */
  const $ = cheerio.load(html);

  /*
  use the Cheerio’s selectors syntax to search the elements containing the data we want
  use the text() method to output the data in a text format.
  */
  const scrapedata = $('a', '.comment-bubble').text();

  // outputting the scraped data
  console.log(scrapedata);    

})
.catch( error => {
  // log any errors experienced during the scraping process.
  console.log(error);
}); 