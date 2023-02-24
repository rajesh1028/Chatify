let form=document.getElementById('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let res=await fetch("http://127.0.0.1:3000/user/login",{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    res=await res.json();
    if(res.status==true){
        alert(`Login Succesful!`);
        localStorage.setItem("name",res.name);
        localStorage.setItem("token",res.token);
        window.location="./chatify.html"
    }else if(res.status=="medium"){
        alert(`Please Register First`);
        window.location="./register.html"
    }else{
        alert('Wrong Credentials!')
    }

})
