
// Define types for validation regex
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex: RegExp = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;

const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
} as const;

type ValidType = typeof validType[keyof typeof validType];

// User input elements
let firstnameElem = mainForm.firstname as HTMLInputElement,
    middlenameElem = mainForm.middlename as HTMLInputElement,
    lastnameElem = mainForm.lastname as HTMLInputElement,
    imageElem = mainForm.image as HTMLInputElement,
    designationElem = mainForm.designation as HTMLInputElement,
    addressElem = mainForm.address as HTMLInputElement,
    emailElem = mainForm.email as HTMLInputElement,
    phonenoElem = mainForm.phoneno as HTMLInputElement,
    summaryElem = mainForm.summary as HTMLInputElement;

// Display elements
let nameDsp = document.getElementById('fullname_dsp') as HTMLElement,
    imageDsp = document.getElementById('image_dsp') as HTMLImageElement,
    phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement,
    emailDsp = document.getElementById('email_dsp') as HTMLElement,
    addressDsp = document.getElementById('address_dsp') as HTMLElement,
    designationDsp = document.getElementById('designation_dsp') as HTMLElement,
    summaryDsp = document.getElementById('summary_dsp') as HTMLElement,
    projectsDsp = document.getElementById('projects_dsp') as HTMLElement,
    achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement,
    skillsDsp = document.getElementById('skills_dsp') as HTMLElement,
    educationsDsp = document.getElementById('educations_dsp') as HTMLElement,
    experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

// Function to fetch values
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement>[]): object[] => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr: object[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj: Record<string, string> = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

// Function to get user inputs
const getUserInputs = (): Record<string, any> => {
    // Achievements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>,
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>;

    // Experiences
    let expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>,
        expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>,
        expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>,
        expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>,
        expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>,
        expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLInputElement>;

    // Education
    let eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>,
        eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>,
        eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>,
        eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>,
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>,
        eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLInputElement>;

    let projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>,
        projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>,
        projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLInputElement>;

    let skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

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
function validateFormData(elem: HTMLInputElement, elemType: ValidType, elemName: string) {
    if (elemType == validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType == validType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType == validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType == validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType == validType.ANY) {
        if (elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// Function to add error message
function addErrMsg(formElem: HTMLInputElement, formElemName: string) {
    formElem.nextElementSibling!.innerHTML = `${formElemName} is invalid`;
}

// Function to remove error message
function removeErrMsg(formElem: HTMLInputElement) {
    formElem.nextElementSibling!.innerHTML = "";
}

// Function to display list data
const showListData = (listData: object[], listContainer: HTMLElement) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        for (const key in listItem) {
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key as keyof typeof listItem]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    });
};

// Function to display the CV
const displayCV = (userData: Record<string, any>) => {
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

    let tempImage = URL.createObjectURL(imageElem.files![0]);
    imageDsp.src = tempImage;
};

// Event listener for form submission
mainForm.addEventListener('submit', (event: Event) => {
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
    if(validateAllFields(userData)) {
        displayCV(userData);
        console.log(userData); // Logging the collected data
    } else {
        console.log("Please fill in all required fields.");
    }
}

const validateAllFields = (userData) => {
    // Add validation checks for required fields 
    return userData.firstname && userData.lastname && userData.email;
}


