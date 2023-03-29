document.querySelector(".play-now").addEventListener("click", function(){
  console.log("play now is pressed by the user !")
  document.querySelector(".glass").classList.remove("visible");
  // window.scrollTo(0,720);
} , {once:true}); 

document.querySelector(".internal-link").addEventListener("click",function(){
    document.querySelector(".glass").classList.add("visible");
} , {once:true});

document.querySelector(".flip-card-button").addEventListener("click",function(){
    setTimeout(function(){
      document.querySelector(".glass-1").classList.add("flipped");
    },250);
    document.querySelector(".animation-1").classList.add("display-none");
    // document.querySelector(".-card").classList.add("display-none");
    document.querySelector(".reveal-card").innerHTML = "Magic !";
    var fileLocation = "images/cards/" + cardGeneratedArray[10] + ".jpg";
    setImage(".card-reveal-image",fileLocation);
    document.querySelector(".card-reveal-image").classList.remove("visible");
});

var cardsNme = ["2C","2D","2H","2S",
                "3C","3D","3H","3S",
                "4C","4D","4H","4S",
                "5C","5D","5H","5S",
                "6C","6D","6H","6S",
                "7C","7D","7H","7S",
                "8C","8D","8H","8S",
                "9C","9D","9H","9S",
                "10C","10D","10H","10S",
                "JC","JD","JH","JS",
                "QC","QD","QH","QS",
                "KC","KD","KH","KS",
                "AC","AD","AH","AS"];

var cardGeneratedArray = [];

function randomNumber(num1,num2){
  return Math.floor(Math.random() * (num2 - num1) + num1);
}

var numberGeneratedSize = 0
var randomNumberGenerated = new Set();

while(randomNumberGenerated.size != 21){
  var newNumber = randomNumber(0,52);
  while (randomNumberGenerated.has(newNumber)){
    newNumber = randomNumber(0,52);
  }
  // here it means that the newNumber is a unique newNumber
  cardGeneratedArray.push(cardsNme[newNumber]);
  randomNumberGenerated.add(newNumber);
}

var c1 = [];
var c2 = [];
var c3 = [];
var pos = 0;
var buttonClicked = 0;

function imagePartition(){
  pos = 0;
  // COLOUMN 1 VALUES AT INTIAL STAGE
  for(var i = 0; i<21;i += 3){
    c1[pos] = cardGeneratedArray[i];
    var string = ".c1-card-" + (pos+1);
    var fileLocation = "images/cards/" + c1[pos] + ".jpg";
    setImage(string,fileLocation);
    pos += 1;
  }

  pos = 0;
  // COLOUMN 2 VALUES AT INTIAL STAGE
  for(var i = 1; i<21;i += 3){
    c2[pos] = cardGeneratedArray[i];
    var string = ".c2-card-" + (pos+1);
    var fileLocation = "images/cards/" + c2[pos] + ".jpg";
    setImage(string,fileLocation);
    pos += 1;
  }

  pos = 0;
  // COLOUMN 3 VALUES AT INTIAL STAGE
  for(var i = 2; i<21;i += 3){
    c3[pos] = cardGeneratedArray[i];
    var string = ".c3-card-" + (pos+1);
    var fileLocation = "images/cards/" + c3[pos] + ".jpg";
    setImage(string,fileLocation);
    pos += 1;
  }
}

//to load the initial images for the card that has been generated
imagePartition();

//Here we need to display the intital position for the cards
// where c1 contains all it cards which need to display in coloumn 1
// and same follows to c2 and c3.

function swapCards(middle,left,right,originalArray){
  var middlePosition = 7;
  var middleLastPosition = 13;
  var pos = 0;

// PLACED CARDS IN THE MIDDLE POSITION
  for(var i = middlePosition; i <= middleLastPosition ; i++){
    originalArray[i] = middle[pos];
    pos += 1;
  }

//PLACED CARDS AT STARTING position
  pos = 0;
  for(var i=0;i<middlePosition;i++){
    originalArray[i] = left[pos];
    pos += 1;
  }

  pos = 0;
  for(var i=middleLastPosition+1;i<21;i++){
    originalArray[i] = right[pos];
    pos += 1;
  }

}

function setImage(queryString , imageLocation){
  document.querySelector(queryString).setAttribute("src",imageLocation);
}

document.querySelector("#col-1").addEventListener("click",function(){
  //It means that the col-1 must be at place of 7-13 in the array
  checkButtonClicked(c1,c2,c3);
});

document.querySelector("#col-2").addEventListener("click",function(){
  //It means that the col-2 must be at place of 7-13 in the array
  checkButtonClicked(c2,c1,c3);
});

document.querySelector("#col-3").addEventListener("click",function(){
  //It means that the col-3 must be at place of 7-13 in the array
  checkButtonClicked(c3,c1,c2);
});


function checkButtonClicked(center,left,right){
  if(buttonClicked >= 3){
    document.querySelector("#col-3").disabled = "true";
    document.querySelector("#col-2").disabled = "true";
    document.querySelector("#col-1").disabled = "true";

  } else {
    buttonClicked += 1;
    swapCards(center,left,right,cardGeneratedArray);
    imagePartition();
  }

  if(buttonClicked == 3){
    document.querySelector(".glass-1").classList.remove("visible");
  }
}
