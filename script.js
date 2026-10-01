// RailReserve Enhanced Frontend
// Data is intentionally stored in localStorage because this is a frontend-only demo.

let bookings = JSON.parse(localStorage.getItem("railreserve_bookings")) || [];
let tempBooking = {};
let selectedTrain = null;

const trains = [
  {
    name: "Vande Bharat Express",
    number: "22457",
    from: "Bhopal",
    to: "Delhi",
    dep: "05:30",
    arr: "11:40",
    duration: "6h 10m",
    classes: ["EC", "2A"],
    fare: 1499,
    seats: 42
  },
  {
    name: "Shatabdi Express",
    number: "12001",
    from: "Bhopal",
    to: "Delhi",
    dep: "06:00",
    arr: "12:10",
    duration: "6h 10m",
    classes: ["CC", "EC"],
    fare: 899,
    seats: 27
  },
  {
    name: "Rajdhani Express",
    number: "12437",
    from: "Bhopal",
    to: "Delhi",
    dep: "21:10",
    arr: "05:30",
    duration: "8h 20m",
    classes: ["2A", "3A"],
    fare: 1240,
    seats: 18
  },
  {
    name: "Malwa Express",
    number: "12919",
    from: "Bhopal",
    to: "Delhi",
    dep: "20:20",
    arr: "06:30",
    duration: "10h 10m",
    classes: ["Sleeper", "3A", "2A"],
    fare: 620,
    seats: 56
  },
  {
    name: "Punjab Mail",
    number: "12137",
    from: "Bhopal",
    to: "Mumbai",
    dep: "16:10",
    arr: "07:20",
    duration: "15h 10m",
    classes: ["Sleeper", "3A", "2A"],
    fare: 710,
    seats: 34
  },
  {
    name: "Gatimaan Express",
    number: "12049",
    from: "Delhi",
    to: "Lucknow",
    dep: "08:10",
    arr: "12:35",
    duration: "4h 25m",
    classes: ["CC", "EC"],
    fare: 820,
    seats: 31
  },
  {
    name: "Avadh Express",
    number: "19038",
    from: "Mumbai",
    to: "Lucknow",
    dep: "22:15",
    arr: "04:50",
    duration: "30h 35m",
    classes: ["Sleeper", "3A", "2A"],
    fare: 910,
    seats: 25
  },
  {
    name: "Deccan Queen",
    number: "12123",
    from: "Mumbai",
    to: "Pune",
    dep: "07:10",
    arr: "10:25",
    duration: "3h 15m",
    classes: ["CC", "2A"],
    fare: 540,
    seats: 39
  },
  {
    name: "Intercity Express",
    number: "12127",
    from: "Mumbai",
    to: "Pune",
    dep: "18:40",
    arr: "22:05",
    duration: "3h 25m",
    classes: ["Chair Car", "2A"],
    fare: 480,
    seats: 47
  },
  {
    name: "Sachkhand Express",
    number: "12715",
    from: "Nagpur",
    to: "Hyderabad",
    dep: "18:25",
    arr: "06:30",
    duration: "12h 05m",
    classes: ["Sleeper", "3A", "2A"],
    fare: 650,
    seats: 29
  },
  {
    name: "Duronto Express",
    number: "12220",
    from: "Mumbai",
    to: "Nagpur",
    dep: "23:15",
    arr: "11:40",
    duration: "12h 25m",
    classes: ["2A", "3A"],
    fare: 1080,
    seats: 21
  },
  {
    name: "Tejas Express",
    number: "22119",
    from: "Bhopal",
    to: "Indore",
    dep: "07:00",
    arr: "10:05",
    duration: "3h 05m",
    classes: ["CC", "EC"],
    fare: 590,
    seats: 35
  },
  {
    name: "Jan Shatabdi Express",
    number: "12059",
    from: "Mumbai",
    to: "Pune",
    dep: "05:45",
    arr: "09:00",
    duration: "3h 15m",
    classes: ["CC", "2A"],
    fare: 450,
    seats: 44
  }
];


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  setMinimumDate();
  displayBookings();
  loadTheme();
});


