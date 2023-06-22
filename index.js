import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-b17e7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseListInDB = ref(database, "endorseList")

const inputFieldEl = document.getElementById("input-field")
const publishButtonEl = document.getElementById("publish-button")
const endorseListEl = document.getElementById("endorse-list")

publishButtonEl.addEventListener("click",function(){
     let inputValue = inputFieldEl.value
       push(endorseListInDB, inputValue)
        clearInput()
     
})
function clearInput(){
    inputFieldEl.value=""
    
}
onValue(endorseListInDB,function(snapshot){
    endorseListEl.innerHTML=""
    if(snapshot.exists()){
        let allEndorsements = Object.entries(snapshot.val())
        for(let i = allEndorsements.length - 1; i >= 0 ; i--) {
            addNewElement(allEndorsements[i])
        }
    }
})
function addNewElement(endorsement) {
    let endorsementValue = endorsement[1];

    let newLi = document.createElement("li");
    newLi.textContent = endorsementValue;

    endorseListEl.appendChild(newLi);
}

