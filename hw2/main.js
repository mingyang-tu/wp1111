const mainBlock = document.getElementById("GM-main");
const Colors = [
    "#FDAC53", "#B55A30", "#0072B5",
    "#E9897E", "#00A170", "#926AA6",
    "#D2386C", "#CD212A", "#FFA500",
    "#4B5335", "#798EA4", "#FA7A35",
    "#00758F", "#9C4722", "#6B5876"
];
let numPerson = Math.floor(Math.random() * 15 + 1);
let haveHost = true;
let addPerson = document.getElementById("add-button-block");
if (numPerson + Number(haveHost) > 15) {
    addPerson.style.cursor = "not-allowed";
}
function AddNewPerson() {
    if (numPerson + Number(haveHost) <= 15) {
        if (numPerson === 0) {
            let peopleBlock = document.createElement("div");
            peopleBlock.setAttribute("id", "GM-people-block");
            mainBlock.appendChild(peopleBlock);
        }
        let peopleBlock = document.getElementById("GM-people-block");
        peopleBlock.appendChild(
            new Person(
                "Eric Bear", 
                "EB",
                "#8B4513", 
                false
            ).Node
        );
        numPerson++;
        if (numPerson + Number(haveHost) > 15) {
            addPerson.style.cursor = "not-allowed";
        }
        ChecknumPerson(numPerson, haveHost);
    }
}
addPerson.addEventListener("click", function () {
    AddNewPerson();
});

function setpersonWidthHeight(n, col, hh) {
    let personClass = document.getElementsByClassName("person");
    if (!hh) {
        col = Math.ceil(n / col);
    }
    let w = 100 / col - 1;
    let h = 100 / Math.ceil(n / col) - 1;
    let full = col * Math.floor(n / col);
    
    for (let i = 0; i < full; i++) {
        personClass[i].style.width = w.toString() + '%';
        personClass[i].style.height = h.toString() + '%';
    }
    let wBot = 100 / (n - full + 0.5) - 1;
    for (let i = full; i < n; i++) {
        personClass[i].style.width = wBot.toString() + '%';
        personClass[i].style.height = h.toString() + '%';
    }
}
function ChecknumPerson(num, hh) {
    let col;
    if (hh) {
        if (num < 5) col = 1;
        else if (num < 10) col = 2;
        else col = 3;
        setpersonWidthHeight(num, col, hh);
    }
    else {
        if (num < 3) col = 1;
        else if (num < 9) col = 2;
        else col = 3;
        setpersonWidthHeight(num, col, hh);
    }
    if (numPerson === 0) {
        mainBlock.removeChild(document.getElementById("GM-people-block"));
    }
}

