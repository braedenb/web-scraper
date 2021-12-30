// include the packages used in the file.
const request = require('request');
const cheerio = require('cheerio');

function proxyGenerator() {

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
        else {
            console.log("Error loading proxy, please try again");
        }

        ip_addresses.join(", ");
        port_numbers.join(", ");

        //console.log("IP Addresses:", ip_addresses);
        //console.log("Port Numbers:", port_numbers);

        /*
         * generate a random number between 1 and 100 that we’ll use for referencing the index number of the arrays 
         * and retrieving a random IP address from the list. 
         * This way, we’ll ensure that we use a different proxy for each request.
         */
        let random_number = Math.floor(Math.random() * 100);
        //console.log(random_number);

        // see if we can get a random IP address and its corresponding port number
        //console.log(ip_addresses[random_number]);
        //console.log(port_numbers[random_number]);

        /*
         * join the retrieved IP address and port number into the required format.
         * To achieve this, we’ll use ES6 template literals to interpolate the variables into a single string.
         * NOTE: JavaScript template literals require backticks, not straight quotation marks.
         * You need to use backticks (otherwise known as "grave accents" - 
         * which you'll find next to the 1 key if you're using a QWERTY keyboard) - 
         * rather than single quotes - to create a template literal.
         */
        let proxy = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
        console.log(proxy);

    });

}