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
   $("#submitPost").click(function(){
      postUser();
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
      var userId = foundUser.userId
      //Sets login cookie
      sessionStorage.setItem('status','loggedIn') 
      sessionStorage.setItem('userId', JSON.stringify(userId))
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

      sessionStorage.setItem('status','loggedIn');
      sessionStorage.setItem('userId', JSON.stringify(newUser.userId));
      tryRedirect(1);
  }
  else{
    alert("User already exists!")
    tryRedirect(0);
  }
  
}

function postUser() {
  var title = $("#title").val();
  var description = $("#description").val();
  var currentDate = moment().toISOString();

  var temp = sessionStorage.getItem('userId');
  console.log(temp); //Successful, retrieved "2";
  var viewId = $.parseJSON(temp);
  console.log(viewId); //Successful, retrieved 2;
  //var foundUser = users.find(x => x.viewId === viewId);
  
  if (viewId == null) {
    console.log("Whoever you are, you can't post!")
  }
  else {
    function getData() {
      var userData = localStorage.getItem('usersArray', JSON.stringify(users));
      var viewData = $.parseJSON(userData);
      for (var i = 0; i < viewData.length; i++) {
        if (viewData[i].userId == viewId) {
          return(viewData[i].email);
        }
      }
    }
    getData();
    console.log(getData());
    var newPost = {title: title, description: description}
    //Need: Get the user ID from the user


    var div2 = document.createElement("div");
    var te = document.createTextNode("Hello");
    div2.appendChild(te);
    console.log(div2);
    



    newPost.postId = posts.length + 1;
    newPost.createdDate = currentDate;
    newPost.userId = viewId;
    posts.push(newPost);

    localStorage.setItem("usersArray",JSON.stringify(users));
    localStorage.setItem("topicsArray",JSON.stringify(topics));
    localStorage.setItem("postsArray",JSON.stringify(posts));
    localStorage.setItem("tagsArray",JSON.stringify(tags));
    console.log(newPost);
    
    //Post to HTML
    
      
      /*var div = document.createElement("div");
      var h2 = document.createElement("h2");
      var p = document.createElement("p");
      var h2node = document.createTextNode(title);
      h2.appendChild(h2node);
      var pnode = document.createTextNode(description);
      p.appendChild(pnode);
      div.appendChild(h2);
      div.appendChild(p);
      console.log(div);*/
      // all of your code goes in here
      // it runs after the DOM is built
  
    


    
    
  }
}

function displayPosts() {
  var allPosts = localStorage.getItem('postsArray', JSON.stringify(posts));
      var viewPosts = $.parseJSON(allPosts);
      for (var i = 0; i < viewPosts.length; i++) {

        var ititle = viewPosts[i].title;
        var idescription = viewPosts[i].description;

        var div = document.createElement("div");
        var h2 = document.createElement("h2");
        var p = document.createElement("p");
        var h2node = document.createTextNode(ititle);
        h2.appendChild(h2node);
        var pnode = document.createTextNode(idescription);
        p.appendChild(pnode);
        div.appendChild(h2);
        div.appendChild(p);
        var breakb = document.createElement("br");

        console.log(div);
      }

}

function tryRedirect(f) {
  var redirect = function() {
    document.location.href="forum.html";
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