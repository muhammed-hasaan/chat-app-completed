import { auth  ,storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {db} from "./firebase.mjs"
import {  getStorage, ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {  addDoc , collection  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

var btn = document.getElementById("SignUp");
btn.addEventListener("click" , ()=>{
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var file = document.getElementById("file").files[0];
   
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        // Signed in 

        const user = userCredential.user;
        console.log(user);
        
        try {
            const docRef = await addDoc(collection(db, "users"), {
            email:email,
            fname:fname,
            lname:lname
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          

          const storageRef = ref(storage, email);
          
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');

            window.location.href = '../pages/login.html'
          });
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode , errorMessage);
    });

})