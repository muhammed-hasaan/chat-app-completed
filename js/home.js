import { app, auth, db, storage } from './firebase.mjs';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getDocs, addDoc, collection, where, query } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



onAuthStateChanged(auth, async (user) => {
    if (user) {

        const uid = user.uid;
        var myId;
        var userId;
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            myId = doc.id;
            document.getElementById('myName').innerHTML = doc.data().fname;
            getDownloadURL(ref(storage, doc.data().email))
                .then((url) => {
                    const img = document.getElementById('myimg');
                    img.setAttribute('src', url);
                })
                .catch((error) => {
                    console.log(error)
                });
        });

        const q1 = query(collection(db, "users"), where("email", "!=", user.email));

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById('users').innerHTML += `
            <div class="items" onclick="selcteduser('${doc.id}' , '${doc.data().email}' , '${doc.data().fname}')">
            <div class="userName" >
                ${doc.data().fname}
            </div>
        </div>`
        });

        async function selcteduser(id, email, name) {
            console.log(id, email, name)
            document.getElementById('selectedName').innerHTML = name;
            userId = id;
            getDownloadURL(ref(storage, email))
                .then((url) => {
                    const img = document.getElementById('selectedImg');
                    img.setAttribute('src', url);
                })
                .catch((error) => {
                    console.log(error)
                });

            var mixedId;
            if (myId > userId) {
                mixedId = myId + userId
            }
            else {
                mixedId = userId + myId
            }

            const q2 = query(collection(db, "messages"), where("mixedId", "==", mixedId));
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                if (
                    myId = doc.data().myId
                ) {
                    document.getElementById("messages").innerHTML +=
                        `
                        <div id="rightMess">
                            ${doc.data().inputValue}
                       </div>`
                }
                else if (
                    userId  = doc.data().userId
                )
                {
                    document.getElementById("messages").innerHTML +=
                        `
                        <div id="leftMess">
                            ${doc.data().inputValue}
                       </div>`     
                }

            })



        }

        document.addEventListener('keydown', async (e) => {
            var message = document.getElementById("messageinput").value;
            if (e.keyCode === 13) {
                console.log(myId, userId)
                var mixedId;
                if (myId > userId) {
                    mixedId = myId + userId
                }
                else {
                    mixedId = userId + myId
                }
                console.log(myId);
                try {
                    const docRef = await addDoc(collection(db, "messages"), {
                        mixedId: mixedId,
                        inputValue: message,
                        myId: myId,
                        userId: userId
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                };
            };
        });

        window.selcteduser = selcteduser;

        // ...
    } else {
        // User is signed out
        // ...

        window.location.href = '../index.html';

    }
});



document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "../index.html"
    }).catch((error) => {
        // An error happened.
    });
})



