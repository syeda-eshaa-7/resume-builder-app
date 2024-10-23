"use strict";
// Define types for validation regex
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;
const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};
// User input elements
let firstnameElem = mainForm.firstname, middlenameElem = mainForm.middlename, lastnameElem = mainForm.lastname, imageElem = mainForm.image, designationElem = mainForm.designation, addressElem = mainForm.address, emailElem = mainForm.email, phonenoElem = mainForm.phoneno, summaryElem = mainForm.summary;
// Display elements
let nameDsp = document.getElementById('fullname_dsp'), imageDsp = document.getElementById('image_dsp'), phonenoDsp = document.getElementById('phoneno_dsp'), emailDsp = document.getElementById('email_dsp'), addressDsp = document.getElementById('address_dsp'), designationDsp = document.getElementById('designation_dsp'), summaryDsp = document.getElementById('summary_dsp'), projectsDsp = document.getElementById('projects_dsp'), achievementsDsp = document.getElementById('achievements_dsp'), skillsDsp = document.getElementById('skills_dsp'), educationsDsp = document.getElementById('educations_dsp'), experiencesDsp = document.getElementById('experiences_dsp');
// Function to fetch values
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];
    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
// Function to get user inputs
const getUserInputs = () => {
    // Achievements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'), achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    // Experiences
    let expTitleElem = document.querySelectorAll('.exp_title'), expOrganizationElem = document.querySelectorAll('.exp_organization'), expLocationElem = document.querySelectorAll('.exp_location'), expStartDateElem = document.querySelectorAll('.exp_start_date'), expEndDateElem = document.querySelectorAll('.exp_end_date'), expDescriptionElem = document.querySelectorAll('.exp_description');
    // Education
    let eduSchoolElem = document.querySelectorAll('.edu_school'), eduDegreeElem = document.querySelectorAll('.edu_degree'), eduCityElem = document.querySelectorAll('.edu_city'), eduStartDateElem = document.querySelectorAll('.edu_start_date'), eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'), eduDescriptionElem = document.querySelectorAll('.edu_description');
    let projTitleElem = document.querySelectorAll('.proj_title'), projLinkElem = document.querySelectorAll('.proj_link'), projDescriptionElem = document.querySelectorAll('.proj_description');
    let skillElem = document.querySelectorAll('.skill');
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};
// Function to validate form data
function validateFormData(elem, elemType, elemName) {
    if (elemType == validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length == 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType == validType.TEXT_EMP) {
        if (!strRegex.test(elem.value))
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType == validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length == 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType == validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length == 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType == validType.ANY) {
        if (elem.value.trim().length == 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
}
// Function to add error message
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}
// Function to remove error message
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = "";
}
// Function to display list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};
// Function to display the CV
const displayCV = (userData) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
    let tempImage = URL.createObjectURL(imageElem.files[0]);
    imageDsp.src = tempImage;
};
// Event listener for form submission
mainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let userData = getUserInputs();
    validateFormData(firstnameElem, validType.TEXT, 'First Name');
    validateFormData(middlenameElem, validType.TEXT_EMP, 'Middle Name');
    validateFormData(lastnameElem, validType.TEXT, 'Last Name');
    validateFormData(emailElem, validType.EMAIL, 'Email');
    validateFormData(phonenoElem, validType.PHONENO, 'Phone Number');
    validateFormData(summaryElem, validType.ANY, 'Summary');
    validateFormData(designationElem, validType.ANY, 'Designation');
    displayCV(userData);
});
const generateCV = () => {
    let userData = getUserInputs();
    if (validateAllFields(userData)) {
        displayCV(userData);
        console.log(userData); // Logging the collected data
    }
    else {
        console.log("Please fill in all required fields.");
    }
};
const validateAllFields = (userData) => {
    // Add validation checks for required fields (e.g., firstname, email, etc.)
    return userData.firstname && userData.lastname && userData.email;
};
// print CV
function printCV(){
    window.print();
}
