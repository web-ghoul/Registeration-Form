const regBtn = document.getElementById("reg")
const resetBtn = document.getElementById('reset')
const firstName = document.querySelector("main .container .reg-form .contain .form form .name .first input")
const lastName = document.querySelector("main .container .reg-form .contain .form form .name .last input")
const email = document.querySelector("main .container .reg-form .contain .form form .email  input")
const pass = document.querySelector("main .container .reg-form .contain .form form .pass .password  input")
const confPass = document.querySelector("main .container .reg-form .contain .form form .pass .conf  input")
const maleBox = document.querySelector("main .container .reg-form .contain .form form .sex .male  input")
const femaleBox = document.querySelector("main .container .reg-form .contain .form form .sex .female  input")

const validPass = ()=>{
 if(pass.value.length == 0){
    Swal.fire({
        title: 'Error!',
        text: 'Please Enter your pasword 🙂',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    return false;
 }if(pass.vlaue != confPass.vlaue) {
    Swal.fire({
        title: 'Error!',
        text: 'Password is\'t match 🙂',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
        return false;
    }
    return true;
}
const validNames = ()=>{
    if(firstName.value.length == 0){
       Swal.fire({
           title: 'Error!',
           text: 'Please Enter your pasword 🙂',
           icon: 'error',
           confirmButtonText: 'Cool'
       })
       return false;
    }if(lastName.value.length == 0){
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter your pasword 🙂',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        return false;
     }
    return true;
}
const validEmail = ()=>{
    if(!/^\w+@\w+.com/.test(email.value.toLowerCase())){
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter your Email Correctly 🙂',
            icon: 'error',
            confirmButtonText: 'Cool'
        }) 
        return false;
    }
    return true;
}
const validGender = ()=>{
    if(!maleBox.checked && !femaleBox.checked){
        Swal.fire({
            title: 'Error!',
            text: 'Please Choose Your Gender 🙂',
            icon: 'error',
            confirmButtonText: 'Cool'
        }) 
        return false
    }
    return true;
}
const handleData = ()=>{
    if(localStorage.getItem("data")){
        let arr = JSON.parse(localStorage.getItem("data"))
        let rows ="";
        for(let i=0;i<arr.length;i++){
            rows+= `<tr class= ${ i %  2 != 0 ? "color" : ""}>
                        <td>${arr[i].first_name} ${arr[i].last_name}</td>
                        <td>${arr[i].email}</td>
                        <td>${arr[i].pass}</td>
                        <td>${arr[i].gender}</td>
                    </tr>`
        }
        const tableBody = document.querySelector("main .container .table .contain table tbody")
        tableBody.innerHTML = rows
    }
}
regBtn.addEventListener("click",function(){
    let obj = {};
    if(validPass() && validNames() && validEmail() && validGender()){
        obj.pass = pass.value;
        obj.first_name = firstName.value;
        obj.last_name = lastName.value;
        obj.email = email.value;
        maleBox.checked ? obj.gender = "male" : femaleBox.checked ? obj.gender = "female":'';
        if(localStorage.getItem("data")){
            let arr = JSON.parse(localStorage.getItem('data'))
            console.log(arr)
            arr.push(obj);
            localStorage.setItem("data",JSON.stringify(arr))
        }else{
            localStorage.setItem("data",JSON.stringify([obj]))
        }
        handleData()
    }
    
})
reset.addEventListener("click",function(){
    firstName.value="";
    lastName.value="";
    pass.value="";
    confPass.value="";
    email.value="";
    maleBox.checked = false;
    femaleBox.checked = false;
})
handleData()
