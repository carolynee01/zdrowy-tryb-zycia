document.addEventListener("DOMContentLoaded", function() {
    
    /* --- 1. OBSŁUGA MENU HAMBURGER --- */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".main-nav");

    // Sprawdzamy, czy elementy menu istnieją na stronie
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Zamykanie menu po kliknięciu w link
        document.querySelectorAll(".main-nav a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    /* --- 2. KALKULATOR BMI --- */
    const bmiForm = document.getElementById("bmiForm");
    
    // Sprawdzamy, czy formularz BMI znajduje się na aktualnej podstronie
    if (bmiForm) {
        bmiForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const weight = parseFloat(document.getElementById("weight").value);
            const height = parseFloat(document.getElementById("height").value) / 100;

            if (!weight || !height) {
                document.getElementById("bmiOutput").textContent = "Podaj poprawne dane.";
                return;
            }

            const bmi = weight / (height * height);
            const result = bmi.toFixed(1);

            let category = "";
            if (bmi < 18.5) category = "Niedowaga";
            else if (bmi < 25) category = "Waga prawidłowa";
            else if (bmi < 30) category = "Nadwaga";
            else category = "Otyłość";

            document.getElementById("bmiOutput").innerHTML =
                `<strong>Twoje BMI:</strong> ${result}<br>
                 <strong>Kategoria:</strong> ${category}`;
        });
    }

    /* --- 3. SLIDER Z PORADAMI --- */
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

        // Automatyczna zmiana slajdu co 5 sekund
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    /* --- 4. KALKULATOR ZAPOTRZEBOWANIA NA WODĘ --- */
    const waterForm = document.getElementById("waterForm");
    
    if (waterForm) {
        waterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const weight = parseFloat(document.getElementById("weightWater").value);

            if (!weight || weight <= 0) {
                document.getElementById("waterOutput").textContent = "Podaj poprawną wagę.";
                return;
            }

            // Obliczenie: 35ml na każdy kg masy ciała
            const waterLiters = (weight * 0.035).toFixed(2);

            document.getElementById("waterOutput").innerHTML =
                `Twoje dzienne zapotrzebowanie na płyny to około: <strong>${waterLiters} litrów</strong>.<br>
                <small>Pamiętaj, że podczas upałów lub intensywnego sportu powinieneś pić więcej!</small>`;
        });
    }
	
	

    /* --- 5. KALKULATOR KALORII (TDEE) --- */
    const calorieForm = document.getElementById("calorieForm");
    
    if (calorieForm) {
        calorieForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const age = parseFloat(document.getElementById("ageCalorie").value);
            const weight = parseFloat(document.getElementById("weightCalorie").value);
            const height = parseFloat(document.getElementById("heightCalorie").value);
            const activity = parseFloat(document.getElementById("activity").value);
            const goal = parseFloat(document.getElementById("goal").value);

            // Obliczenie BMR (Podstawowa Przemiana Materii) - wzór uproszczony dla młodzieży
            // Wzór: (10 * waga) + (6.25 * wzrost) - (5 * wiek) + 5
            const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            
            // TDEE = BMR * Poziom Aktywności
            const tdee = Math.round(bmr * activity);
            const finalResult = tdee + goal;

            document.getElementById("calorieOutput").innerHTML =
                `Twoje dzienne zapotrzebowanie, aby osiągnąć cel, to: <strong>${finalResult} kcal</strong>.<br>
                <small>Twoje zapotrzebowanie zerowe (utrzymanie wagi) wynosi ok. ${tdee} kcal.</small>`;
        });
    }

    const weatherContainer = document.getElementById("weatherContainer");

    if (weatherContainer) {
    const apiKey = "4c42fe9ebbf93684e3ba1ce28c169465"
; // Wklej tutaj swój klucz po rejestracji
    const city = "Lublin";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Błąd pobierania danych");
            return response.json();
        })
        .then(data => {
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;

            // Logika rekomendacji dla sportowca
            let recommendation = "Idealne warunki na trening!";
            if (temp < 5) recommendation = "Zimno! Ubierz się warstwowo na bieg.";
            if (temp > 25) recommendation = "Gorąco! Nie zapomnij o dużej ilości wody.";
            if (desc.includes("deszcz")) recommendation = "Pada deszcz. Może dzisiaj trening w domu?";

            weatherContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Ikona pogody">
                    <div style="text-align: left;">
                        <h3 style="margin:0;">${city}: ${temp}°C</h3>
                        <p style="margin:0; text-transform: capitalize;">${desc}</p>
                    </div>
                </div>
                <p style="margin-top: 15px; font-weight: bold; color: var(--primary-green);">${recommendation}</p>
            `;
        })
        .catch(err => {
            weatherContainer.innerHTML = "<p>Nie udało się załadować pogody. Sprawdź klucz API.</p>";
            console.error(err);
        });
}
	
	/* --- 6. SLIDER ZDJĘĆ NA STRONIE KONTAKT --- */
const contactHeroImgs = document.querySelectorAll(".contact-hero__img");
let contactIndex = 0;

if (contactHeroImgs.length > 0) {
  setInterval(() => {
    contactHeroImgs[contactIndex].classList.remove("is-active");
    contactIndex = (contactIndex + 1) % contactHeroImgs.length;
    contactHeroImgs[contactIndex].classList.add("is-active");
  }, 5000);
}

});

(function () {
  const slider = document.querySelector('[data-slider="sport"]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const btnPrev = slider.querySelector('[data-prev]');
  const btnNext = slider.querySelector('[data-next]');

  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index < 0) index = 0;

  const show = (i) => {
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
    index = i;
  };

  const next = () => show((index + 1) % slides.length);
  const prev = () => show((index - 1 + slides.length) % slides.length);

  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);

  let timer = setInterval(next, 6000);


  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => (timer = setInterval(next, 6000)));
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".btn-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const id = btn.getAttribute("aria-controls");
      const panel = id ? document.getElementById(id) : null;
      if (!panel) return;

      const isOpen = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".btn-toggle[aria-expanded='true']").forEach((otherBtn) => {
        if (otherBtn === btn) return;
        const otherId = otherBtn.getAttribute("aria-controls");
        const otherPanel = otherId ? document.getElementById(otherId) : null;
        otherBtn.setAttribute("aria-expanded", "false");
        otherBtn.textContent = "Czytaj";
        if (otherPanel) otherPanel.hidden = true;
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.textContent = isOpen ? "Czytaj" : "Zwiń";
      panel.hidden = isOpen; 
    });
  });
});


