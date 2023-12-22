const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const preQuoteBtn =document.getElementById('previous-quote');
// let apiQuotes =[];
// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
  
  // Remove Loading Spinner
  function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
//   generate new quote 
function newQuote (){
    loading();
    const a = Math.random()* localQuotes.length;
    var quote= localQuotes[Math.floor(a)];
    localStorage.setItem("previousQuote", JSON.stringify(quote));

    if (!quote.author) {
        authorText.textContent='Vishal Sharma';
    }
    else{
        authorText.textContent = quote.author;
    }
    if (quote.text.length>80) {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
complete();

}
// generate new quote by api 
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();  
        newQuote();
    } catch (error) {
            }
            complete();
}
getQuotes();


// for tweet the quote 
function tweetQuote() {
    const twitterUrl=`https://twitter.com/intent/tweet?text=${
        quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl,'_blank')
    
}
// code for copy content
let copy = document.querySelector("#copy");

function copyToClickBoard(){
    var content = quoteText.innerHTML;

    navigator.clipboard.writeText(content)
        .then(() => {
        alert("advice copied successfully")
    })
        .catch(err => {
        console.log('Something went wrong', err);
    })
 
}

copy.addEventListener("click", copyToClickBoard);
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

newQuote();