// ===============================
// DATE
// ===============================

function setMinimumDate() {
  const date = document.getElementById("date");

  if (date) {
    const today = new Date();

    date.min = today.toISOString().split("T")[0];
    date.value = today.toISOString().split("T")[0];
  }
}


// ===============================
// NAVIGATION
// ===============================

function showSection(section) {

  document
    .querySelectorAll(".page-section")
    .forEach(el => el.classList.remove("active-section"));

  const target = document.getElementById(section);

  if (target) {
    target.classList.add("active-section");
  }

  document
    .querySelectorAll(".nav-link")
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.section === section
      );

    });

  if (section === "bookings") {
    displayBookings();
  }

  if (section === "search") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  document
    .getElementById("main-menu")
    ?.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

  document
    .getElementById("main-menu")
    .classList.toggle("open");

}


// ===============================
// DARK / LIGHT MODE
// ===============================

function toggleTheme() {

  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "railreserve_theme",
    dark ? "dark" : "light"
  );

  document.getElementById("theme-toggle").innerHTML =
    dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}


function loadTheme() {

  const dark =
    localStorage.getItem("railreserve_theme") === "dark";

  if (dark) {

    document.body.classList.add("dark");

    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-solid fa-sun"></i>';

  }
}


// ===============================
// ROUTES
// ===============================

function setRoute(from, to) {

  document.getElementById("from").value = from;
  document.getElementById("to").value = to;

  showSection("search");

  searchTrains();
}


// ===============================
// SWAP STATIONS
// ===============================

function swapStations() {

  const from =
    document.getElementById("from");

  const to =
    document.getElementById("to");

  [from.value, to.value] =
    [to.value, from.value];

}


// ===============================
// SEARCH TRAINS
// ===============================

