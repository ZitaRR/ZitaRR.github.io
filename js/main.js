document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    validateContactForm();

    subject.addEventListener("input", () => validateContactForm());
    message.addEventListener("input", () => validateContactForm());
});

document.addEventListener("scroll", () => {
    const home = document.getElementById("home");
    if(isElementWithinView(home)){
        setActiveNav(document.getElementById("nav-home"));
        return;
    }

    const about = document.getElementById("about");
    if(isElementWithinView(about)){
        setActiveNav(document.getElementById("nav-about"));
        return;
    }

    const xp = document.getElementById("xp");
    if(isElementWithinView(xp)){
        setActiveNav(document.getElementById("nav-xp"));
        return;
    }
});

function toggleHamburger(){
    const nav = document.getElementById("nav");
    nav.classList.toggle("responsive");
}

function goToSection(id){
    const section = document.getElementById(id);
    if(!section){
        return;
    }

    const nav = document.getElementById("nav");
    if(nav && nav.classList.contains("responsive")){
        nav.classList.toggle("responsive");
    }

    section.scrollIntoView({behavior: "smooth"});
}

// should have a better name but im a retard
// and i cant think of a better name atm
function isElementWithinView(element){
    if(!element){
        return;
    }

    const rect = element.getBoundingClientRect();
    const absolute = Math.abs(rect.y);

    if(absolute > rect.height / 2){
        return false;
    }

    return true;
}

function setActiveNav(nav){
    if(!nav){
        return;
    }
    else if(!nav.id.includes("nav-")){
        return;
    }

    const current = document.getElementsByClassName("active")[0];
    if(nav.isSameNode(current)){
        return;
    }

    current.classList.toggle("active");
    nav.classList.toggle("active");
}

function submitContact(){
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    document.location = `mailto: Haeggqvist1998@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

function validateContactSubject(input){
    const error = document.getElementById("subject-error");
    if(!input){
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

function validateContactMessage(input){
    const error = document.getElementById("message-error");
    if(!input || input.length < 30){
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

function tryDisplayError(element, validate){
    if(!validate()){
        element.classList.add("error");
        return true;
    }

    element.classList.remove("error");
    return false;
}

function validateContactForm(){
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const submit = document.getElementById("contactSubmit");

    const validSubject = tryDisplayError(subject, () => validateContactSubject(subject.value));
    const validMessage = tryDisplayError(message, () => validateContactMessage(message.value));

    if(validSubject || validMessage){
        submit.disabled = true;
        return;
    }

    submit.disabled = false;
}
