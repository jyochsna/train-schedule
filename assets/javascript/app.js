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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var dataRef = firebase.database();

  $("#submit").on("click", function(event){
      event.preventDefault();

      var trainName = $("train-name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("first-time").val().trim();
      var frequency = $("#frequency").val().trim();

      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "days");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % tFrequency;
      var tMinutesTillTrain = tFrequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      daraRef.ref().push({
    
        trainName,
        destination,
        frequency,
        nextTrain,
        tMinutesTillTrain

      });
  });
