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

