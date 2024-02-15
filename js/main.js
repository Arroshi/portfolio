// MENU NAV

(() => {
  const navBtn = document.querySelector(".hamburger_btn"),
    navMenu = document.querySelector(".nav-menu"),
    opacityy = document.querySelector(".opacityy"),
    closeNavBtn = document.querySelector(".close-nav-menu");

  navBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.toggle("open");
    bodyScrollingToggle();
    showOpacityy();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    bodyScrollingToggle();
    fadeOutEffect();
    hideOpacityy();
  }

  function showOpacityy() {
    opacityy.classList.toggle("open");
  }

  function hideOpacityy() {
    opacityy.classList.remove("open");
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  opacityy.addEventListener("click", () => {
    hideNavMenu();
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        // desactivar section active
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activar new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // desactivar el active en el nav
        navMenu
          .querySelector(".active")
          //   .classList.add("outer-shadow", "hover-in-shadow");
          .classList.remove("active", "glass-ug");
        navMenu.querySelector(".active");
        //   .classList.remove("active", "inner-shadow");
        if (navMenu.classList.contains("open")) {
          // activar el nuevo nav
          event.target.classList.add("active", "glass-ug");
          //   event.target.classList.remove("glass-ug");
          // hide nav
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "glass-ug");
              //   item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // add (#) hash
        // window.location.hash = hash;
      }
    }
  });
})();

// END MENU NAV

// ABOUT SECTION TABS
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabContainer = document.querySelector(".about-tabs");

  tabContainer.addEventListener("click", (event) => {
    // verificamos si el evento target contiene el "tab-item" y si no tiene la clase "activate"
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // desactivamos el "active" si esta en "tab-item"
      tabContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activar un nuevo "tab-item"
      event.target.classList.add("active", "outer-shadow");
      // desactivar si existe "active" en "tab-content"
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // activar nuevo "tab-content"
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();
// END ABOUT SECTION TABS

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

function bodyHideScroll() {
  document.body.classList.toggle("hide-scroll");
}

function bodyShowScroll() {
  document.body.classList.toggle("show-scroll");
}

// PORTFOLIO FILTER AND POPUP
(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots, filter;

  // FILTER PORTFOLIO ITEMS
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // desactivamos el "active" si esta en "filter-item"
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activamos un nuevo "filter-item"
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");

      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      console.log(portfolioItem);
      // obtener el "portfolioItem"
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      console.log(itemIndex);
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // convertir "screenshots" a array
      screenshots = screenshots.split(", ");

      console.log(screenshots);
      if (screenshots.length === 1) {
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
        prevBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
    bodyHideScroll();
  }

  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    console.log(imgSrc);
    const popupImg = popup.querySelector(".pp-img");
    console.log(popupImg);
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // desactivamos la clase "active"
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  function popupDetails() {
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; //end fuction execute
    }

    projectDetailsBtn.style.display = "block";
    // obtener los detalles del project
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    // obtener el title de los project
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    // obtener la category de los project
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(200, projectDetailsContainer.offsetTop);
    }
    if (projectDetailsContainer.classList.contains("active")) {
      popup.classList.add("show-scroll");
    } else {
      popup.classList.remove("show-scroll");
    }
  }

  // NEXT SLIDE
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideShow();
  });

  // PREV SLIDE
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  });

  //CLOSE BTN
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });
})();
// END PORTFOLIO FILTER AND POPUP

// TESTIMONIAL

// (() => {
//     const sliderContainer = document.querySelector(".testimonial-slider-container"),
//         slides = sliderContainer.querySelectorAll(".testimonial-item"),
//         slideWidth = sliderContainer.offsetWidth,
//         prevBtn = document.querySelector(".testimonial-slider-nav .prev"),
//         nextBtn = document.querySelector(".testimonial-slider-nav .next"),
//         activeSlide = sliderContainer.querySelector(".testimonial-item.active");
//     let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

//     // obtener tamaño de slide
//     slides.forEach((slide) => {
//             slide.style.width = slideWidth + "px";
//         })
//         // obtener tamaño de sliderContainer
//     sliderContainer.style.width = slideWidth * slides.length + "px";

//     nextBtn.addEventListener("click", () => {
//         if (slideIndex === slides.length - 1) {
//             slideIndex = 0;
//         } else {
//             slideIndex++;
//         }
//         slider();
//     })

//     prevBtn.addEventListener("click", () => {
//         if (slideIndex === 0) {
//             slideIndex = slides.length - 1;
//         } else {
//             slideIndex--;
//         }
//         slider();
//     })

//     function slider() {
//         // desacticar el active
//         sliderContainer.querySelector(".testimonial-item.active").classList.remove("active");
//         // activar el active
//         slides[slideIndex].classList.add("active");
//         sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
//     }
//     slider();
// })();
// END TESTIMONIAL

// HIDE ALL SECTION EXCEPT ACTIVE
(() => {
  const section = document.querySelectorAll(".section");
  section.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();
// END HIDE ALL SECTION EXCEPT ACTIVE
// DARK MODE

const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  updateIcon();
});

function themeMode() {
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }
  updateIcon();
}
themeMode();

function updateIcon() {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.remove("fa-moon");
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.remove("fa-sun");
    dayNight.querySelector("i").classList.add("fa-moon");
  }
}
// END DARK MODE

// PRELOADER
window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
// END PRELOADER
