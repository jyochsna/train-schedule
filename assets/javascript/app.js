var firebaseConfig = {
  apiKey: "AIzaSyBpAFfSOMwnqusvo4EDKqbTMgkbsEJI40Y",
  authDomain: "train-schedule-ec30e.firebaseapp.com",
  databaseURL: "https://train-schedule-ec30e.firebaseio.com",
  projectId: "train-schedule-ec30e",
  storageBucket: "train-schedule-ec30e.appspot.com",
  messagingSenderId: "797569406143",
  appId: "1:797569406143:web:ed7f00036439f40fc5e20a",
  measurementId: "G-QP30MVR9NR"
};
  var dataRef = firebase.database();

  $("#submit").on("click", function(event){
      event.preventDefault();

      var trainName = $("train-name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("first-time").val().trim();
      var frequency = $("#frequency").val().trim();

     
      dataRef.ref().push({
    
        trainName,
        destination,
        firstTime,
        frequency,
        nextTrain,
        tMinutesTillTrain

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
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    // train info
    console.log(trainName);
    console.log(destination);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var addRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),

    );
    $("#trainbody").append(addRow);
});

