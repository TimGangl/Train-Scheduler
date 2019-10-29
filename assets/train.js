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
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#first-train-time-input").val().trim();
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

  //log to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  //clear all text in text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});


//send to 
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  //create moment code for frequency
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");
  // function to calc next train time
  var minutesAway = moment().diff(moment(trainTime, "X"), "minutes away");
  console.log(minutesAway);

  //compare train time to current time

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainTimePretty),
    $("<td>").text(minutesAway)
  );
  //send data to table
  $("#schedule-table > tbody").append(newRow);
});







