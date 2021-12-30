// include the packages used in the file.
const request = require('request');
const cheerio = require('cheerio');

/*
 * use the request function to make http requests and grab a list of IP addresses 
 * and their corresponding port numbers from the sslproxies website
 */
let ip_addresses = [];
let port_numbers = [];

/*
 * In the first parameter of the function, we specified the URL of the website we want to grab its contents
 * In the second parameter, we specified a callback function and its associated arguments
 */
request("https://sslproxies.org/", function (error, response, html) {

    // If there are no errors and the request is successful, we used Cheerio to the load the HTML we received from the response
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        /*
         * Since the details of IP addresses and port numbers we need to scrape 
         * are present within the HTML <td> tags on the sslproxies website, 
         * we used Cheerio’s selectors to find the data in the first column and the second column, respectively.
         * used the .each method to iterate over the generated Cheerio object 
         * and execute a callback function for every selected element. 
         * Notice that we used the .text method to write the grabbed data into arrays.
         */
        $("td:nth-child(1)").each(function (index, value) {
            ip_addresses[index] = $(this).text();
        });

        $("td:nth-child(2)").each(function (index, value) {
            port_numbers[index] = $(this).text();
        });
    }
    else
    {
        console.log("Error loading proxy, please try again");
    }

    ip_addresses.join(", ");
    port_numbers.join(", ");

    console.log("IP Addresses:", ip_addresses);
    console.log("Port Numbers:", port_numbers);

});