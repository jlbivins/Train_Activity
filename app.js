console.log("app.js loaded");

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDcNrnfcsJ8elQZM6KaOxMV0KGFBRgH7Iw",
  authDomain: "train-jlb.firebaseapp.com",
  databaseURL: "https://train-jlb.firebaseio.com",
  projectId: "train-jlb",
  storageBucket: "train-jlb.appspot.com",
  messagingSenderId: "689782730168"
};
  firebase.initializeApp(config);


// referenct to my database
  var myfirebase = firebase.database();

//  CRUD
//myfirebase.ref().push({"name":"Jimmie"})

$(document).ready(function(){


$("#submitBtn").on("click", function(){

    event.preventDefault();

    var newTrain = {};

    newTrain.trainName = $("#trainName").val().trim();
    newTrain.dest = $("#destination").val().trim();
    newTrain.firstTime = $("#firstTrain").val().trim();
    newTrain.freq = $("#freq").val().trim();

    console.log(newTrain);

    myfirebase.ref().push(newTrain)

});// END of ONCKICK 



//READ - add you train to table
myfirebase.ref().on("child_added", function(snap){

    //console.log(snap.val());


    var currentTime = moment();

    var train = snap.val();

    var trainName = train.trainName;
    var dest = train.dest;
    var time =  moment(train.firstTime, "HH:mm");
    var freq = train.freq;

 // Assumptions
 var tFrequency = freq;

 // Time is 3:30 AM
 var firstTime = train.firstTime;

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
   var minAway = tFrequency - tRemainder;

    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var time_value=moment().add(minAway, "minutes");

    var nextTrain = moment(time_value).format("hh:mm");

    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


     /* for every train
        <tr>
            <td>name</td>      
            <td>dest</td>
            <td>freq</td>
            <td>nextTrain</td>
            <td>minAway</td>
        </tr>



    */
    var newRow = $("<tr>");
    newRow.append("<td>"+ trainName + "</td>");
    newRow.append("<td>"+ dest + "</td>");
    //newRow.append("<td>"+ time.format("hh:mm a") + "</td>");
    newRow.append("<td>"+ freq + "</td>");
    newRow.append("<td>"+ nextTrain + "</td>");
    newRow.append("<td>"+ minAway + "</td>");
    $("tbody").append(newRow);




})












});