function searchTrains() {

  const from =
    document.getElementById("from").value.trim();

  const to =
    document.getElementById("to").value.trim();

  const date =
    document.getElementById("date").value;

  const selectedClass =
    document.getElementById("search-class").value;

  const resultBox =
    document.getElementById("train-results");


  if (!from || !to || !date) {

    showToast(
      "Please enter From, To and Date.",
      "error"
    );

    return;
  }


  if (
    from.toLowerCase() ===
    to.toLowerCase()
  ) {

    showToast(
      "From and To stations cannot be the same.",
      "error"
    );

    return;
  }


  const results = trains.filter(train => {

    const routeMatch =
      train.from.toLowerCase() ===
        from.toLowerCase() &&

      train.to.toLowerCase() ===
        to.toLowerCase();

    const classMatch =
      selectedClass === "All" ||
      train.classes.includes(selectedClass);

    return routeMatch && classMatch;

  });


  if (!results.length) {

    resultBox.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-circle-exclamation"></i>

        <h3>No demo trains found</h3>

        <p>
          Try a popular route or another station pair.
          This project uses a fixed demo train dataset.
        </p>

      </div>

    `;

    return;
  }


  resultBox.innerHTML =

    `<div class="results-title">

      <strong>${results.length} trains found</strong>

      <span>
        ${escapeHTML(from)}
        →
        ${escapeHTML(to)}
        ·
        ${formatDate(date)}
      </span>

    </div>` +

    results
      .map((train, index) =>
        trainCard(train, index)
      )
      .join("");

}


// ===============================
// TRAIN CARD
// ===============================

function trainCard(train, index) {

  return `

    <article class="train-card">

      <div>

        <div class="train-name">
          ${train.name}
        </div>

        <div class="train-number">
          #${train.number}
          ·
          ${train.classes.join(" / ")}
        </div>

      </div>


      <div>

        <div class="route-times">

          <div>

            <strong>
              ${train.dep}
            </strong>

            <small>
              ${train.from}
            </small>

          </div>


          <div>

            <div class="route-line"></div>

            <div class="duration">
              ${train.duration}
            </div>

          </div>


          <div>

            <strong>
              ${train.arr}
            </strong>

            <small>
              ${train.to}
            </small>

          </div>

        </div>

      </div>


      <div class="availability">

        <span class="available">

          <i class="fa-solid fa-circle-check"></i>

          ${train.seats} seats

        </span>

        <div class="train-number">
          Available in selected route
        </div>

      </div>


      <div>

        <div class="fare">

          ₹${train.fare.toLocaleString("en-IN")}

          <small>
            starting fare
          </small>

        </div>


        <button
          class="primary-btn"
          onclick="selectTrain(${index}, '${train.name.replace(/'/g, "\\'")}')"
        >

          Book Now

        </button>

      </div>

    </article>

  `;
}


// ===============================
// SELECT TRAIN
// ===============================

function selectTrain(index, trainName) {

  const train =
    trains.find(t => t.name === trainName);

  if (!train) return;


  const date =
    document.getElementById("date").value;


  selectedTrain = {
    ...train,
    travelDate: date
  };


  tempBooking = {

    from: train.from,

    to: train.to,

    date: date,

    train: train.name,

    trainNumber: train.number,

    departure: train.dep,

    arrival: train.arr,

    duration: train.duration,

    baseFare: train.fare,

    seats: train.seats

  };


  renderBookingSummary();

  showSection("passenger");

}


// ===============================
// BOOKING SUMMARY
// ===============================

function renderBookingSummary() {

  const s =
    document.getElementById("booking-summary");

  if (!s) return;


  s.innerHTML = `

    <span
      class="section-kicker"
      style="color:#9fd4ff"
    >
      SELECTED TRAIN
    </span>


    <h3>
      ${escapeHTML(tempBooking.train)}
    </h3>


    <div class="summary-route">

      ${escapeHTML(tempBooking.from)}
      →
      ${escapeHTML(tempBooking.to)}

    </div>


    <div class="summary-item">

      <span>Train No.</span>

      <strong>
        ${tempBooking.trainNumber}
      </strong>

    </div>


    <div class="summary-item">

      <span>Departure</span>

      <strong>
        ${tempBooking.departure}
      </strong>

    </div>


    <div class="summary-item">

      <span>Arrival</span>

      <strong>
        ${tempBooking.arrival}
      </strong>

    </div>


    <div class="summary-item">

      <span>Travel date</span>

      <strong>
        ${formatDate(tempBooking.date)}
      </strong>

    </div>


    <div class="summary-item">

      <span>Starting fare</span>

      <strong>
        ₹${tempBooking.baseFare.toLocaleString("en-IN")}
      </strong>

    </div>


    <div class="summary-item">

      <span>Available seats</span>

      <strong>
        ${tempBooking.seats}
      </strong>

    </div>

  `;

}


// ===============================
// CONFIRM BOOKING
// ===============================

function confirmBooking() {

  const name =
    document.getElementById("pname").value.trim();

  const age =
    Number(
      document.getElementById("page").value
    );

  const gender =
    document.getElementById("pgender").value;

  const berth =
    document.getElementById("pberth").value;

  const travelClass =
    document.getElementById("pclass").value;


  if (!tempBooking.train) {

    showToast(
      "Please select a train first.",
      "error"
    );

    showSection("search");

    return;
  }


  if (
    !name ||
    !age ||
    !gender ||
    !berth ||
    !travelClass
  ) {

    showToast(
      "Please complete all passenger details.",
      "error"
    );

    return;
  }


  if (age < 1 || age > 120) {

    showToast(
      "Please enter a valid age.",
      "error"
    );

    return;
  }


  const fareMultiplier = {

    Sleeper: 1,

    "3A": 1.55,

    "2A": 2.15,

    "1A": 3.1

  };


  const fare = Math.round(

    tempBooking.baseFare *

    (fareMultiplier[travelClass] || 1)

  );


  const booking = {

    ...tempBooking,

    name,

    age,

    gender,

    berth,

    class: travelClass,

    fare,

    status: "Confirmed",

    pnr: generatePNR(),

    bookedAt: new Date().toISOString()

  };


  bookings.unshift(booking);


  localStorage.setItem(
    "railreserve_bookings",
    JSON.stringify(bookings)
  );


  document.getElementById("pname").value = "";

  document.getElementById("page").value = "";

  document.getElementById("pgender").value = "";

  document.getElementById("pberth").value = "";

  document.getElementById("pclass").value = "";


  showToast(
    `Ticket confirmed! PNR ${booking.pnr}`,
    "success"
  );


  displayBookings();

  showSection("bookings");

}


// ===============================
// GENERATE PNR
// ===============================

function generatePNR() {

  let pnr;


  do {

    pnr =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

  }

  while (
    bookings.some(
      b => b.pnr === pnr
    )
  );


  return pnr;
}


// ===============================
// DISPLAY BOOKINGS
// ===============================

function displayBookings() {

  const list =
    document.getElementById("booking-list");

  const count =
    document.getElementById("booking-count");


  if (!list) return;


  count.textContent =

    `${bookings.length} Ticket${

      bookings.length !== 1
        ? "s"
        : ""

    }`;


  if (!bookings.length) {

    list.innerHTML = `

      <div class="no-bookings">

        <i class="fa-solid fa-suitcase-rolling"></i>

        <h3>
          No bookings yet
        </h3>

        <p>
          Your confirmed demo tickets
          will appear here.
        </p>


        <button
          class="primary-btn"
          style="margin-top:15px"
          onclick="showSection('search')"
        >

          Search Trains

        </button>

      </div>

    `;

    return;
  }


  list.innerHTML =

    bookings
      .map((b, index) => `

        <article class="ticket-card">

          <div class="ticket-top">

            <div>

              <strong>
                ${escapeHTML(b.train)}
              </strong>

              <small>
                ${escapeHTML(
                  b.trainNumber || "Demo Train"
                )}

                ·

                ${formatDate(b.date)}
              </small>

            </div>


            <div class="ticket-pnr">

              <small>
                PNR
              </small>

              ${b.pnr}

            </div>

          </div>


          <div class="ticket-body">

            <div class="ticket-route">

              <div>

                <strong>
                  ${escapeHTML(b.from)}
                </strong>

                <small>
                  ${b.departure || "--"}
                </small>

              </div>


              <div class="ticket-line"></div>


              <div>

                <strong>
                  ${escapeHTML(b.to)}
                </strong>

                <small>
                  ${b.arrival || "--"}
                </small>

              </div>

            </div>


            <div class="ticket-info">

              <div>

                <small>
                  Passenger
                </small>

                <strong>
                  ${escapeHTML(b.name)}
                </strong>

              </div>


              <div>

                <small>
                  Age / Gender
                </small>

                <strong>
                  ${b.age}
                  /
                  ${escapeHTML(b.gender)}
                </strong>

              </div>


              <div>

                <small>
                  Class
                </small>

                <strong>
                  ${escapeHTML(b.class)}
                </strong>

              </div>


              <div>

                <small>
                  Berth
                </small>

                <strong>
                  ${escapeHTML(b.berth)}
                </strong>

              </div>


              <div>

                <small>
                  Fare
                </small>

                <strong>
                  ₹${Number(
                    b.fare ||
                    b.baseFare ||
                    0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>


              <div>

                <small>
                  Status
                </small>

                <strong
                  style="color:#16a66a"
                >
                  ${escapeHTML(
                    b.status ||
                    "Confirmed"
                  )}
                </strong>

              </div>

            </div>


            <div class="ticket-actions">

              <button
                class="print-btn"
                onclick="printTicket(${index})"
              >

                <i class="fa-solid fa-print"></i>

                Print

              </button>


              <button
                class="cancel-btn"
                onclick="cancelTicket(${index})"
              >

                <i class="fa-solid fa-xmark"></i>

                Cancel

              </button>

            </div>

          </div>

        </article>

      `)
      .join("");

}


// ===============================
// PNR CHECK
// ===============================

function checkPNR() {

  const pnr =
    document
      .getElementById("pnr-number")
      .value
      .trim();

  const result =
    document.getElementById("pnr-result");


  if (!/^\d{6}$/.test(pnr)) {

    result.innerHTML = `

      <div class="pnr-error">

        <i class="fa-solid fa-circle-exclamation"></i>

        Please enter a valid 6-digit PNR.

      </div>

    `;

    return;
  }


  const ticket =
    bookings.find(
      b => String(b.pnr) === pnr
    );


  if (!ticket) {

    result.innerHTML = `

      <div class="pnr-error">

        <i class="fa-solid fa-circle-xmark"></i>

        PNR not found in this browser's
        demo bookings.

      </div>

    `;

    return;
  }


  result.innerHTML = `

    <div class="pnr-result-card">

      <div class="status">

        <i class="fa-solid fa-circle-check"></i>

        ${ticket.status || "Confirmed"}

      </div>


      <p style="margin-top:8px;font-size:13px">

        <strong>PNR:</strong>
        ${ticket.pnr}

      </p>


      <p style="font-size:13px;margin-top:5px">

        <strong>Passenger:</strong>
        ${escapeHTML(ticket.name)}

      </p>


      <p style="font-size:13px;margin-top:5px">

        <strong>Journey:</strong>
        ${escapeHTML(ticket.from)}
        →
        ${escapeHTML(ticket.to)}

      </p>


      <p style="font-size:13px;margin-top:5px">

        <strong>Train:</strong>
        ${escapeHTML(ticket.train)}

      </p>


      <p style="font-size:13px;margin-top:5px">

        <strong>Date:</strong>
        ${formatDate(ticket.date)}

      </p>

    </div>

  `;

}


// ===============================
// CANCEL TICKET
// ===============================

function cancelTicket(index) {

  const ticket = bookings[index];

  if (!ticket) return;


  if (
    !confirm(
      `Cancel ticket with PNR ${ticket.pnr}?`
    )
  ) {

    return;
  }


  bookings.splice(index, 1);


  localStorage.setItem(
    "railreserve_bookings",
    JSON.stringify(bookings)
  );


  displayBookings();


  showToast(
    "Ticket cancelled successfully.",
    "success"
  );

}


// ===============================
// PRINT TICKET
// ===============================

function printTicket(index) {

  const b = bookings[index];

  if (!b) return;


  const win =
    window.open(
      "",
      "_blank",
      "width=800,height=700"
    );


  if (!win) return;


  win.document.write(`

    <!doctype html>

    <html>

    <head>

      <title>
        RailReserve Ticket - ${b.pnr}
      </title>


      <style>

        body {
          font-family: Arial;
          padding: 40px;
          color: #172033;
        }

        .ticket {
          max-width: 650px;
          margin: auto;
          border: 1px solid #ddd;
          border-radius: 18px;
          overflow: hidden;
        }

        header {
          background: #1769e0;
          color: #fff;
          padding: 25px;
        }

        main {
          padding: 25px;
        }

        .route {
          display: flex;
          justify-content: space-between;
          font-size: 25px;
          font-weight: bold;
          margin: 25px 0;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .item {
          background: #f5f7fa;
          padding: 12px;
          border-radius: 8px;
        }

        .item small {
          display: block;
          color: #687386;
          margin-bottom: 4px;
        }

        footer {
          padding: 18px;
          background: #f5f7fa;
          color: #687386;
          font-size: 12px;
        }

      </style>

    </head>


    <body>

      <div class="ticket">

        <header>

          <h2>
            🚆 RailReserve
          </h2>

          <p>
            Electronic Reservation Ticket
          </p>

          <strong>
            PNR: ${b.pnr}
          </strong>

        </header>


        <main>

          <div class="route">

            <span>
              ${escapeHTML(b.from)}
            </span>

            <span>
              →
            </span>

            <span>
              ${escapeHTML(b.to)}
            </span>

          </div>


          <div class="grid">

            <div class="item">

              <small>
                Passenger
              </small>

              ${escapeHTML(b.name)}

            </div>


            <div class="item">

              <small>
                Train
              </small>

              ${escapeHTML(b.train)}

            </div>


            <div class="item">

              <small>
                Date
              </small>

              ${formatDate(b.date)}

            </div>


            <div class="item">

              <small>
                Class / Berth
              </small>

              ${escapeHTML(b.class)}
              /
              ${escapeHTML(b.berth)}

            </div>


            <div class="item">

              <small>
                Departure
              </small>

              ${b.departure || "--"}

            </div>


            <div class="item">

              <small>
                Arrival
              </small>

              ${b.arrival || "--"}

            </div>


            <div class="item">

              <small>
                Fare
              </small>

              ₹${Number(
                b.fare || 0
              ).toLocaleString("en-IN")}

            </div>


            <div class="item">

              <small>
                Status
              </small>

              ${b.status || "Confirmed"}

            </div>

          </div>

        </main>


        <footer>

          Demo frontend ticket.
          Not an official railway/IRCTC ticket.

        </footer>

      </div>


      <script>

        window.onload = () => window.print();

      <\/script>


    </body>

    </html>

  `);


  win.document.close();

}


// ===============================
// REGISTER USER
// ===============================

function registerUser() {

  const username =
    document
      .getElementById("reg-username")
      .value
      .trim();

  const password =
    document.getElementById("reg-password").value;

  const confirmPassword =
    document.getElementById("reg-confirm").value;

  const result =
    document.getElementById("register-result");


  if (
    !username ||
    !password ||
    !confirmPassword
  ) {

    result.textContent =
      "Please fill all fields.";

    result.style.color = "#d33";

    return;
  }


  if (password.length < 6) {

    result.textContent =
      "Password should contain at least 6 characters.";

    result.style.color = "#d33";

    return;
  }


  if (password !== confirmPassword) {

    result.textContent =
      "Passwords do not match.";

    result.style.color = "#d33";

    return;
  }


  localStorage.setItem(

    "railreserve_user",

    JSON.stringify({
      username,
      password
    })

  );


  result.textContent =
    "Registration successful. You can now login.";

  result.style.color = "#16a66a";


  document.getElementById(
    "reg-password"
  ).value = "";

  document.getElementById(
    "reg-confirm"
  ).value = "";

}


// ===============================
// LOGIN
// ===============================

function loginUser() {

  const username =
    document
      .getElementById("login-username")
      .value
      .trim();

  const password =
    document.getElementById("login-password")
      .value;

  const result =
    document.getElementById("login-result");


  const storedUser =
    JSON.parse(
      localStorage.getItem(
        "railreserve_user"
      )
    );


  if (!storedUser) {

    result.textContent =
      "No local account found. Please register first.";

    result.style.color = "#d33";

    return;
  }


  if (
    username === storedUser.username &&
    password === storedUser.password
  ) {

    localStorage.setItem(
      "railreserve_logged_in",
      "true"
    );


    result.textContent =
      "Login successful!";

    result.style.color = "#16a66a";


    showToast(
      `Welcome, ${username}!`,
      "success"
    );

  }

  else {

    result.textContent =
      "Invalid username or password.";

    result.style.color = "#d33";

  }

}


// ===============================
// FORMAT DATE
// ===============================

function formatDate(date) {

  if (!date) return "--";


  const d =
    new Date(date + "T00:00:00");


  return d.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(value) {

  return String(value ?? "")
    .replace(
      /[&<>"']/g,
      char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

      }[char])
    );

}


// ===============================
// TOAST NOTIFICATION
// ===============================

function showToast(
  message,
  type = "success"
) {

  const container =
    document.getElementById(
      "toast-container"
    );


  const toast =
    document.createElement("div");


  toast.className =
    `toast ${type}`;


  toast.textContent =
    message;


  container.appendChild(toast);


  setTimeout(
    () => toast.remove(),
    3000
  );

}