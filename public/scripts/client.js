/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweetData) {
  // console.log("called renderTweets with below");
  // console.log(tweetData);
  tweetData.forEach(element => {
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
  const loadTweets = function () {
    $.ajax({
      url:"/tweets",
      method: "GET"
    }).then((response) => {
      renderTweets(response);
    })
  };

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();
    const serialized = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serialized
    }).then(response => {
      alert("Your tweet is on it's way to tweetHQ. Keep a lookout it'll be displayed here soon!")
    });
  }); // form submit
});

