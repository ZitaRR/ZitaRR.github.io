document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM loaded");
    await info();
});

async function info(){
    const info = document.getElementById("user-info");
    if(!info){
        return;
    }

    console.log(navigator.userAgent);
    const response = await fetch("https://ipapi.co/json/")
    if(!response.ok){
        console.log("Failed to fetch IP");
        return;
    }

    const json = await response.json();
    console.log(json);

    info.innerHTML = `
    Your location: ${json.region}, ${json.country_name}<br>
    IP: ${json.ip}<br>
    Service: ${json.org}<br>
    `;
}

function toggleHamburger(){
    let nav = document.getElementById("nav");
    nav.classList.toggle("responsive");
}
