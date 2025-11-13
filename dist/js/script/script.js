"use strict";
console.log(11203);
const billInput = document.getElementById("bill");
const customInput = document.getElementById("custom");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".buttons button");
let isActiveTip = false;
const aggregateEventData = () => {
    var _a;
    let bill, customTip, people;
    if (peopleInput.valueAsNumber)
        people = Math.abs(Math.round(peopleInput.valueAsNumber * 100) / 100);
    if (billInput.valueAsNumber)
        bill = Math.abs(Math.round(billInput.valueAsNumber * 100) / 100);
    if (!isActiveTip) {
        if (customInput.valueAsNumber)
            customTip = Math.floor(customInput.valueAsNumber);
    }
    else {
        const value = (_a = document.querySelector(".active")) === null || _a === void 0 ? void 0 : _a.value;
        customTip = Number(value);
    }
    showResults(bill, people, customTip);
};
const showResults = (bill = 0, people = 0, customTip = 0) => {
    console.log("Wyniki:");
    console.log(bill);
    console.log(people);
    console.log(customTip);
};
billInput === null || billInput === void 0 ? void 0 : billInput.addEventListener("keyup", aggregateEventData);
customInput === null || customInput === void 0 ? void 0 : customInput.addEventListener("keyup", (event) => {
    var _a;
    const target = event.target;
    if (isActiveTip) {
        (_a = document.querySelector(".active")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        isActiveTip = !isActiveTip;
    }
    console.log(target.valueAsNumber);
    if (target.valueAsNumber < 1 || target.valueAsNumber > 100) {
        target.value = "";
    }
    aggregateEventData();
});
peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.addEventListener("keyup", aggregateEventData);
tipButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        var _a;
        const target = event.target;
        if (target.classList.contains("active")) {
            target.classList.remove("active");
            isActiveTip = false;
            aggregateEventData();
            return;
        }
        if (!isActiveTip) {
            if (customInput.valueAsNumber !== 0)
                customInput.value = "";
            button.classList.add("active");
            isActiveTip = true;
            aggregateEventData();
            return;
        }
        (_a = document.querySelector(".active")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        button.classList.add("active");
        isActiveTip = true;
        aggregateEventData();
    });
});
//# sourceMappingURL=script.js.map