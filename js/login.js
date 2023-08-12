import {app , auth ,analytics } from './firebase.mjs'
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

var btn = document.getElementById("Login");
btn.addEventListener("click" , ()=>{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
   
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        window.location.href="../pages/home.html"
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode , errorMessage);
    });

})