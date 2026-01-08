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
});