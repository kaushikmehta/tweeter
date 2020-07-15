/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweetData) {
  tweetData.forEach(element => {
    const createdTweet = createTweetElement(element);
    $('#tweets').prepend(createdTweet);
  });
};

 const createTweetElement = (tweetData) => {
  const tweetDate = String(new Date(tweetData.created_at)).slice(3,15);

  const tweetTemplate = `<article class="individual-tweet">
  <header class="tweet-header">
    <img src="${tweetData.user.avatars}" class="avatar"/>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-body">
    ${htmlEncode(tweetData.content.text)}
  </div>
  <footer>
    <div class="time-posted">${tweetDate}</div>
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
    $('#tweets').empty();
    $.get("/tweets").then((response) => {
      renderTweets(response);
    })
  };

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();

    const serialized = $(this).serialize(); // text=
    const textLength = $('#tweet-text').val().length;  

    if (textLength === 0) {
      $( "#error" ).text("Your message is empty. All powerful messages have atleast one character");

      $( "#error" ).slideDown( "slow", function() {
        // Animation complete.
      });
    } else if (textLength > 140) {
      $( "#error" ).text("Our users have a short attention span. Keep your message under 140 characters so you don't lose them!");
      
      $( "#error" ).slideDown( "slow", function() {
        // Animation complete.
      });
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serialized
      }).then(response => {
        loadTweets();
        clearTweetText();
      });
    }
  }); // form submit
});

const clearTweetText = () => {
  const textArea = $('#tweet-text');
  textArea.val("");
};

// code for htmlEncode imported from https://portswigger.net/web-security/cross-site-scripting/preventing
function htmlEncode(str){
  return String(str).replace(/[^\w. ]/gi, function(c){
     return '&#'+c.charCodeAt(0)+';';
  });
}
