document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeModal = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const thumbnails = document.querySelectorAll(".thumbnails");

    modal.style.display = "none";
    let images = []; // Almacena las imágenes de la sección activa
    let currentIndex = 0;

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

    function openModal(index, sectionImages) {
        images = sectionImages;
        currentIndex = index;
        modalImg.src = images[currentIndex].src;
        modal.style.display = "flex";
        updateButtons();
    }

    // Función para actualizar la visibilidad de los botones de navegación
    function updateButtons() {
        prevBtn.style.display = currentIndex === 0 ? "none" : "block";
        nextBtn.style.display = currentIndex === images.length - 1 ? "none" : "block";
    }

    // Evento para cada miniatura
    thumbnails.forEach((img, index) => {
        img.addEventListener("click", function () {
            // Filtrar solo las imágenes de la misma sección
            const section = img.closest(".gallery");
            const sectionImages = [...section.querySelectorAll(".thumbnails")];
            openModal(sectionImages.indexOf(img), sectionImages);
        });
    });

    // Botón "anterior"
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            modalImg.src = images[currentIndex].src;
            updateButtons();
        }
    });

    // Botón "siguiente"
    nextBtn.addEventListener("click", function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            modalImg.src = images[currentIndex].src;
            updateButtons();
        }
    });

    // Cerrar modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Navegación con teclas del teclado
    document.addEventListener("keydown", function (e) {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowLeft") prevBtn.click();
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "Escape") modal.style.display = "none";
        }
    });
});

