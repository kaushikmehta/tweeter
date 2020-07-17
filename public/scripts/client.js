/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Adds individual tweets to top of tweet section
const renderTweets = function (tweetData) {
  tweetData.forEach(element => {
    const createdTweet = createTweetElement(element);
    $('#tweets').prepend(createdTweet);
  });
};

// Creates individual tweet element
//calculates how many days ago a tweet was published
// avoids malicious code with the use of htmlEncode helper function
//
const createTweetElement = (tweetData) => {
  const tweetDate = new Date(tweetData.created_at);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(tweetDate);
  const secondDate = new Date();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  let daysAgo = "";
  diffDays === 0 ? daysAgo = "Today" : daysAgo = diffDays + " Day(s) Ago";

  const tweetTemplate = `<article class="individual-tweet">
  <header class="tweet-header">
    <span class="name">
    <img src="${tweetData.user.avatars}" class="avatar"/>
    ${tweetData.user.name}
    </span>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-body">
    ${htmlEncode(tweetData.content.text)}
  </div>
  <footer>
    <div class="time-posted">${daysAgo}</div>
    <div class="footer-icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
  </footer>
</article>`;

  return tweetTemplate;
} // function

//When the document is loaded, calls the server for tweets and renders them
// adds event handler on form submission including validation
// adds jQuery logic for animations based on scroll events
// adds AJAX POST request


$(document).ready(() => {
  const loadTweets = function () {
    $('#tweets').empty();
    $.get("/tweets").then((response) => {
      renderTweets(response);
    })
  };

  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();

    const serialized = $(this).serialize(); // text=
    const textLength = $('#tweet-text').val().length;

    if (textLength === 0) {
      $("#error").text("Your message is empty. All powerful messages have atleast one character");

      $("#error").slideDown("slow", function () {
        // Animation complete.
      });
    } else if (textLength > 140) {
      $("#error").text("Our users have a short attention span. Keep your message under 140 characters so you don't lose them!");

      $("#error").slideDown("slow", function () {
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

  $("#nav-anchor").click(() => {
    if ($("#form").css("display") === 'block') {
      $("#form").slideUp("slow", function () {
        // Animation complete.
      });
    } else {
      $("#form").slideDown("slow", function () {
        // Animation complete.
      });
    }
  });

  $(window).scroll(function () {
    const scrollHandler = $(this).scrollTop();

    if (window.matchMedia('(max-width: 400px)').matches) {

      if (scrollHandler > 50) {
        $('nav').css("background-color", "#FFA69E")
      } else {
        $('nav').css("background-color", "transparent")
      }
    } else if (window.matchMedia('(max-width: 800px)').matches) {
      if (scrollHandler > 400) {
        $('nav').css("background-color", "#FFA69E")
      } else {
        $('nav').css("background-color", "transparent")
      }
    } else {
      $('nav').css("background-color", "#4056A1")
    }

    if (scrollHandler > 50) {
      $('.top-scroller').fadeIn();

    } else {
      $('.top-scroller').fadeOut();
    }
  });

  $(window).resize(function () {
    window.scrollTo(0, 0)
    window.scrollBy(0, 10)
    window.scrollBy(0, -10)
  });

  //Click event to scroll to top
  $('.top-scroller').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
  });


});




// Helper function to clear tweets that appear on page
const clearTweetText = () => {
  const textArea = $('#tweet-text');
  textArea.val("");

  const characterCounters = $('form').find('.counter');
  const characterCounter = characterCounters.text("140");
};

// Helper function to escape malicious messages sent from user
// code for htmlEncode imported from https://portswigger.net/web-security/cross-site-scripting/preventing
function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}
