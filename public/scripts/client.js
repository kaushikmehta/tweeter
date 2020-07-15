/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function (tweetData) {
  const temp = $('#tweets');
  console.log(temp);

  tweetData.forEach(element => {
    console.log(element);
    const createdTweet = createTweetElement(element);
    $('#tweets').append(createdTweet);
  });
};

 const createTweetElement = (tweetData) => {

  const tweetTemplate = `<article class="individual-tweet">
  <header class="tweet-header">
    <img src="${tweetData.user.avatars}" class="avatar"/>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-body">
    ${tweetData.content.text}
  </div>
  <footer>
    <div class="time-posted">${tweetData.created_at}</div>
    <div class="footer-icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>
</article>`;
 
  return tweetTemplate;
} // function

$(document).ready( () => {
  renderTweets(tweets);
})