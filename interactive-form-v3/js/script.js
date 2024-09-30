//Add focus to the name field upon refresh
const nameField = document.getElementById("name");
nameField.focus();

//Hides other job role field unless other is selected in the dropdown
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

//Hides all payment options except credit card upon load and refresh
//If a different option is selected in the dropdown menu, its details are shown and credit card is hidden
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

//Adds custom form validation
const emailAddressField =  document.getElementById("email");
const activityCheckboxes = document.querySelectorAll("input[type=checkbox]");
const cardNumberInput = document.getElementById("cc-num");
const zipCodeInput = document.getElementById("zip");
const cvvFieldInput = document.getElementById("cvv");
const form = document.querySelector('form');

function testValidName() {
    const testName = /^(.|\s)*\S(.|\s)*$/.test(nameField.value);
    if (testName === false) {
        return false;
    }
}

function testValidEmail() {
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddressField.value);  //credit to Treehouse Unit 3: Regular Expressions in JavaScript course
    if (testEmail === false) {
        return false;
    }
}

function testValidActivities() {
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if((activityCheckboxes.checked).length === 0) {
            return false;     
        }
    }
}

// function testValidCard(cardnumber) {
//  //card number field must have 13-16 digits, no spaces or dashes
//     const userCreditCard = cardNumberInput.value;
//     const testCard = /^\d{13,16}$/.test(userCreditCard);
//  //zipcode field must have 5-digit number

//  //cvv field must have a 3-digit number

//  //return false if one of those not met
//     if(testCard === false) {
//         return false;
//     }
// };

form.addEventListener('submit', (e) => {
    testValidName();
    testValidEmail();
    testValidActivities();

    if (testValidName() === false || testValidEmail() === false || testValidActivities() === false ) {
        e.preventDefault(); 
    }
    // if (testValidCard() === false) {
    //     e.preventDefault(); 
    // }
});
