const show = document.getElementById("displayTableCont");
    const networkVal = document.getElementById("networkVal");
    const amountVal = document.getElementById("amountVal");

    let cards = [];
    let cardPin = "";
    let cardCode = {
      MTN: "*555*",
      GLO: "*123*",
      AIRTEL: "*126*",
      MOBILE: "*222*",
    };

    function handleClick() {
      cardPin = "";

      for (let index = 0; index < 12; index++) {
        cardPin += Math.floor(Math.random() * 10);
      }

      // document.getElementById("pinVal").value = cardPin;
      pinVal.value=cardPin;
    }

    function SaveBtn() {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();

      let networkSelect = networkVal.value;
      let choseAmount = amountVal.value;
      let pin = cardPin;
      let code = `${cardCode[networkSelect]}${pin}#`;
      let date = `${day}-${month}-${year}`;
      let dateused = `${day}-${month}-${year}`;

      let generated = {
        networkV: networkSelect,
        chooseVal: choseAmount,
        pinVal: pin,
        codeval: code,
        date: date,
        dateused: dateused,
        status: false,
      };
      cards.push(generated);

      displayAll();
    }

    function deleteList(index) {
      cards.splice(index, 1);
      displayAll();
    }

    function rechargeButton() {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();

      // let selectedCard = document.getElementById("enterPin").value.trim();
      let selectedCard = enterPin.value.trim();
      let selectPin = cards.find((index) => index.codeval === selectedCard);

      if (selectPin) {
        if (selectPin.status === true) {
          errorCode.innerHTML = "pin has been used";
          errorCode.style.color = "red";
          // alert("pin has been used");
        } else {
          selectPin.status = true;

          displayAll();
          errorCode.innerHTML = "Top-Up Successful";
          errorCode.style.color = 'white';
          // alert("Top-Up Successful");
        }
      } else {
        errorCode.innerHTML = 'Pin already exist';
          errorCode.style.color = 'green';
        // alert("pin already exist");
      }
    }

    function displayAll() {
      show.innerHTML = "";

      cards.forEach((element, index) => {
        show.innerHTML += `
          <div class="box1">
            <span>${index + 1}</span>
            <span>${element.networkV}</span>
            <span>${element.chooseVal}</span>
            <span>${element.pinVal}</span>
            <span>${element.codeval}</span>
            <span>${element.date}</span>
            <span>${element.dateused}</span>
            <span>${element.status ? "used" : "unused"}</span>
            <button onclick="deleteList(${index})">Delete</button>
          </div>
        `;

      });

      localStorage.setItem("cards", JSON.stringify(cards));
    }

    function getLocalData() {
      saveData = localStorage.getItem("cards");
      if (saveData) {
        cards = JSON.parse(saveData);
        displayAll();
      }
    }
    getLocalData();