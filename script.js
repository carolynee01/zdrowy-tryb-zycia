document.addEventListener("DOMContentLoaded", function () {

    /* --- 1. NAWIGACJA: MENU HAMBURGER --- */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".main-nav");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Zamykanie menu po kliknięciu w link (przydatne na urządzeniach mobilnych)
        document.querySelectorAll(".main-nav a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* --- 2. NARZĘDZIA: KALKULATORY ZDROWOTNE --- */

    // Kalkulator BMI
    const bmiForm = document.getElementById("bmiForm");
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
                `<strong>Twoje BMI:</strong> ${result}<br><strong>Kategoria:</strong> ${category}`;
        });
    }

    // Kalkulator zapotrzebowania na wodę (35ml / kg)
    const waterForm = document.getElementById("waterForm");
    if (waterForm) {
        waterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const weight = parseFloat(document.getElementById("weightWater").value);

            if (!weight || weight <= 0) {
                document.getElementById("waterOutput").textContent = "Podaj poprawną wagę.";
                return;
            }

            const waterLiters = (weight * 0.035).toFixed(2);
            document.getElementById("waterOutput").innerHTML =
                `Twoje dzienne zapotrzebowanie: <strong>${waterLiters} litrów</strong>.<br>
                <small>Pamiętaj o zwiększeniu ilości płynów podczas upałów lub sportu!</small>`;
        });
    }

    // Kalkulator kalorii (TDEE) - Wzór Mifflina-St Jeora
    const calorieForm = document.getElementById("calorieForm");
    if (calorieForm) {
        calorieForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const age = parseFloat(document.getElementById("ageCalorie").value);
            const weight = parseFloat(document.getElementById("weightCalorie").value);
            const height = parseFloat(document.getElementById("heightCalorie").value);
            const activity = parseFloat(document.getElementById("activity").value);
            const goal = parseFloat(document.getElementById("goal").value);

            const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            const tdee = Math.round(bmr * activity);
            const finalResult = tdee + goal;

            document.getElementById("calorieOutput").innerHTML =
                `Dzienne zapotrzebowanie na cel: <strong>${finalResult} kcal</strong>.<br>
                <small>Twoje zero kaloryczne (utrzymanie wagi) to ok. ${tdee} kcal.</small>`;
        });
    }

    /* --- 3. API: POGODA DLA AKTYWNYCH (OPENWEATHERMAP) --- */
    const weatherContainer = document.getElementById("weatherContainer");
    if (weatherContainer) {
        const apiKey = "4c42fe9ebbf93684e3ba1ce28c169465"; // Twoja aktywna licencja API
        const city = "Lublin";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

        fetch(url)
            .then(response => {
                if (response.status === 401) {
                    throw new Error("Błąd 401: Klucz nieaktywny lub błędny.");
                }
                if (!response.ok) throw new Error(`Błąd ${response.status}`);
                return response.json();
            })
            .then(data => {
                const temp = Math.round(data.main.temp);
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;

                let recommendation = "Idealne warunki na trening!";
                if (temp < 5) recommendation = "Zimno! Ubierz się warstwowo na bieg.";
                else if (temp > 25) recommendation = "Gorąco! Pamiętaj o nawodnieniu.";
                if (desc.includes("deszcz")) recommendation = "Pada deszcz. Może dzisiaj trening w domu?";

                weatherContainer.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Pogoda">
                        <div style="text-align: left;">
                            <h3 style="margin:0;">${city}: ${temp}°C</h3>
                            <p style="margin:0; text-transform: capitalize;">${desc}</p>
                        </div>
                    </div>
                    <p style="margin-top: 15px; font-weight: bold; color: var(--primary-green);">${recommendation}</p>`;
            })
            .catch(err => {
                weatherContainer.innerHTML = `<p style="font-size: 0.9rem; color: #666; padding: 10px;">${err.message}</p>`;
                console.warn("Weather API Error:", err.message);
            });
    }

    /* --- 4. MULTIMEDIA: SYSTEMY SLIDERÓW --- */

    // Slider Główny (Hero Section)
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let currentSlide = 0;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove("active"));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
        };

        if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
        if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

        setInterval(() => showSlide(currentSlide + 1), 5000); // Automatyczna rotacja co 5s
    }

    // Automatyczny Slider na podstronie Kontakt
    const contactHeroImgs = document.querySelectorAll(".contact-hero__img");
    let contactIndex = 0;
    if (contactHeroImgs.length > 0) {
        setInterval(() => {
            contactHeroImgs[contactIndex].classList.remove("is-active");
            contactIndex = (contactIndex + 1) % contactHeroImgs.length;
            contactHeroImgs[contactIndex].classList.add("is-active");
        }, 5000);
    }

    // Slider na podstronie Sport (obsługa atrybutów danych)
    const sportSlider = document.querySelector('[data-slider="sport"]');
    if (sportSlider) {
        const sportSlides = Array.from(sportSlider.querySelectorAll('.slide'));
        const sportPrev = sportSlider.querySelector('[data-prev]');
        const sportNext = sportSlider.querySelector('[data-next]');
        let sIndex = sportSlides.findIndex(s => s.classList.contains('active')) || 0;

        const showSport = (i) => {
            sportSlides.forEach(s => s.classList.remove('active'));
            sIndex = (i + sportSlides.length) % sportSlides.length;
            sportSlides[sIndex].classList.add('active');
        };

        sportNext?.addEventListener('click', () => showSport(sIndex + 1));
        sportPrev?.addEventListener('click', () => showSport(sIndex - 1));

        let sportTimer = setInterval(() => showSport(sIndex + 1), 6000);
        sportSlider.addEventListener('mouseenter', () => clearInterval(sportTimer));
        sportSlider.addEventListener('mouseleave', () => sportTimer = setInterval(() => showSport(sIndex + 1), 6000));
    }

    /* --- 5. INTERAKCJE: ROZWIJANIE SZCZEGÓŁÓW (ACCORDION) --- */
    const toggles = document.querySelectorAll(".btn-toggle");
    toggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const panelId = btn.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);
            const isOpen = btn.getAttribute("aria-expanded") === "true";

            // Zamykanie innych otwartych sekcji (efekt akordeonu)
            document.querySelectorAll(".btn-toggle[aria-expanded='true']").forEach(other => {
                if (other !== btn) {
                    other.setAttribute("aria-expanded", "false");
                    other.textContent = "Czytaj";
                    const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
                    if (otherPanel) otherPanel.hidden = true;
                }
            });

            // Przełączanie aktualnej sekcji
            btn.setAttribute("aria-expanded", String(!isOpen));
            btn.textContent = isOpen ? "Czytaj" : "Zwiń";
            if (panel) panel.hidden = isOpen;
        });
    });
});

/* --- 6. WALIDACJA FORMULARZA KONTAKTOWEGO --- */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Zatrzymanie domyślnego wysyłania

            // Pobieranie pól
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const topic = document.getElementById("topic");
            const message = document.getElementById("message");
            const consent = document.getElementById("consent");
            const output = document.getElementById("contactOutput");

            // Kontenery na błędy
            const errName = document.getElementById("errName");
            const errEmail = document.getElementById("errEmail");
            const errTopic = document.getElementById("errTopic");
            const errMsg = document.getElementById("errMsg");
            const errConsent = document.getElementById("errConsent");

            let isValid = true;

            // Resetowanie błędów i klas przed nową walidacją
            [errName, errEmail, errTopic, errMsg, errConsent].forEach(el => el.textContent = "");
            [name, email, topic, message].forEach(el => el.classList.remove("is-invalid"));

            // 1. Walidacja Imienia
            if (name.value.trim().length < 2) {
                errName.textContent = "Podaj swoje imię (min. 2 znaki).";
                name.classList.add("is-invalid");
                isValid = false;
            }

            // 2. Walidacja E-mail (RegEx)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errEmail.textContent = "Podaj poprawny adres e-mail.";
                email.classList.add("is-invalid");
                isValid = false;
            }

            // 3. Walidacja Tematu
            if (!topic.value) {
                errTopic.textContent = "Wybierz temat wiadomości.";
                topic.classList.add("is-invalid");
                isValid = false;
            }

            // 4. Walidacja Wiadomości
            if (message.value.trim().length < 10) {
                errMsg.textContent = "Wiadomość musi mieć co najmniej 10 znaków.";
                message.classList.add("is-invalid");
                isValid = false;
            }

            // 5. Walidacja Zgody (Checkbox)
            if (!consent.checked) {
                errConsent.textContent = "Musisz zaakceptować przetwarzanie danych.";
                isValid = false;
            }

            // Finalizacja wysyłki do Netlify
            if (isValid) {
                const formData = new FormData(contactForm);
                    const params = new URLSearchParams(formData);
                params.set("form-name", "contact-form"); 

                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: params.toString(),
                })
                .then(response => {
                    if (response.ok) {
                        output.style.color = "var(--primary-green)";
                        output.innerHTML = "<strong>Sukces!</strong> Wiadomość została zapisana.";
                        contactForm.reset();
                    } else {
                        throw new Error("Błąd serwera Netlify");
                    }
                })
                .catch((error) => {
                output.style.color = "#b00020";
                    output.textContent = "Błąd: " + error.message;
                    console.error('Netlify Post Error:', error);
                });
            }
        });
    }