class Person {
    constructor(name, photo, iconColor, myself) {
        this._node = document.createElement("div");
        this._node.classList.add("person");
        // mute
        let mute = document.createElement("img");
        mute.src = "figure/mute.png";
        mute.classList.add("person-mute-block");
        this._node.appendChild(mute);
        // personal icon
        let personalIcon = document.createElement("div");
        personalIcon.classList.add("person-photo-block");
        personalIcon.style.backgroundColor = iconColor;
        this._node.appendChild(personalIcon);
        // text inside icon
        let textIcon = document.createElement("p");
        textIcon.innerText = photo;
        textIcon.style.fontSize = "20px";
        personalIcon.appendChild(textIcon);
        // name
        let personName = document.createElement("p");
        personName.classList.add("person-name-block");
        personName.innerText = name;
        this._node.appendChild(personName);

        this._node.myself = myself;

        // close
        if (!myself) {
            let close = document.createElement("img");
            close.src = "figure/close.png";
            close.classList.add("person-close-block");
            this._node.appendChild(close);
            close.addEventListener("click", function () {
                close.parentNode.parentNode.removeChild(close.parentNode);
                numPerson--;
                ChecknumPerson(numPerson, haveHost);
                addPerson.style.cursor = "pointer";
            });
        }
        // ellipse
        let ellipse = document.createElement("img");
        ellipse.src = "figure/host-button.png";
        ellipse.classList.add("person-buttons");
        this._node.appendChild(ellipse);

        ellipse.addEventListener("click", function () {
            let peopleBlock = document.getElementById("GM-people-block");
            if (haveHost) {
                peopleBlock.appendChild(
                    new Person(
                        document.getElementById("host-name").children[2].innerText, 
                        document.getElementById("host").children[0].innerText,
                        document.getElementById("host").style.backgroundColor, 
                        document.getElementById("GM-host-block").myself
                    ).Node
                );
                numPerson++;
                mainBlock.removeChild(document.getElementById("GM-host-block"));
            }
            mainBlock.insertBefore(
                new Host(
                    name, 
                    photo,
                    iconColor, 
                    myself
                ).Node, 
                peopleBlock
            );
            numPerson--;
            haveHost = true;
            ellipse.parentNode.parentNode.removeChild(ellipse.parentNode);
            ChecknumPerson(numPerson, haveHost);
        });
    }
    get Node() {
        return this._node;
    }
}
class Host {
    constructor(name, photo, iconColor, myself) {
        this._node = document.createElement("div");
        this._node.setAttribute("id", "GM-host-block");
        // mute
        let mute = document.createElement("img");
        mute.src = "figure/mute.png";
        mute.classList.add("person-mute-block");
        this._node.appendChild(mute);
        // personal icon
        let personalIcon = document.createElement("div");
        personalIcon.setAttribute("id", "host");
        personalIcon.style.backgroundColor = iconColor;
        this._node.appendChild(personalIcon);
        // text inside icon
        let textIcon = document.createElement("p");
        textIcon.innerText = photo;
        textIcon.style.fontSize = "56px";
        personalIcon.appendChild(textIcon);
        // name
        let hostName = document.createElement("p");
        hostName.setAttribute("id", "host-name");
        this._node.appendChild(hostName);
        // inside name
        let pin = document.createElement("img");
        pin.src = "figure/pin.png";
        pin.classList.add("buttons");
        hostName.appendChild(pin);
        let space = document.createElement("div");
        space.classList.add("space-1");
        hostName.appendChild(space);
        let hostP = document.createElement("p");
        hostP.innerText = name;
        hostName.appendChild(hostP);
        // ellipse
        let ellipse = document.createElement("img");
        ellipse.src = "figure/host-button.png";
        ellipse.setAttribute("id", "host-buttons");
        this._node.appendChild(ellipse);

        this._node.myself = myself

        ellipse.addEventListener("click", function () {
            if (numPerson === 0) {
                let peopleBlock = document.createElement("div");
                peopleBlock.setAttribute("id", "GM-people-block");
                mainBlock.appendChild(peopleBlock);
            }
            let peopleBlock = document.getElementById("GM-people-block");
            peopleBlock.appendChild(
                new Person(
                    name, 
                    photo,
                    iconColor, 
                    myself
                ).Node
            );
            numPerson++;
            haveHost = false;
            ellipse.parentNode.parentNode.removeChild(ellipse.parentNode);
            ChecknumPerson(numPerson, haveHost);
        });
    }
    get Node() {
        return this._node;
    }
}

let hostBlock = new Host("你", "鐘揚", "darkgreen", true).Node;
let peopleBlock = document.createElement("div");
peopleBlock.setAttribute("id", "GM-people-block");
mainBlock.appendChild(hostBlock);
mainBlock.appendChild(peopleBlock);

for (let i = 0; i < numPerson; i++) {
    let temp = String.fromCharCode(65 + i);
    peopleBlock.appendChild(
        new Person(
            temp + " 同學",
            temp,
            Colors[i],
            false
        ).Node
    );
}
ChecknumPerson(numPerson, haveHost);

function getTime(){
    let datetime = new Date();
    let now = datetime.toTimeString().slice(0, 5);
    let prefix;
    if ((datetime.getHours() >= 0) && (datetime.getHours() <= 5)) {
        prefix = "凌晨";
    }
    else if ((datetime.getHours() >= 6) && (datetime.getHours() <= 11)) {
        prefix = "上午";
    }
    else if ((datetime.getHours() >= 12) && (datetime.getHours() <= 17)) {
        prefix = "下午";
    }
    else {
        prefix = "晚上";
    }
    document.getElementById("clock").innerText = prefix + ' ' + now + "｜Web Programming";
    setTimeout(getTime, 500);
}
getTime();
