const nameField = document.getElementById("name");
nameField.focus();

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
