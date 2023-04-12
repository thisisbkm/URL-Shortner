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
        const base = window.location.href;
        output.href = base + data.short;
        output.innerText = base + data.short;
        document.querySelectorAll(".hide").forEach((e)=>{
            e.classList.remove("hide");
        })
    }).catch(err => {
        console.log(err);
    })
})