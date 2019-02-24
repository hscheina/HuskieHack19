$( document ).ready(function() {
    console.log( "ready!" );
    initData();
    //    button click
    $("#btnSubmit").click(function(){
      //When this button (with the id btnSubmit) is clicked, it will attempt to log the user in
      loginUser ();

  });
   $("#btnSignup").click(function(){
      //When this button (with the id btnSignup) is clicked, it will attempt to sign up the user
      signUser ();
   });
   
});
function lauth(f) {
  console.log("This did something.")
  var g = String(f);
  console.log(g);
   function checkLog() {
     if (sessionStorage.getItem('status') != null){
      var w = "window.location.href = " + String(g);
      console.log(w);
        //Go to desired link
       document.location.href = g;
     }
     else{
         console.log("Failure");//show validation message
     }
   
   }
   checkLog();
}

var posts = [];
var topics = [];
var users = [];
var tags = [];

  function initData() {

      
    var testUsers = localStorage.getItem("usersArray");
    if (testUsers == null) {

      $.getJSON( "https://raw.githubusercontent.com/hscheina/HuskieHack19/master/sample.json", function( data ) {
          posts = data.posts;
          topics = data.topics;
          users = data.users;
          tags = data.tags;

        });
      } else {
      //Every time the page loads, it uses the cookie.
      users = JSON.parse(localStorage.getItem("usersArray"));
      topics = JSON.parse(localStorage.getItem("topicsArray"));
      posts = JSON.parse(localStorage.getItem("postsArray"));
      tags = JSON.parse(localStorage.getItem("tagsArray"));
      
      }

    }
function loginUser() {
  
  var email = $("#email").val();
  var password = $("#password").val();
  var foundUser = users.find(x => x.email === email);
  if (foundUser == null) {
    alert("The user was not found!")
  }
  else {
    alert("Found you: " + foundUser.firstName)
    if (foundUser.password == password) {
      console.log("Password matches!")
      alert("Found!")
      foundUser.lastLoginDate = moment();
      //Sets login cookie
      sessionStorage.setItem('status','loggedIn') 
      console.log("After log");
      tryRedirect(1);
      

      
    }
    else {
      alert("Please put in the correct password!")
      tryRedirect(0);
    }
  }
  
}

function signUser() {
  
  var email = $("#emailSign").val();
  
  var foundUser = users.find(x => x.email === email);
    if (foundUser == null) {
      var firstName = $("#firstNameSign").val();
      var lastName = $("#lastNameSign").val();
      var password = $("#passwordSign").val();
      var currentDate = moment().toISOString();
      var newUser = {firstName:firstName, lastName:lastName, password: password, email: email};
      newUser.createdDate = currentDate;
      newUser.lastLoginDate = currentDate;
      newUser.userId = users.length + 1;
      console.log(currentDate);
      users.push(newUser);
  
      localStorage.setItem("usersArray",JSON.stringify(users));
      localStorage.setItem("topicsArray",JSON.stringify(topics));
      localStorage.setItem("postsArray",JSON.stringify(posts));
      localStorage.setItem("tagsArray",JSON.stringify(tags));
      tryRedirect(1);
  }
  else{
    alert("User already exists!")
    tryRedirect(0);
  }
  
}

function tryRedirect(f) {
  var redirect = function() {
    document.location.href="profile.html";
  }
  if (f == 1) {
    redirect();
  }
  else {
    console.log("No redirect");
  }
  

}

/*function checkLog() {
  if (sessionStorage.getItem('status') != null){
      //redirect to page
  }
  else{
      console.log("Failure");//show validation message
  }

}
*/