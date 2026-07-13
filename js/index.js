
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


window.addEventListener("scroll", () => {
  // add/remove shadow class
});