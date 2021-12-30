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
	
	// opening a new page and navigating to Fotmob
	const page = await browser.newPage(); 	
	await page.goto('https://www.fotmob.com/');
	await page.waitForSelector('body');

	/*
	after pulling up the Fotmob page in Puppeteer, we can use its evaluate() function to interact with the page. 
	With the function, we can execute arbitrary JavaScript in Chrome 
	and use its built-in functions, such as querySelector(), to manipulate the page and retrieve its contents.
	*/
	let grabMatches = await page.evaluate(() => {

		// each League is separated into a e7pc1842 object
		let allLeagues = document.body.querySelectorAll('.e7pc1842');

		// storing the allLeagues items in an array then selecting for retrieving content

		scrapeItems = [];
		allLeagues.forEach(league => {

			// Within the e7pc1842 object, the e7pc1843 object is the header container for the league
			let leagueHeaderContainer = league.querySelector('.e7pc1843');
			// Within the e7pc1843 object, the e7pc1841 object is the title link for the league
			let leagueTitleLink = leagueHeaderContainer.querySelector('.e7pc1841');

			// Within the e7pc1842 object, the ew7iiy60 objects are the match wrappers for the league
			let matchWrappers = league.querySelectorAll('.ew7iiy60');

			matchWrappers.forEach(match => {

				// Within the ew7iiy60 object, the e1o4kpy50 objects are the team names for the match
				let teamNames = match.querySelectorAll('.e1o4kpy50');

				scrapeItems.push({
					League: leagueTitleLink ? leagueTitleLink.innerText : null,
					Match: teamNames ? teamNames[0].innerText + " vs " + teamNames[1].innerText : null
				});

			});
			
		});

		let items = {
		  "Fotmob Matches": scrapeItems,
		};

		return items;
		
	});

	// outputting the scraped data
	console.log(grabMatches);
	
	// close the browser
	await browser.close();
	
})
.catch (function (err) {
	
	// log any errors experienced during the scraping process.
    console.error(err);
	
});