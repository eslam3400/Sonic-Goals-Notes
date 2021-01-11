const firebaseConfig = {
    apiKey: "AIzaSyB-tKh4i6UduFZV_fqlqiMIy2tgKmTKxjs",
    authDomain: "note-and-goals-vue.firebaseapp.com",
    projectId: "note-and-goals-vue",
    storageBucket: "note-and-goals-vue.appspot.com",
    messagingSenderId: "524696835035",
    appId: "1:524696835035:web:37ba8f60810e9123fe0dfe",
    measurementId: "G-3C5BW6CRZT"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();
db = firebase.firestore();

///////////////////////////////////////// Methods /////////////////////////////
let addUser = (_email, callBack = () => { }, fallBack = () => { }) => {
    let user = {
        email: _email,
        notes: [],
        goals: [],
        achieved: []
    }
    db.collection("Users").add(user)
        .then(function (result) {
            callBack(result);
        })
        .catch(function (error) {
            console.log(error);
            fallBack();
        });
}
let validateUser = (email) => {
    db.collection("Users").where('email', '==', email).get()
        .then((result) => {
            if (!result.empty) localStorage.setItem('sonic__user',email)
            else addUser(email,()=>{localStorage.setItem('sonic__user',email)})
        })
        .catch((err) => {
            console.log(err)
        })
}
let getNotes = (email,callBack=()=>{})=>{
    let notes
    let userId
    db.collection("Users").where('email','==',email).get()
    .then((result)=>{
        result.forEach(doc => {
            notes = doc.data().notes
            userId = doc.id
        });
        callBack(notes,userId)
    })
    .catch((err)=>{
        console.log(err)
    })
}
let updateNotes = (notes,userId)=>{
    db.collection("Users").doc(userId).update({notes})
    .then(function(result) {
        callback(result);
    })
    .catch(function(error) {
        console.log(error);
    });
}