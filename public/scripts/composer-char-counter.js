// Counts number of characters 

$(document).ready(function() {

  const textArea = $('#tweet-text');
  const characterCounter = $('form').find('.counter');

  const baseCharacters = 140;

  textArea.on('keyup', function(event){
    textAreaAdjust(this);
    const textLength = textArea.val().length;
    const newCharacterLength = baseCharacters - textLength;
    characterCounter.text(newCharacterLength);

    if (newCharacterLength < 0) {
      characterCounter.addClass('red');
    } else {
      characterCounter.removeClass('red');
    }

    //hides validation errors when users starts typing again
    if ($( "#error" ).css("display") === 'block'){
      $( "#error" ).slideUp( "slow", function() {
        // Animation complete.
      });
    }

  });

});

// Helper function that recalculates height based on length of textarea
function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}
