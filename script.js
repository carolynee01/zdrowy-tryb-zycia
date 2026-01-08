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
});

