// status box
let status_box = document.querySelector(".statusBox");
let status_area = document.querySelector("#status_area");

function findUnseenStatus(out) {
    let unseen = document.querySelectorAll("#recent_updates .block.unseen");
    unseen.forEach((elem, i) => {
        elem.addEventListener("click", () => {
            status_box.innerHTML = `<div class="status_header">
             <div class="imgcontent">

                 <div class="imgBx">
                     <img src=${out[i].image} style="width:80%;">
                 </div>
                 <h3>${out[i].name}</h3>

             </div>
             <div class="views">
                 <ion-icon name="eye"></ion-icon>
                 <p>${out[i].views}</p>
             </div>
             <div><ion-icon name="close"></ion-icon></div>
         </div>`;
            closeIcon();
            status_area.classList.add("hide");
            status_box.classList.remove("hide");
            //console.log(elem);
            let timer = setTimeout(() => {
                status_area.classList.remove("hide");
                status_box.classList.add("hide");
                clearTimeout(timer);
            }, 3000)
        })
    })
    //console.log(unseen);
}


// close option
function closeIcon() {
    let closes = document.querySelector(".statusBox .status_header").childNodes[5];
    closes.addEventListener("click", () => {
        status_area.classList.remove("hide");
        status_box.classList.add("hide");
    })
}


// get status

let recent_updates = document.querySelector("#recent_updates");

function statusData() {
    fetch("https://red-determined-fossa.cyclic.app/status", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((out) => {
            let data = out.map((elem) => {
                return renderStatus(elem);
            })
            recent_updates.innerHTML = (data.join(" "));
            findUnseenStatus(out);
        })
        .catch((err) => console.log(err));
}
statusData();

function renderStatus(data) {
    return (`<div class="block unseen">
    <div class="imgbx">
        <img src=${data.image}>
    </div>
    <div class="details">
        <div class="listHead">
            <h4>${data.name}</h4>
            <p class="time">04:15</p>
        </div>
        <div class="message_p">
            <p>Just Now</p>
        </div>
    </div>
</div>`)
}


// add status

let create_status = document.querySelector(".block.create_status");
// let status_area = document.querySelector("#status_area");

create_status.addEventListener("click", () => {
    window.location.href = "createstatus.html";
})

// calling page

let calling_page = document.querySelector(".box.calls");
let calling_button = document.getElementById("create_call");
let calling_display = document.querySelector(".container_calling");
let call_btn = document.querySelectorAll(".call.call_btn");

// call_btn.forEach((elem) => {
//     elem.addEventListener("click", () => {
//         calling_page.classList.add("hide");
//         calling_display.classList.remove("hide");
//     })
// })

call_btn.forEach((elem) => {
    let name = elem.parentNode.children[1].childNodes[1].children[0].innerHTML;
    elem.addEventListener("click", () => {
        calling_display.childNodes[3].childNodes[1].innerHTML = name;
        calling_page.classList.add("hide");
        calling_display.classList.remove("hide");
    })
})

calling_button.addEventListener("click", () => {
    calling_page.classList.add("hide");
    calling_display.classList.remove("hide");
})

document.getElementById("call_end").addEventListener("click", () => {
    calling_page.classList.remove("hide");
    calling_display.classList.add("hide");
})

let pay = document.querySelector("#pay");
pay.addEventListener("click", () => {
    window.location.href = "payment.html";
})