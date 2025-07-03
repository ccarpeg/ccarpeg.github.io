document.addEventListener("DOMContentLoaded", function () {
  // Modal de imágenes
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const thumbnails = document.querySelectorAll(".thumbnails");

  let images = [];
  let currentIndex = 0;

  if (modal) modal.style.display = "none";

  // Scroll top
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        scrollTopBtn.style.visibility = "visible";
        scrollTopBtn.style.opacity = "1";
      } else {
        scrollTopBtn.style.opacity = "0";
        setTimeout(() => {
          if (window.scrollY <= 200) {
            scrollTopBtn.style.visibility = "hidden";
          }
        }, 500);
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scrollspy de enlaces del nav
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = {};

  const possibleSections = ["#storyboard", "#gdrawings"];
  possibleSections.forEach(id => {
    const el = document.querySelector(id.replace("#", "."));
    if (el) sections[id] = el;
  });

  if (Object.keys(sections).length > 0) {
    window.addEventListener("scroll", function () {
      let currentSection = null;
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const [hash, section] of Object.entries(sections)) {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSection = hash;
          break;
        }
      }

      navLinks.forEach(link => {
        if (link.getAttribute("href") === currentSection) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  }

  // Scroll suave al hacer clic en enlaces de ancla
  navLinks.forEach(link => {
    const targetId = link.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      link.addEventListener("click", function (e) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });

  // Modal de imágenes (solo si existen)
  if (modal && modalImg && closeModal && prevBtn && nextBtn && thumbnails.length > 0) {
    function openModal(index, sectionImages) {
      images = sectionImages;
      currentIndex = index;
      modalImg.src = images[currentIndex].src;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      updateButtons();
    }

    function closeModalFunction() {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    function updateButtons() {
      prevBtn.style.display = currentIndex === 0 ? "none" : "block";
      nextBtn.style.display = currentIndex === images.length - 1 ? "none" : "block";
    }

    thumbnails.forEach((img, index) => {
      img.addEventListener("click", function () {
        const section = img.closest(".gallery");
        const sectionImages = [...section.querySelectorAll(".thumbnails")];
        openModal(sectionImages.indexOf(img), sectionImages);
      });
    });

    prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        modalImg.src = images[currentIndex].src;
        updateButtons();
      }
    });

    nextBtn.addEventListener("click", function () {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        modalImg.src = images[currentIndex].src;
        updateButtons();
      }
    });

    closeModal.addEventListener("click", closeModalFunction);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModalFunction();
    });

    document.addEventListener("keydown", function (e) {
      if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "Escape") closeModalFunction();
      }
    });
  }

  // Ocultar header al hacer scroll hacia abajo
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }

      lastScrollY = currentScrollY;
    });
  }

  // Menú hamburguesa
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.querySelector(".right-links");

  if (btn && menu) {
    btn.addEventListener("click", function () {
      menu.classList.toggle("open");
      btn.classList.toggle("active");
    });

    // --> CERRAR AL HACER CLIC EN CUALQUIER OPCIÓN
    const menuLinks = document.querySelectorAll('.right-links a[href]');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('active');
      });
    });
  }
});
