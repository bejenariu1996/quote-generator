const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://icanhazdadjoke.com/';
  try {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => (apiQuotes = result.joke))
      .catch((error) => console.log('error', error));
    console.log(apiQuotes);
    newQuote();
  } catch (error) {
    console.log('ERROR! ', error);
  }
}

// show new quote
function newQuote() {
  loading();
  // check quote length to determine styling
  if (apiQuotes.length > 60) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // set quote, hide loader
  quoteText.textContent = apiQuotes;
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}&hashtags=dadjokes,dadquotes`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
