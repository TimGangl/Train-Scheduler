var firebaseConfig = {
  apiKey: "AIzaSyAM8XDx5uQiSP4Y3XiHqUeEWpWunA6ZIWU",
  authDomain: "train-scheduler-98c9b.firebaseapp.com",
  databaseURL: "https://train-scheduler-98c9b.firebaseio.com",
  projectId: "train-scheduler-98c9b",
  storageBucket: "train-scheduler-98c9b.appspot.com",
  messagingSenderId: "336698376932",
  appId: "1:336698376932:web:ce251e6bc4dbed46b6e2f1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//create function to add info to variable
//on click of choo choo take info from form to firebase 
$("#add-train-btn").on("click", function (event) {
  var trainSound = new Audio("assets/images/train-horn.mp3");
  trainSound.play();
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  //create var to hold info temporarily
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainTime,
    frequency: trainFrequency
  };
  //push info from variable to firebase
  database.ref().push(newTrain);

  alert("Train successfully added");

  //clear all text in text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  return false;
});


//send to 
database.ref().on("child_added", function (childSnapshot) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  //create moment code for frequency

  // convert time from unix to 12 hour
  var firstTimeConverted = moment.unix(trainTime, "hh:mm A").subtract(1, "years");
  //current time
  var currentTime = moment();
  console.log(currentTime);
  //compare train time to current time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  //time apart
  var timeRemainder = diffTime % trainFrequency;

  //min till train
  var minutesTillTrain = trainFrequency - timeRemainder;

  //next train
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var formattedTime = moment(nextTrain).format("hh:mm A");
  //add train data to table
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(formattedTime),
    $("<td>").text(minutesTillTrain)
  );
  //send data to table
  $("#schedule-table > tbody").append(newRow);
});







