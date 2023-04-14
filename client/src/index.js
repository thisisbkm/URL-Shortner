const form = document.getElementById("form");

function copyLink(){
    var text = document.getElementById("out");
    navigator.clipboard.writeText(text.innerText);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + text.innerText;
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    var originalUrl = document.getElementById("originalLink").value;
    if(originalUrl.trim()==""){alert("Entered Link Must not be empty !!");return;}
    const body = JSON.stringify({ "url": originalUrl });
    // console.log(body)
    fetch("/api/short", {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: body,
        cache: 'default'
    }).then(async (res) => {
        const output = document.getElementById("out");
        const data = await res.json();
        // console.log(data);
        if(data.error!=undefined){alert(data.error);return;}
        const base = window.location.href;
        output.href = base + data.shoUrl;
        console.log(data);
        output.innerText = base + data.shoUrl;
        document.querySelector(".output").appendChild(document.createElement("h2").appendChild(document.createTextNode(`Number of clicks ${data.clicks}`)));
        document.querySelectorAll(".hide").forEach((e)=>{
            e.classList.remove("hide");
        })
    }).catch(err => {
        console.log(err);
    })
})