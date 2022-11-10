const fs = require("fs");
const path = require("path");

let settings = fs.readFileSync(path.join(__dirname, "settings.json"));
settings = JSON.parse(settings);
let names = fs.readFileSync(path.join(__dirname, "configs", "names.json"));
names = JSON.parse(names);
let password = fs.readFileSync(path.join(__dirname, "configs", "password.json"));
password = JSON.parse(password);

let lowercase = "abcdefghijklmnopqrstuvwxyz";
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = '0123456789';
let symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

function getLowerCase() {
    return lowercase[Math.floor(Math.random() * lowercase.length)];
}

function getUpperCase() {
    return uppercase[Math.floor(Math.random() * uppercase.length)];
}

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    // Pages
    let dashboardPage = document.getElementById("dashboard");
    let passwordPage = document.getElementById("password");
    let namePage = document.getElementById("name");
    let settingsPage = document.getElementById("settings");

    // Buttons
    let indexButton = document.getElementById("index");
    let passwordButton = document.getElementById("passwords");
    let nameButton = document.getElementById("names");
    let settingsButton = document.getElementById("settingss");

    // Password
    let passwordSpan = document.getElementById("passwordSpan");
    let passwordLength = document.getElementById("passwordLength");
    let passwordName = document.getElementById("passwordName")
    let upperCase = document.getElementById("uppercase");
    let lowerCase = document.getElementById("lowercase");
    let number = document.getElementById("number");
    let symbol = document.getElementById("symbol");
    let getReload = document.getElementById("reload");
    let getSave = document.getElementById("save");

    // Import Password
    let existName = document.getElementById("existName");
    let existPassword = document.getElementById("existPassword");
    let existSave = document.getElementById("existsave");

    // Settings
    let rpc = document.getElementById("rpc");
    let autostart = document.getElementById("start");

    // Toast
    let text1 = document.getElementById("text-1");
    let text2 = document.getElementById("text-2");
    let closeIcon = document.querySelector(".close");
    let toast = document.querySelector(".toast");
    let progress = document.querySelector(".progress");
    let timer1, timer2;

    async function loadPassword() {
        let passwords = document.getElementById("psws");

        if(passwords) {
            password.forEach(psw => {
                let html_element = `<div class="pwd"><p class"pw-title">${psw.name}</p><div class="pw-password"><p id="text" class="pw-text">${psw.password}</p><a class="pw-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard icon" viewBox="0 0 16 16" id="icon">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg></a></div></div>`;
                passwords.innerHTML += html_element
            });
        }
        
    }
    loadPassword()

    let pw_icon = document.querySelectorAll(".icon");

    for (let i = 0; i < pw_icon.length; i++) {
        pw_icon[i].addEventListener("click", (e) => {
            let text = pw_icon[i].closest(".pwd").querySelector(".pw-text").textContent;

            navigator.clipboard.writeText(text);
            toast.classList.add("active");
            progress.classList.add("active");

            text1.innerText = `Successfully Copied!`;
            text2.innerText = `Password: ${text.slice(0, 20)}`

            tiemr1 = setTimeout(() => {
                toast.classList.remove("active");
            }, 5000)

            timer2 = setTimeout(() => {
                progress.classList.remove("active")
            }, 5300);
        });
    }

    closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");

        setTimeout(() => {
            progress.classList.remove("active");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
    })

    function loadSettings() {
        if(settings.autoStart == false) {
            autostart.checked = false;
        } else {
            autostart.checked = true;
        }

        if(settings.discord_rpc == false) {
            rpc.checked = false;
        } else {
            rpc.checked = true;
        }
    }

    loadSettings()

    function generatePassword () {
        var password = "";

        if(upperCase.checked) {
            password += getUpperCase();
        }
        
        if(lowerCase.checked) {
            password += getLowerCase();
        }
        
        if(number.checked) {
            password += getNumbers();
        }
        
        if(symbol.checked) {
            password += getSymbol();
        }
        
        for (let i = password.length; i < passwordLength.value; i++) {
            const password_output = passwordArray()
            password += password_output;
        }
        
        return passwordSpan.innerText = password;
    }
    
    function passwordArray() {
        const password_Array = [];
        if(upperCase.checked) {
            password_Array.push(getUpperCase());
        }
    
        if(lowerCase.checked) {
            password_Array.push(getLowerCase());
        }
    
        if(number.checked) {
            password_Array.push(getNumbers());
        }
    
        if(symbol.checked) {
            password_Array.push(getSymbol());
        }
    
        if(password_Array.length === 0) return "";
    
        return password_Array[Math.floor(Math.random() * password_Array.length)]
    }
    
    async function managePasswords() {
        let manage_passwords = document.getElementById("manage-passwords");

        password.forEach(value => {
            let html_element = `<div class="mg-password"><h4 class="mg-name" id="mg-name">${value.name}</h4>
            <div class="mg-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise mg-reload" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash mg-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
            </div>`

            manage_passwords.innerHTML += html_element
        })
    }
    
    managePasswords()

    let mg_reload = document.querySelectorAll(".mg-reload");
    let mg_trash = document.querySelectorAll(".mg-trash");

    for(let i = 0; i < mg_trash.length; i++) {
        mg_trash[i].addEventListener("click", () => {
            let text = mg_trash[i].closest(".mg-password").querySelector(".mg-name").textContent;
            
            const fileData = JSON.parse(fs.readFileSync(path.join(__dirname, "configs", "password.json")));
            
            let fileData_filter = fileData.filter(value => value.name != text);

            toast.classList.add("active");
            progress.classList.add("active");

            toast.classList.add("error");

            text1.innerText = `Password deleted`;
            text2.innerText = `${text} was deleted!`

            timer1 = setTimeout(() => {
                toast.classList.remove("active");
                toast.classList.remove("error");
            }, 5000)

            timer2 = setTimeout(() => {
                progress.classList.remove("active")
            }, 5300);

            fs.writeFileSync(path.join(__dirname, "configs", "password.json"), JSON.stringify(fileData_filter, null, 2));
        })
    }

    for(let i = 0; i < mg_reload.length; i++) {
        mg_reload[i].addEventListener("click", () => {
            let text = mg_reload[i].closest(".mg-password").querySelector(".mg-name").textContent;
            
            const fileData = JSON.parse(fs.readFileSync(path.join(__dirname, "configs", "password.json")));
            let filecontext = fileData.findIndex(a => a.name === text);

            toast.classList.add("active");
            progress.classList.add("active");

            text1.innerText = `New Password`;
            text2.innerText = `New password for ${text}`

            timer1 = setTimeout(() => {
                toast.classList.remove("active");
            }, 5000)

            timer2 = setTimeout(() => {
                progress.classList.remove("active")
            }, 5300);
            
            let newArray = fileData.map(value => {
                if(value.name === text) {
                    return {...value, password: generatePassword()}
                }

                return value;
            })
            
            fs.writeFileSync(path.join(__dirname, "configs", "password.json"), JSON.stringify(newArray, null, 2))
        })
    }

    
    symbol.onchange = function() {
        generatePassword()
    }
        
    number.onchange = function() {
        generatePassword()
    }
    
    lowerCase.onchange = function() {
        generatePassword()
    }
    
    upperCase.onchange = function() {
        generatePassword()
    }
    
    getReload.onclick = function() {
        generatePassword()
    }

    getSave.onclick = function() {
        if(passwordName.value == '') {
            toast.classList.add("active");
            progress.classList.add("active");

            toast.classList.add("error");

            text1.innerText = `Error`;
            text2.innerText = `Please enter a name for the password!`

            timer1 = setTimeout(() => {
                toast.classList.remove("active");
                toast.classList.remove("error");
            }, 5000)

            timer2 = setTimeout(() => {
                progress.classList.remove("active")
            }, 5300);
            return;
        }
            
        let passwordArray = {
            name: passwordName.value,
            password: passwordSpan.innerText
        }
        
        toast.classList.add("active");
        progress.classList.add("active");

        text1.innerText = `Successfully add Password`;
        text2.innerText = `${passwordName.value} was added to the list.`;

        tiemr1 = setTimeout(() => {
            toast.classList.remove("active");
        }, 5000)

        timer2 = setTimeout(() => {
            progress.classList.remove("active")
        }, 5300);

        const fileData = JSON.parse(fs.readFileSync(path.join(__dirname, "configs", "password.json")));
        fileData.push(passwordArray);
        fs.writeFileSync(path.join(__dirname, "configs", "password.json"), JSON.stringify(fileData, null, 2));
    }

    existSave.onclick = function() {
        if(existName.value == '') {
            return;
        }

        let passwordArray = {
            name: existName.value,
            password: existPassword.value
        };

        const fileData = JSON.parse(fs.readFileSync(path.join(__dirname, "configs", "password.json")));
        fileData.push(passwordArray);
        return fs.writeFileSync(path.join(__dirname, "configs", "password.json"), JSON.stringify(fileData, null, 2));
    }

    indexButton.onclick = function() {
        dashboardPage.classList.add("activePage");
        passwordPage.classList.remove("activePage");
        namePage.classList.remove("activePage");
        settingsPage.classList.remove("activePage");

        settingsButton.classList.remove("active");
        indexButton.classList.add("active");
        passwordButton.classList.remove("active");
        nameButton.classList.remove("active");
    }

    passwordButton.onclick = function() {
        passwordPage.classList.add("activePage");
        dashboardPage.classList.remove("activePage");
        namePage.classList.remove("activePage");
        settingsPage.classList.remove("activePage");

        settingsButton.classList.remove("active");
        passwordButton.classList.add("active");
        indexButton.classList.remove("active");
        nameButton.classList.remove("active");
    }

    nameButton.onclick = function() {
        namePage.classList.add("activePage");
        dashboardPage.classList.remove("activePage");
        passwordPage.classList.remove("activePage");
        settingsPage.classList.remove("activePage");

        settingsButton.classList.remove("active");
        nameButton.classList.add("active");
        indexButton.classList.remove("active");
        passwordButton.classList.remove("active");
    }

    settingsButton.onclick = function() {
        settingsPage.classList.add("activePage");
        dashboardPage.classList.remove("activePage");
        passwordPage.classList.remove("activePage");
        namePage.classList.remove("activePage");

        settingsButton.classList.add("active");
        indexButton.classList.remove("active");
        passwordButton.classList.remove("active");
        nameButton.classList.remove("active")
    }

    rpc.onchange = function() {
        if(settings.discord_rpc == false) {
            settings.discord_rpc = true;
        } else {
            settings.discord_rpc = false;
        }

        fs.writeFileSync(path.join(__dirname, "settings.json"), JSON.stringify(settings, null, 2));
    }

    autostart.onchange = function() {
        if(settings.autoStart == false) {
            settings.autoStart = true;
        } else {
            settings.autoStart = false;
        }

        fs.writeFileSync(path.join(__dirname, "settings.json"), JSON.stringify(settings, null, 2));
    }
})