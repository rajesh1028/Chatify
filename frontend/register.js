let form=document.getElementById('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let res=await fetch("http://127.0.0.1:3000/user/register",{
        method:"POST",
        body:JSON.stringify({name,email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    res=await res.json();
    if(res.status){
        alert(`Welcome ${res.name}\nPlease Login`);
        window.location="./login.html"
    }else{
        alert('Something went wrong!\nPlease try again later')
    }

})
