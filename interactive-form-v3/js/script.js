//Declaring global variables that can be used throughout the project.
const form = document.querySelector('form');
const nameField = document.getElementById("name");
const nameHint = document.getElementById("name-hint");
const emailAddressField =  document.getElementById("email");
const emailHint = document.getElementById("email-hint");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const shirtDesign = document.getElementById("design");
const shirtColorSelect = document.getElementById("color");
const colorOptions = shirtColorSelect.children;
const registerForActivities = document.getElementById("activities");
const activityCheckboxes = document.querySelectorAll("input[type=checkbox]");
const activityHint = document.getElementById("activities-hint");
const paymentSelection = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const cardNumberInput = document.getElementById("cc-num");
const ccHint = document.getElementById("cc-hint");
const zipCodeInput = document.getElementById("zip");
const zipHint = document.getElementById("zip-hint");
const cvvFieldInput = document.getElementById("cvv");
const cvvHint = document.getElementById("cvv-hint");

//Add focus to the name field upon refresh.
nameField.focus();

//Hides the "Other job role" input field unless "Other" is selected in the "Job Role" dropdown.
otherJobRole.style.display = "none"; 
jobRole.addEventListener('change', (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = ""; 
    } else {
        otherJobRole.style.display = "none"; 
    }
});

/* Disables the shirt color menu until a shirt design is chosen.
 * Once chosen, this then narrows the colors available based on shirt design selected.
 */
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

//Add focus class to the activity checkboxes for accessibilty.
for (let i = 0; i < activityCheckboxes.length; i++){
    activityCheckboxes[i].addEventListener('focus', (e) => {
       e.target.parentElement.classList.add("focus");
    });
    activityCheckboxes[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove("focus");
    });
}

//Adds the cost of individual activites to total cost when an activity box is checked.
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

/* Hides all the payment options except credit card upon load and refresh.
 * If a different payment option is selected in the dropdown menu, 
 * its details are shown and credit card is hidden instead.
 */
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

//The following are helper functions used in the validation form listener below.

//Checks the Name field for a valid input. Also adds error messaging if the field is invalid.
function testValidName(e) {
    const testName = /^(.|\s)*\S(.|\s)*$/.test(nameField.value);
    if (testName === false) {
        nameField.parentElement.classList.add("not-valid");
        nameField.parentElement.classList.remove("valid");
        nameHint.style.display = "block";
        e.preventDefault();
    } else {
        nameField.parentElement.classList.remove("not-valid");
        nameField.parentElement.classList.add("valid");
        nameHint.style.display = "none";
    }
}

//Checks the Email field for a valid input. Also adds error messaging if the field is invalid.
function testValidEmail(e) {
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailAddressField.value);  //credit to Treehouse Unit 3: Regular Expressions in JavaScript course
    if (testEmail === false) {
        emailAddressField.parentElement.classList.add("not-valid");
        emailAddressField.parentElement.classList.remove("valid");
        emailHint.style.display = "block";
        e.preventDefault();
    } else {
        emailAddressField.parentElement.classList.remove("not-valid");
        emailAddressField.parentElement.classList.add("valid");
        emailHint.style.display = "none";
    }
}

//Checks the Activity Registration fieldset for at least one checked box. Also adds error messaging if the field is invalid.
function testValidActivities(e) {
    let checkedBoxes = 0;
    for (let i = 0; i < activityCheckboxes.length; i++) {
        if(activityCheckboxes[i].checked) checkedBoxes +=1};
        
        if(checkedBoxes === 0) {
            registerForActivities.parentElement.classList.add("not-valid");
            registerForActivities.parentElement.classList.remove("valid");
            activityHint.style.display = "block";
            e.preventDefault();    
        } else {
            registerForActivities.parentElement.classList.remove("not-valid");
            registerForActivities.parentElement.classList.add("valid");
            activityHint.style.display = "none";
        }
    }

/* Checks the Credit Card number, Zip code, and CVV fields for valid input. 
 * Also adds error messaging if any of the fields are invalid.
 */
function testValidCard(e) {
    const testCard = /^\d{13,16}$/.test(cardNumberInput.value);
    const testZip = /^\d{5}$/.test(zipCodeInput.value);
    const testCVV = /^\d{3}$/.test(cvvFieldInput.value);
  
    if(testCard === false) {
        cardNumberInput.parentElement.classList.add("not-valid");
        cardNumberInput.parentElement.classList.remove("valid");
        ccHint.style.display = "block";
        e.preventDefault();    
    } else {
        cardNumberInput.parentElement.classList.remove("not-valid");
        cardNumberInput.parentElement.classList.add("valid");
        ccHint.style.display = "none";
    }
   
    if(testZip === false) {
        zipCodeInput.parentElement.classList.add("not-valid");
        zipCodeInput.parentElement.classList.remove("valid");
        zipHint.style.display = "block";
        e.preventDefault();    
    } else {
        zipCodeInput.parentElement.classList.remove("not-valid");
        zipCodeInput.parentElement.classList.add("valid");
        zipHint.style.display = "none";
    }
    
    if(testCVV === false) {
        cvvFieldInput.parentElement.classList.add("not-valid");
        cvvFieldInput.parentElement.classList.remove("valid");
        cvvHint.style.display = "block";
        e.preventDefault();    
    } else {
        cvvFieldInput.parentElement.classList.remove("not-valid");
        cvvFieldInput.parentElement.classList.add("valid");
        cvvHint.style.display = "none";
    }
};

// Calls the helper functions for custom form validation for the name, email, activity, and payment fields.
form.addEventListener('submit', (e) => {
    testValidName(e);
    testValidEmail(e);
    testValidActivities(e);
    
    if(paymentSelection.value !== "bitcoin" && paymentSelection.value !== "paypal"){
        testValidCard(e);
    }   
});
