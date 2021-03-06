const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const carouselInterval = 8 * 1000;

let sections = [];
let navs = [];
let projects = [];
let slides;
let projectIndex = 0;
let carouselTimer;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    sections = document.querySelectorAll("[id^='section-']");
    navs = document.querySelectorAll("[id^='nav-']");
    projects = document.querySelectorAll(".carousel .content .card");
    slides = document.querySelector(".carousel .slides");

    for(let i = 0; i < projects.length; i++){
        const slide = document.createElement("i");
        slide.classList.add("fa-solid", "fa-circle");
        slide.onclick = () => goToProject(i, true);
        slides.appendChild(slide);
    }

    goToProject(projectIndex);
    validateContactForm();

    carouselTimer = setInterval(() => nextProject(), carouselInterval);

    name.addEventListener("input", () => validateContactForm());
    email.addEventListener("input", () => validateContactForm());
    message.addEventListener("input", () => validateContactForm());
});

document.addEventListener("scroll", () => {
    for(let i = 0; i < sections.length; i++){
        const section = sections[i];
        if(isElementWithinView(section)){
            setActiveNav(navs[i]);
        }
    }

    const nav = document.getElementById("nav");

    if(document.body.scrollTop > 280 || document.documentElement.scrollTop > 280){
        nav.classList.add("onscroll");
    }
    else{
        nav.classList.remove("onscroll");
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

function validateContactName(input){
    const error = document.getElementById("name-error");
    if(!input){
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

function validateContactMessage(input){
    const error = document.getElementById("message-error");
    if(!input || input.length < 100){
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

function validateContactEmail(input){
    const error = document.getElementById("email-error");
    if(!input || !emailRegex.test(input)){
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
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const submit = document.getElementById("contactSubmit");

    const validName = tryDisplayError(name, () => validateContactName(name.value));
    const validEmail = tryDisplayError(email, () => validateContactEmail(email.value));
    const validMessage = tryDisplayError(message, () => validateContactMessage(message.value));

    if(validName || validMessage || validEmail){
        submit.disabled = true;
        return;
    }

    submit.disabled = false;
}

function nextProject(input){
    goToProject(projectIndex + 1, input);
}

function previousProject(input){
    goToProject(projectIndex - 1, input);
}

function goToProject(index, input){
    if(input){
        clearInterval(carouselTimer);
        carouselTimer = setInterval(() => nextProject(), carouselInterval);
    }
    if(projectIndex === index){
        projects[projectIndex].classList.add("active");
        slides.children[projectIndex].classList.add("active");
        return;
    }

    if(index >= projects.length){
        index = 0;
    }
    else if(index < 0){
        index = projects.length - 1;
    }

    projects[projectIndex].classList.toggle("active");
    slides.children[projectIndex].classList.toggle("active");
    projectIndex = index;
    projects[projectIndex].classList.toggle("active");
    slides.children[projectIndex].classList.toggle("active");
}
