let detectUser = ()=>{
    if (localStorage.getItem('sonic__user') == null){
        if (localStorage.getItem('sonic__localuser') == null) $('#emailModal').modal('show')
        else localStorage.setItem('sonic__localuser',{})
    }
}
let setLocal = ()=>{
    if (localStorage.getItem('sonic__localuser') == null){
        localStorage.setItem('sonic__localuser',{})
    }
}
let submitEmail = ()=>{
    let email = $('#email').val()
    if (email.search("@") != -1 && email.search("com") != -1 && email.search(".") != -1){
        $('#emailModal').modal('hide')
        validateUser(email)
    }
    else alert("please make sure u enterd a vaild email")
}
detectUser()