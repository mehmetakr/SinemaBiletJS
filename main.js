//console.log("Baglantı kontrolü")

// 1. AŞAMA  tum koltukların kapsayıcısı container divi  cek
// 2. Containera  click eventi ekle
//Html tarafından queryselector ile classname üzerinden eleman çekme
const container = document.querySelector(".container");
//html tarafından çekilen elemanın kontrolü
//console.log(container);

const infotext = document.querySelector(".infotext");
const movielist = document.querySelector("#movie");

const seatcount = document.getElementById("count");

const totalAmount = document.getElementById("amount");

const seats = document.querySelectorAll(".seat:not(.reserved)");

// console.log(seats)

const saveToDatabase = (index) => {
  //console.log("data",index)

  localStorage.setItem("seatsIndex", JSON.stringify(index));

  //FİLM VERİSİ KAYDI

  localStorage.setItem("movieindex", JSON.stringify(movielist.selectedIndex));
};
const getFromDatabase = () => {
  const dbselectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));

  // console.log(dbselectedSeats)

  if (dbselectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbselectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

const dbselectedMovie =JSON.parse( localStorage.getItem('movieindex'))
movielist.selectedIndex=dbselectedMovie

};

getFromDatabase();

const createIndex = () => {
  let allseatsarray = [];

  seats.forEach((seat) => {
    allseatsarray.push(seat);
  });

  //console.log(allseatsarray);

  const allselectseatsArray = [];
  //  console.log('50',getFromDatabase())
  const allselectseats = container.querySelectorAll(".seat.selected");

  allselectseats.forEach((selectedSeat) => {
    allselectseatsArray.push(selectedSeat);
  });
  //console.log(allselectseatsArray)

  const selectedseatsIndex = allselectseatsArray.map((selectedSeat) => {
    return allseatsarray.indexOf(selectedSeat);
  });
  console.log(selectedseatsIndex);

  saveToDatabase(selectedseatsIndex);
};
const calculateTotal = () => {
  createIndex();
  let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
  seatcount.innerText = selectedSeatCount;

  // console.log(selectedSeatCount)

  totalAmount.innerText = selectedSeatCount * movielist.value;
  console.log(totalAmount);

  if (selectedSeatCount) {
    infotext.classList.add("open");
  } else {
    infotext.classList.remove("open");
  }
};

calculateTotal();
container.addEventListener("click", (pointerEvent) => {
  //console.log(pointerEvent.target.offsetParent)

  const clickedseat = pointerEvent.target.offsetParent;

  if (
    clickedseat.classList.contains("seat") &&
    !clickedseat.classList.contains("reserved")
  ) {
    clickedseat.classList.toggle("selected");
  }
  calculateTotal();
});

movielist.addEventListener("change", () => {
  calculateTotal();
});
