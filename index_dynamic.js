// import Puppeteer into our project.
const puppeteer = require('puppeteer');

// launching an instance of the Chrome browser to use for accessing the target webpage.
puppeteer.launch()

/*
create a new page in the headless browser.
Since we’ve used the await expression, we’ll wait for the new page to be opened before saving it to the page variable. 
Next, after creating the page, we’ll use it for navigating to the Reddit page.
Again, since we’ve used await, our code execution will pause until the page is loaded or an error is thrown. 
We’ll also wait for the page’s body tag to be loaded before proceeding with the rest of the execution. 
*/
.then (async browser => {
	
	// opening a new page and navigating to Reddit
	const page = await browser.newPage (); 	
	await page.goto ('https://www.reddit.com/r/scraping/'); 	
	await page.waitForSelector ('body');
	
	/*
	after pulling up the Reddit page in Puppeteer, we can use its evaluate() function to interact with the page. 
	With the function, we can execute arbitrary JavaScript in Chrome 
	and use its built-in functions, such as querySelector(), to manipulate the page and retrieve its contents.
	*/
	let grabPosts = await page.evaluate(() => {

		let allPosts = document.body.querySelectorAll('.Post');

		// storing the post items in an array then selecting for retrieving content

		scrapeItems = [];
		allPosts.forEach(item => {
			
			let postTitle = item.querySelector('h3');
			let postDescription = item.querySelector('p');

			scrapeItems.push({
			  postTitle: postTitle ? postTitle.innerText : null,
			  postDescription: postDescription ? postDescription.innerText : null,
			});
			
		});

		let items = {
		  "redditPosts": scrapeItems,
		};

		return items;
		
	});
	
	// outputting the scraped data
    console.log(grabPosts);
	
	// close the browser
	await browser.close ();
	
});
// .catch (function (err) {
	
	// // log any errors experienced during the scraping process.
    // console.error (err);
	
// });