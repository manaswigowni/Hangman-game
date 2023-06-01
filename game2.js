var letterDiv = document.querySelector('.letter-div');
var hintButton = document.querySelector('.hint-btn');
var resetButton = document.querySelector('.reset-btn');
var hintDiv = document.querySelector('.hint-div');
var hintText = document.querySelector('.hint-txt');
var liveSpan = document.querySelector('.lives');
var wordDiv = document.querySelector('.word-div');
var notif = document.querySelector('.notif');
var notifContent = document.querySelector('.notif-content');
var notifSpan = document.querySelector('.notif-span');
var playAgain = document.querySelector('.notif-btn');

let letters;

let lives;
//words list along with the hints
var words = new Map([
  ['mango', 'a fruit'],
  ['carrot', 'a vegetable'],
  ['india', 'a country'],
]);
//seperating keys of words array into array called wor_list
var word_list = [...words.keys()];

// getting random word from the word list
function getRandomWord(list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

let select_word;
//init is for initializing game state and setting initial conditions
var init = function (state) {
  wordDiv.innerHTML = '';
  if (state === 'start')
   {
    // generating buttons for all elements at the start of the game
    for (var i of 'abcdefghijklmnopqrstuvwxyz')
     {
        var button = document.createElement("button");
        button.className = "alpha";
        button.textContent = i.toUpperCase();
        var ins = button.outerHTML;
        //inserting all the buttons in letterdiv section in html at position
        //beforeend and the markup to be inserted is present in ins
        letterDiv.insertAdjacentHTML('beforeend', ins);
    }
   } 
   //resetting the page to initial conditions that is removing disable from buttons
   //adding hidden for hint and notification
  else if (state === 'reset') 
  {
        var buttons = document.querySelectorAll('.alpha');
        for (var i = 0; i < buttons.length; i++) 
        {
          var btn = buttons[i];
          btn.classList.remove('disabled');
        }
        hintDiv.classList.add('hidden');
        notif.classList.add('hidden');
      
  }
  select_word = getRandomWord(word_list);
  lives = 5;
 //letters have all letters
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  // putting selected word
  for (var i = 0; i < select_word.length; i++)
   {
    var html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};
// initializing the page
init('start');

// show notification
var showNotif = function (msg) {
    notif.classList.remove('hidden');
    notifSpan.textContent = select_word;
    notifContent.textContent = 'You ' + msg;
    // lives = 3;
  };

// decreasing life when wrong letter
const decreaseLife = function ()
 {
  lives--;
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
var getindexes = function (letter) {
    var indexes = [];
    var selectWordArray = Array.from(select_word);
    selectWordArray.forEach(function (val, i) {
      if (val === letter) {
        var index = i;
        indexes.push(index);
      }
    });
    return indexes;
  };
  
// checking if we g0t thecomplete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

// letters event listener function
var letterPress = function () {
    var letter = this.textContent.toLowerCase();
  
    if (select_word.includes(letter)) {
      var indexes_list = getindexes(letter);
      indexes_list.forEach(function (val, i) {
        wordDiv.children[val].textContent = this.textContent;
      }, this);
      if (checkWord()) showNotif('won');
    } else {
      decreaseLife();
    }
    this.classList.add('disabled');
  };
  
// listening to letter buttons presses
for (var i = 0; i < letters.length; i++) {
    var btn = letters[i];
    btn.addEventListener('click', letterPress);
  }
  
// Listening to hint btn
hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset');
});

// listening to play again button
playAgain.addEventListener('click', function () {
  init('reset');
});

