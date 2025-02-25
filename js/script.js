document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // === Resaltar el enlace del menú según la sección visible ===
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = {
        "#content": document.querySelector(".content"),
        "#gdrawings": document.querySelector(".gdrawings"),
        "#about": document.querySelector(".about"),
    };

    window.addEventListener("scroll", function () {
        let currentSection = null;
        const scrollPosition = window.scrollY + window.innerHeight / 3; 

        for (const [hash, section] of Object.entries(sections)) {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
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

    // === Desplazamiento suave al hacer clic en la navbar ===
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado de salto
            const targetId = link.getAttribute("href"); // Obtener el valor del atributo href
            const targetElement = document.querySelector(targetId); // Seleccionar el elemento objetivo

            targetElement.scrollIntoView({
                behavior: "smooth", // Desplazamiento suave
                block: "start" // Alineación al inicio de la sección
            });
        });
    });
});

