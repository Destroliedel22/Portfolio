console.clear();
const letterHovers = document.querySelectorAll(".letterHover");

letterHovers.forEach(letterHover => {
  const letterArray = letterHover.innerHTML.replace(/\s/g, "\u00A0").split("");
  letterHover.innerHTML = '';

  letterArray.forEach(letter => {
    let span = document.createElement("span");
    let letterNode = document.createTextNode(letter);

    span.classList.add("letterAnim");
    span.appendChild(letterNode);
    letterHover.appendChild(span);

    const randomDeg = Math.floor(Math.random() * 20)-10;
    span.style.setProperty('--deg', `${randomDeg}deg`)
  });
});
