const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const topic = document.querySelectorAll(".note input");
    const data = [];
    for(let i = 0; i<notes.length; i++){
        const dataset = {
            topic:topic[i].value,
            notes:notes[i].value
        }; 
        data.push(dataset); 
    } 
    // console.log(data.length)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}


//  <div class="note">
// <div class="tool">
//     <i class="fas fa-save"></i>
//     <i class="fas fa-trash"></i>
// </div>
// <textarea></textarea>
// </div>

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
        <input type="text" placeholder="Topic Name" value="${text=="" ? "" :text.topic}">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text=="" ? "" :text.notes}</textarea>
    `;

    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )
    main.appendChild(note);
    if(text!="") saveNotes()
}


(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        // console.log(lsNotes);
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()