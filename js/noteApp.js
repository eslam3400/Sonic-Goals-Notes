let userStatus = 'offline'
if (localStorage.getItem('sonic__user') != null) userStatus = 'online'
let app = Vue.createApp({
    data() {
        return {
            notes: [],
            newNote: '',
            userId: null
        }
    },
    computed: {
        fetchNotes() {
            if (userStatus == 'online') getNotes(localStorage.getItem('sonic__user'), (_notes,_userId) => { this.notes = _notes; this.userId = _userId})
        }
    },
    methods: {
        addNote() {
            let that = this
            let note = {
                date: new Date(),
                id: Math.floor(Math.random() * 9999999),
                title: that.newNote
            }
            this.notes.push(note)
            this.newNote = ''
            if (userStatus == 'online') updateNotes(this.notes,this.userId)
        },
        deleteNote(noteId) {
            this.notes = this.notes.filter((note)=> { return note.id != noteId });
            if (userStatus == 'online') updateNotes(this.notes,this.userId)
        }
    },
}).mount('#note-app')

let getNotesLocal = (callBack)=>{
    let notes = localStorage.getItem('sonic__localuser')
    callBack(notes)
}