let form=document.getElementById('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let res=await fetch("https://sore-rose-clownfish-garb.cyclic.app/user/login",{
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
        window.location="../status_calling/FE/index.html"
    }else if(res.status=="medium"){
        alert(`Please Register First`);
        window.location=".././index.html"
    }else{
        alert('Wrong Credentials!')
    }

})
