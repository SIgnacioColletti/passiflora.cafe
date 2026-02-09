document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURACIÓN OPTIMIZADA
  const observerOptions = {
    // 0.05 = se activa cuando apenas asoma un 5% del elemento
    threshold: 0.05,
    // rootMargin positivo = activa el producto 100px ANTES de que entre a la pantalla
    // Esto hace que cuando el usuario llegue, el producto ya esté ahí.
    rootMargin: "0px 0px 100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Una vez que es visible, dejamos de observarlo para ahorrar batería en el móvil
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con clase .slide-up
  const slideUpElements = document.querySelectorAll(".slide-up");
  slideUpElements.forEach((el) => observer.observe(el));

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Botón "Volver arriba"
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
