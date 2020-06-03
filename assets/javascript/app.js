var firebaseConfig = {
  apiKey: "AIzaSyBpAFfSOMwnqusvo4EDKqbTMgkbsEJI40Y",
  authDomain: "train-schedule-ec30e.firebaseapp.com",
  databaseURL: "https://train-schedule-ec30e.firebaseio.com",
  projectId: "train-schedule-ec30e",
  storageBucket: "train-schedule-ec30e.appspot.com",
  messagingSenderId: "797569406143",
  appId: "1:797569406143:web:ed7f00036439f40fc5e20a",
  measurementId: "G-QP30MVR9NR",
};
firebase.initializeApp(firebaseConfig);
var dataRef = firebase.database();

$("#submit").on("click", function (event) {
  event.preventDefault();

  //grab user input
  var trainName = $("#train-name").val();
  var destination = $("#destination").val();
  var firstTime = $("#first-time").val();
  var frequency = $("#frequency").val();

  dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
  });

  console.log(trainName);
  console.log(destination);

  alert("train added");

  //clears all of the text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-time").val("");
  $("#frequency").val("");
});
dataRef.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  //store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  // train info
  console.log(trainName);
  console.log(destination);

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "days");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var addRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );
  $("#train-table > tbody").append(addRow);
});
