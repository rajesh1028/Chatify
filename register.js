let form=document.getElementById('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let res=await fetch("https://sore-rose-clownfish-garb.cyclic.app/user/register",{
        method:"POST",
        body:JSON.stringify({name,email,password}),
        headers:{
            "Content-Type":"application/json"
        }  //
    });
    res=await res.json();
    if(res.status){
        alert(`Welcome ${res.name}\nPlease Login`);
        window.location="./frontend/login.html"
    }else{
        alert('Something went wrong!\nPlease try again later')
    }

})
