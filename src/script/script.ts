console.log(11203);

const billInput = document.getElementById("bill") as HTMLInputElement;
const customInput = document.getElementById("custom") as HTMLInputElement;
const peopleInput = document.getElementById("people") as HTMLInputElement;
const tipButtons = document.querySelectorAll(".buttons button");

let isActiveTip = false;

const aggregateEventData = () => {
  let bill, customTip, people;

  if (peopleInput.valueAsNumber)
    people = Math.abs(Math.round(peopleInput.valueAsNumber * 100) / 100);

  if (billInput.valueAsNumber)
    bill = Math.abs(Math.round(billInput.valueAsNumber * 100) / 100);

  if (!isActiveTip) {
    if (customInput.valueAsNumber)
      customTip = Math.floor(customInput.valueAsNumber);
  } else {
    const value = document.querySelector<HTMLButtonElement>(".active")?.value;
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

billInput?.addEventListener("keyup", aggregateEventData);

customInput?.addEventListener("keyup", (event) => {
  const target = event.target as HTMLInputElement;

  if (isActiveTip) {
    document.querySelector(".active")?.classList.remove("active");
    isActiveTip = !isActiveTip;
  }
  console.log(target.valueAsNumber);
  if (target.valueAsNumber < 1 || target.valueAsNumber > 100) {
    target.value = "";
  }
  aggregateEventData();
});

peopleInput?.addEventListener("keyup", aggregateEventData);

tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("active")) {
      target.classList.remove("active");
      isActiveTip = false;
      aggregateEventData();
      return;
    }

    if (!isActiveTip) {
      if (customInput.valueAsNumber !== 0) customInput.value = "";
      button.classList.add("active");
      isActiveTip = true;
      aggregateEventData();
      return;
    }
    document.querySelector(".active")?.classList.remove("active");
    button.classList.add("active");
    isActiveTip = true;
    aggregateEventData();
  });
});
