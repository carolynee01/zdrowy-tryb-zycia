// Funkcja kalkulatora BMI
document.addEventListener("DOMContentLoaded", function() {
    const bmiForm = document.getElementById("bmiForm");
    
    // Sprawdzamy, czy formularz istnieje na danej podstronie
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