document.getElementById("calc-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Hide the title if it exists
const titleElement = document.getElementById("title");
if (titleElement) {
    titleElement.style.display = "none";
}


    // Retrieve input values
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);

    // Calculate Ideal Body Weight (IBW)
    const IBW = height - 100;

    // Check if Adjusted Body Weight (ABW) is necessary
    let ABW = IBW;
    if (weight - IBW > 20) {
        ABW = IBW + 0.4 * (weight - IBW);
    }

    // Calculate Total Calories and Macronutrients
    const calories = ABW * 24 * 1.4; // Assuming activity factor of 1.4
    const protein = ABW * 1.6;
    const carb = calories * 0.55 / 4;
    const sat_fat = calories * 0.05 / 9;
    const pufa = calories * 0.1 / 9;
    const mufa = calories * 0.14 / 9;
    const fat = calories * 0.29 / 9;

  // Define the color classes
const colorClasses = {
    default: 'color-default',  // white for text like "IBW", "SFA"
    multiply: 'color-multiply', // for things like 'x 9'
    kcal: 'color-kcal',         // for kcal values
    gram: 'color-gram',         // for g values
    equalSign: 'color-equal'    // for '=' signs
  };
  
  // Function to colorize the equation parts
  function colorizeEquation(equation) {
    // Ensure the equation is a string
    if (typeof equation !== 'string') {
      equation = String(equation); // Convert to string if not already
    }
  
    // Split the equation into parts based on the specified patterns
    const parts = equation.split(/(\d+\s*x\s*\d+|\d+\s*kcal|\d+\s*g|=)/);
  
    return parts.map(part => {
      // Check each part and wrap it with corresponding classes
      if (/x/.test(part)) {
        return `<span class="${colorClasses.multiply}">${part}</span>`;
      } else if (/kcal/.test(part)) {
        return `<span class="${colorClasses.kcal}">${part}</span>`;
      } else if (/g/.test(part)) {
        return `<span class="${colorClasses.gram}">${part}</span>`;
      } else if (/=/.test(part)) {
        return `<span class="${colorClasses.equalSign}">${part}</span>`;
      } else {
        return `<span class="${colorClasses.default}">${part}</span>`; // Default to white for the rest
      }
    }).join('');
  }
  
  
// Create equations section
let equations = `
    <div class="calculation"><span class="result color-default">IBW</span><span class="label color-equal"> = </span><span class="result color-multiply">${height}</span><span class="label color-equal"> - </span><span class="result color-multiply">100</span><span class="label color-equal"> = </span><span class="result color-gram">${IBW}</span> kg</div>`;

if (ABW !== IBW) {
    equations += 
        `<div class="calculation"><span class="result color-default">Adjusted Body Weight (ABW)</span><span class="label color-equal"> = </span><span class="result color-multiply">${IBW}</span><span class="label color-equal"> + </span><span class="result color-multiply">0.4 </span><span class="label color-equal">(</span><span class="result color-multiply">${weight}</span><span class="label color-equal"> - </span><span class="result color-multiply">${IBW}</span><span class="label color-equal">)</span><span class="label color-equal"> = </span><span class="result color-gram">${ABW}</span> kg</div>`;
}

equations += `
    <div class="calculation"><span class="label color-default">Total Calories</span><span class="label color-equal"> = </span><span class="result color-multiply">${ABW}</span> <span class="label color-equal"> x </span> <span class="result color-multiply">24</span> <span class="label color-equal"> x </span><span class="result color-multiply">1.4</span><span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(calories)}</span> kcal</div>
    <div class="calculation"><span class="label color-default">Protein</span><span class="label color-equal"> = </span><span class="result color-multiply">1.6</span> <span class="label color-equal"> x </span><span class="result color-multiply">${ABW}</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(protein)}</span> g <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(protein)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">4</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(protein*4)}</span> kcal</div>
    <div class="calculation"><span class="label color-default">Carbohydrates</span><span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(calories)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">55%</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(carb*4)}</span> kcal <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(carb*4)}</span> <span class="label color-equal"> / </span><span class="result color-multiply">4</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(carb)}</span> g</div>
    <div class="calculation"><span class="label color-default">SFA</span><span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(calories)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">5%</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(sat_fat*9)}</span> kcal <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(sat_fat*9)}</span> <span class="label color-equal"> / </span><span class="result color-multiply">9</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(sat_fat)}</span> g</div>
    <div class="calculation"><span class="label color-default">PUFA</span><span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(calories)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">10%</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(pufa*9)}</span> kcal <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(pufa*9)}</span> <span class="label color-equal"> / </span><span class="result color-multiply">9</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(pufa)}</span> g</div>
    <div class="calculation"><span class="label color-default">MUFA</span><span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(calories)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">14%</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(mufa*9)}</span> kcal <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(mufa*9)}</span> <span class="label color-equal"> / </span><span class="result color-multiply">9</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(mufa)}</span> g</div>
    <div class="calculation"><span class="label color-default">Fat</span><span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(calories)}</span> <span class="label color-equal"> x </span><span class="result color-multiply">29%</span> <span class="label color-equal"> = </span><span class="result color-kcal">${Math.round(fat*9)}</span> kcal <span class="label color-equal"> = </span><span class="result color-multiply">${Math.round(fat*9)}</span> <span class="label color-equal"> / </span><span class="result color-multiply">9</span> <span class="label color-equal"> = </span><span class="result color-gram">${Math.round(fat)}</span> g</div>`
