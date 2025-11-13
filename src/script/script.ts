const billInput = document.getElementById("bill") as HTMLInputElement;
const customInput = document.getElementById("custom") as HTMLInputElement;
const peopleInput = document.getElementById("people") as HTMLInputElement;
const tipButtons = document.querySelectorAll(".buttons button");

const tipAmountContainer = document.querySelector("#amount h3");
const totalResultContainer = document.querySelector("#total h3");

const resetButton = document.getElementById("reset");

let isActiveTip = false;

const aggregateEventData = () => {
  let bill, customTip, people;
  resetButton?.setAttribute("disabled", "disabled");
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

  calculateResult(bill, people, customTip);
};

const calculateResult = (bill = 0, people = 1, customTip = 0) => {
  const tipPercentage = customTip / 100 + 1;
  let tipAmount, totalResult;
  if (!customTip) {
    tipAmount = 0;
    totalResult = Math.round((bill / people) * 100) / 100;
  } else {
    tipAmount =
      Math.round(((bill * tipPercentage - bill) / people) * 100) / 100;
    totalResult = Math.round(((bill * tipPercentage) / people) * 100) / 100;
  }

  showResults(tipAmount, totalResult);
};

const showResults = (tipAmount: number, totalResult: number) => {
  if (totalResult !== 0) resetButton?.removeAttribute("disabled");
  if (tipAmountContainer)
    tipAmountContainer.innerHTML = `$${tipAmount.toFixed(2)}`;
  if (totalResultContainer)
    totalResultContainer.innerHTML = `$${totalResult.toFixed(2)}`;
};

billInput?.addEventListener("keyup", aggregateEventData);

customInput?.addEventListener("keyup", (event) => {
  const target = event.target as HTMLInputElement;

  if (isActiveTip) {
    document.querySelector(".active")?.classList.remove("active");
    isActiveTip = !isActiveTip;
  }
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

resetButton?.addEventListener("click", () => {
  billInput.value = "";
  customInput.value = "";
  peopleInput.value = "";
  if (isActiveTip) {
    document.querySelector(".active")?.classList.remove("active");
    isActiveTip = false;
  }
  aggregateEventData();
});
