//Add focus to the name field upon refresh
const nameField = document.getElementById("name");
nameField.focus();

//Hides other job role option unless other is selected
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

otherJobRole.style.display = "none"; 
jobRole.addEventListener('change', (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = ""; 
    } else {
        otherJobRole.style.display = "none"; 
    }
});

//Disables shirt color menu until design is chosen
//Narrows colors available based on design selected
const shirtDesign = document.getElementById("design");
const shirtColorSelect = document.getElementById("color");
const colorOptions = shirtColorSelect.children;

shirtColorSelect.disabled = true; 

shirtDesign.addEventListener('change', (e) => {
    shirtColorSelect.disabled = false; 

    for (let i  = 0; i < colorOptions.length; i++) {
        const value = e.target.value;
        const optionTheme = colorOptions[i].getAttribute("data-theme");

        if (optionTheme === value) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute = true;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute = false; 
        }
    }
});

//Adds cost of activites to total cost when they're checked
const registerForActivities = document.getElementById("activities");
let pDollars = document.getElementById("activities-cost");
let totalCost = 0;

registerForActivities.addEventListener('change', (e) => {
    const dataCost = e.target.getAttribute("data-cost");
    const costNumber = +dataCost;
    
    if(e.target.checked === true) {
        totalCost += costNumber;
        pDollars.innerHTML = `<p>Total: $${totalCost}<p>`;
    }
    if (e.target.checked === false){
        totalCost -= costNumber;
        pDollars.innerHTML = `<p>Total: $${totalCost}<p>`;
    }
});

//Hides all payment options except credit card unless a different option is selected in the dropdown
const paymentSelection = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

paypal.style.display = "none"; 
bitcoin.style.display = "none"; 
paymentSelection.children[1].setAttribute("selected", "");

paymentSelection.addEventListener('change', (e) => {
    if (e.target.value === "credit-card") {
        creditCard.style.display = ""; 
        paypal.style.display = "none"; 
        bitcoin.style.display = "none"; 
    }
    if (e.target.value === "paypal") {
        creditCard.style.display = "none"; 
        paypal.style.display = ""; 
        bitcoin.style.display = "none"; 
    }
    if (e.target.value === "bitcoin") {
        creditCard.style.display = "none"; 
        paypal.style.display = "none"; 
        bitcoin.style.display = ""; 
    }
});