document.getElementById("equations").innerHTML = equations;

  
  


    // Nutrition Calculation function
    function calculateNutrition() {
        // Updated constants for each type (g per serving)
        const starch = { carb: 15, protein: 3, fat: 0, calories: 80 };
        const beans = { carb: 15, protein: 7, fat: 2, calories: 125 };
        const milk = { carb: 15, protein: 8, fat: 8, calories: 160 };
        const fruits = { carb: 15, protein: 0, fat: 0, calories: 60 };
        const vegetables = { carb: 5, protein: 2, fat: 0, calories: 25 };
        const meat = { carb: 0, protein: 7, fat: 5, calories: 75 };
        const fatType = { carb: 0, protein: 0, fat: 5, calories: 45 };

        // Define starting servings
        let starchServings = 10;
        let beansServings = 2;
        let milkServings = 2;
        let fruitServings = 4;
        let vegServings = 5;
        let meatServings = 2;
        let fatServings = 2;

        // Total calories and macronutrient calculation
        let totalCarbs = starchServings * starch.carb + beansServings * beans.carb + milkServings * milk.carb + fruitServings * fruits.carb + vegServings * vegetables.carb;
        let totalProtein = starchServings * starch.protein + beansServings * beans.protein + milkServings * milk.protein + vegServings * vegetables.protein + meatServings * meat.protein;
        let totalFat = starchServings * starch.fat + beansServings * beans.fat + milkServings * milk.fat + vegServings * vegetables.fat + meatServings * meat.fat + fatServings * fatType.fat;
        let totalCalories = starchServings * starch.calories + beansServings * beans.calories + milkServings * milk.calories + fruitServings * fruits.calories + vegServings * vegetables.calories + meatServings * meat.calories + fatServings * fatType.calories;

      
// Iteratively adjust servings to match calorie and macronutrient goals
function optimizeServings() {
    let tolerance = 10; // Tolerance for calories in kcal
    let maxIterations = 100; // Maximum iterations to prevent infinite loops
    let iteration = 0;

    while (Math.abs(totalCalories - calories) > tolerance && iteration < maxIterations) {
        iteration++;

        // Adjust based on macronutrient deficits
        if (totalCalories < calories) {
            if (totalProtein < protein){
                if (milkServings < 4) milkServings++;
                else if (beansServings < 4) beansServings++;
                else meatServings++;
            }
            if (totalCarbs < carb){
                if (starchServings < 14) starchServings++;
                else if (beansServings < 3) beansServings++;
                else if (vegServings < 6) vegServings++;
                else fruitServings++;
            }
            if (totalFat < fat){
                if (milkServings <= 3) milkServings++;
                else if (meatServings < 3) meatServings++;
                else fatServings++;
            } 
        } else {
            // Adjust to reduce calorie surplus
            if (totalFat > fat){
                if (fatServings > 3) fatServings--;
                else if (meatServings > 3) meatServings--;
                else milkServings--;
            }
            if (totalCarbs > carb){
                if (fruitServings > 6) fruitServings--;
                else if (vegServings > 6) vegServings--;
                else if (beansServings > 4) beansServings--;
                else starchServings--;
            }
            if (totalProtein > protein){
                if (meatServings >= 5) meatServings--;
                else if (beansServings > 5) beansServings--;
                else milkServings--;
            }
        }
        
        // Recalculate totals after adjustment
        totalCarbs = starchServings * starch.carb + beansServings * beans.carb + milkServings * milk.carb + fruitServings * fruits.carb + vegServings * vegetables.carb;
        totalProtein = starchServings * starch.protein + beansServings * beans.protein + milkServings * milk.protein + vegServings * vegetables.protein + meatServings * meat.protein;
        totalFat = starchServings * starch.fat + beansServings * beans.fat + milkServings * milk.fat + vegServings * vegetables.fat + meatServings * meat.fat + fatServings * fatType.fat;
        totalCalories = starchServings * starch.calories + beansServings * beans.calories + milkServings * milk.calories + fruitServings * fruits.calories + vegServings * vegetables.calories + meatServings * meat.calories + fatServings * fatType.calories;
    }

    // Log if the optimization reached max iterations
    if (iteration === maxIterations) {
        console.warn("Max iterations reached during optimization. Results may not be fully accurate.");
    }
}

optimizeServings();

        // Update table data based on final servings
        const nutritionTable = `
        <table>
            <tr>
                <th>Food Item</th>
                <th>Serving</th>
                <th>Carb</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Calories</th>
            </tr>
            <tr><td>Starch</td><td>${starchServings}</td><td>${starchServings * starch.carb} g</td><td>${starchServings * starch.protein} g</td><td>${starchServings * starch.fat} g</td><td>${starchServings * starch.calories} kcal</td></tr>
            <tr><td>Beans</td><td>${beansServings}</td><td>${beansServings * beans.carb} g</td><td>${beansServings * beans.protein} g</td><td>${beansServings * beans.fat} g</td><td>${beansServings * beans.calories} kcal</td></tr>
            <tr><td>Milk Whole</td><td>${milkServings}</td><td>${milkServings * milk.carb} g</td><td>${milkServings * milk.protein} g</td><td>${milkServings * milk.fat} g</td><td>${milkServings * milk.calories} kcal</td></tr>
            <tr><td>Fruits</td><td>${fruitServings}</td><td>${fruitServings * fruits.carb} g</td><td>${fruitServings * fruits.protein} g</td><td>${fruitServings * fruits.fat} g</td><td>${fruitServings * fruits.calories} kcal</td></tr>
            <tr><td>Vegetables</td><td>${vegServings}</td><td>${vegServings * vegetables.carb} g</td><td>${vegServings * vegetables.protein} g</td><td>${vegServings * vegetables.fat} g</td><td>${vegServings * vegetables.calories} kcal</td></tr>
            <tr><td>Meat Medium</td><td>${meatServings}</td><td>${meatServings * meat.carb} g</td><td>${meatServings * meat.protein} g</td><td>${meatServings * meat.fat} g</td><td>${meatServings * meat.calories} kcal</td></tr>
            <tr><td>Fat</td><td>${fatServings}</td><td>${fatServings * fatType.carb} g</td><td>${fatServings * fatType.protein} g</td><td>${fatServings * fatType.fat} g</td><td>${fatServings * fatType.calories} kcal</td></tr>
            <tr><td><strong>Total</strong></td><td></td><td>${totalCarbs} g</td><td>${totalProtein} g</td><td>${totalFat} g</td><td><strong>${totalCalories} kcal</strong></td></tr>
        </table>
        `;
        document.getElementById("nutrition-table").innerHTML = nutritionTable;
    }
    calculateNutrition();

    // Hide the form after calculation
    document.getElementById("calc-form").style.display = "none";
    document.getElementById("whatever").style.display = "none";
    document.getElementById("output-section").style.display = "block";
    
    // Add a "Try Again" button dynamically
    
    const tryAgainButton = `
    <button id="try-again" style="margin-top: 20px; padding: 10px 20px; background-color: #f25e5e; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Try Again
    </button>`;
    
    // Check if the "Try Again" button already exists, and remove it if so
    const existingTryAgainButton = document.getElementById("try-again");
    if (existingTryAgainButton) {
        existingTryAgainButton.remove();
    }
    
    // Add the new "Try Again" button
    document.getElementById("output-section").insertAdjacentHTML("beforeend", tryAgainButton);
    
    // Add event listener to reset everything
    document.getElementById("try-again").addEventListener("click", function () {
        document.getElementById("calc-form").reset(); // Reset the form
        document.getElementById("calc-form").style.display = "flex"; // Show the form
        document.getElementById("whatever").style.display = "flex";
        document.getElementById("output-section").style.display = "none"; // Hide the output
        document.getElementById("title").style.display = "block"; // Show the title
    });


});
