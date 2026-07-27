//    MOBILE NAVIGATION

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const icon = menuBtn.querySelector("i");

function setMenuIcon(isOpen) {
  icon.classList.toggle("fa-xmark", isOpen);
  icon.classList.toggle("fa-bars", !isOpen);
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  setMenuIcon(false);
}

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("active");
  setMenuIcon(isOpen);
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});

document.addEventListener("click", (e) => {
  const isMenuClick = mobileMenu.contains(e.target);
  const isButtonClick = menuBtn.contains(e.target);

  if (!isMenuClick && !isButtonClick && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

//    STICKY NAVBAR SHADOW ON SCROLL

const navEl = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  navEl.classList.toggle("shadow-lg", window.scrollY > 10);
  navEl.classList.toggle("shadow-black/20", window.scrollY > 10);
});

//    FOOTER — DYNAMIC COPYRIGHT YEAR

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

//    HERO — TYPED NAME EFFECT

const nameElement = document.getElementById("typed-name");
const names = ["Mitul...", "Mitul Upadhyay"];

let nameIndex = 0;
let charIndex = 0;
let deleting = false;

function typeName() {
  const currentName = names[nameIndex];

  if (!deleting) {
    nameElement.textContent = currentName.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentName.length) {
      deleting = true;
      setTimeout(typeName, 1500);
      return;
    }
  } else {
    nameElement.textContent = currentName.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      nameIndex = (nameIndex + 1) % names.length;
    }
  }

  setTimeout(typeName, deleting ? 80 : 120);
}

typeName();

//    SCROLL REVEAL (sections + staggered card grids)

const revealElements = document.querySelectorAll(".reveal");

const CARD_STAGGER_MS = 120; // gap between each card's entrance

// Maps a card's `data-anim` attribute to the keyframe that plays for it.
// Cards with no attribute just rise up (the default).
const ANIMATION_BY_TYPE = {
  up: "fadeSlideUp",
  left: "slideInFromLeft",
  right: "slideInFromRight",
  pop: "popIn",
};

function animateIn(el, delayMs) {
  const type = el.dataset.anim || "up";
  const keyframe = ANIMATION_BY_TYPE[type] || ANIMATION_BY_TYPE.up;
  el.style.animation = `${keyframe} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
  el.style.animationDelay = `${delayMs}ms`;
}



function staggerGroup(group, baseDelay = 0, stepMs = CARD_STAGGER_MS) {
  [...group.children].forEach((child, index) => {
    const delay = baseDelay + index * stepMs;
    animateIn(child, delay);

    const nestedGroup = child.querySelector(".stagger-children");
    if (nestedGroup) {
      staggerGroup(nestedGroup, delay + 350, 70);
    }
  });
}

function playStagger(section) {
  const allGroups = section.querySelectorAll(".stagger-children");



  const topLevelGroups = [...allGroups].filter(
    (group) =>
      !group.parentElement.closest(".stagger-children") &&
      !group.classList.contains("timeline")
  );

  topLevelGroups.forEach((group) => staggerGroup(group));
}

//    LEETCODE — LIVE STATS

const LEETCODE_USERNAME = "Mitul_Upadhyay";
const LEETCODE_STATS_URL = `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}/stats`;

const leetcodeCounters = [
  document.getElementById("stats-leetcode-count"),
  document.getElementById("highlights-leetcode-count"),
].filter(Boolean);

fetch(LEETCODE_STATS_URL)
  .then((res) => {
    if (!res.ok) throw new Error(`LeetCode stats API responded ${res.status}`);
    return res.json();
  })
  .then((json) => {
    const solved = json?.data?.totalSolved;
    if (typeof solved !== "number") return;

    leetcodeCounters.forEach((el) => {
      el.textContent = String(solved);
    });
  })
  .catch((error) => {
    console.warn("LeetCode stats unavailable, showing fallback number:", error);
  });

/*  Stats: numbers count when  section  revealed */

function animateCounter(el) {
  const original = el.textContent.trim();
  const match = original.match(/^(\d+)(.*)$/);
  if (!match) return; // e.g. "Learning" — nothing to count

  const digits = match[1].length; // preserve leading zeros, e.g. "01"
  const target = parseInt(match[1], 10);
  const suffix = match[2];
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(eased * target);
    el.textContent = String(value).padStart(digits, "0") + suffix;

    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = original;
  }

  requestAnimationFrame(tick);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        playStagger(entry.target);

        if (entry.target.id === "stats") {
          entry.target.querySelectorAll(".stat-value").forEach((el, index) => {
            setTimeout(() => animateCounter(el), index * CARD_STAGGER_MS + 300);
          });
        }

        if (entry.target.id === "highlights") {
          const counter = entry.target.querySelector("#highlights-leetcode-count");
          if (counter) {
            setTimeout(() => animateCounter(counter), CARD_STAGGER_MS + 300);
          }
        }

        revealObserver.unobserve(entry.target); // run once
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

//  Journey timeline

const timelineCards = document.querySelectorAll(".timeline.stagger-children > *");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateIn(entry.target, 0);
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

timelineCards.forEach((card) => timelineObserver.observe(card));

//    SCROLLSPY — highlight the nav 

const navAnchors = document.querySelectorAll('.nav-link a[href^="#"]');
const spySections = [...navAnchors]
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeHref = `#${entry.target.id}`;
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === activeHref);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // trigger around the vertical middle
);

spySections.forEach((section) => spyObserver.observe(section));

//    BACK TO TOP

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("show", window.scrollY > 500);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//    COPY EMAIL TO CLIPBOARD

const copyToast = document.createElement("div");
copyToast.className = "copy-toast";
copyToast.textContent = "Email copied to clipboard";
document.body.appendChild(copyToast);

let toastTimeout;

function showCopyToast() {
  copyToast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => copyToast.classList.remove("show"), 2000);
}

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => {
    const email = link.href.replace("mailto:", "").split("?")[0];

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showCopyToast).catch(() => {});
    }
  });
});
