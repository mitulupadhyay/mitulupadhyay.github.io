
const menuBtn = document.querySelector(".menu-btn");

const mobileMenu = document.querySelector(".mobile-menu");

const icon = menuBtn.querySelector("i");

menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.toggle("active");

    if(mobileMenu.classList.contains("active")){

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    }else{

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});
document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});
window.addEventListener("resize",()=>{

    if(window.innerWidth>=768){

        mobileMenu.classList.remove("active");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

document.addEventListener("click", (e) => {
    const isMenuClick = mobileMenu.contains(e.target);
    const isButtonClick = menuBtn.contains(e.target);

    if (!isMenuClick && !isButtonClick && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        document.querySelector(".nav").classList.add("shadow-md");
    } else {
        document.querySelector(".nav").classList.remove("shadow-md");
    }
});

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const nameElement = document.getElementById("typed-name");

const names = [
  "Mitul...",
  "Mitul Upadhyay"
];

let nameIndex = 0;
let charIndex = 0;
let deleting = false;


function typeName(){

  const currentName = names[nameIndex];


  if(!deleting){

    nameElement.textContent =
      currentName.substring(0, charIndex + 1);

    charIndex++;


    if(charIndex === currentName.length){

      deleting = true;

      setTimeout(typeName, 1500);

      return;
    }

  }else{

    nameElement.textContent =
      currentName.substring(0, charIndex - 1);

    charIndex--;


    if(charIndex === 0){

      deleting = false;

      nameIndex =
      (nameIndex + 1) % names.length;

    }

  }


  setTimeout(typeName, deleting ? 80 : 120);

}


typeName();


// SCROLL REVEAL ANIMATION


const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Run animation only once
                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});





window.addEventListener("scroll", () => {
  // add/remove shadow class
});