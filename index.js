"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

//global variable

let map, mapEvent;

//oop for workout

class Workout {
  date = new Date();
  id = (new Date() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

//Running
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
//Cycling
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const run2 = new Running([39, -12], 27, 95, 511);
const run3 = new Cycling([39, -12], 27, 95, 511);
console.log("*********");
console.log(run1, run2);
console.log("*********");
console.log(run3);
//oop for app
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    //event handler
    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toogleElevationField);
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("could not get ur position");
        }
      );
    }
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(position);
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},14z?entry=ttu`
    );

    const coords = { latitude, longitude };
    console.log(coords);
    this.#map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handler for map
    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toogleElevationField() {
    inputElevation.closest(".form__row").classList.toogle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toogle("form__row--hidden");
  }
  _newWorkout() {
    e.preventDefault();
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("workout")
      .openPopup();
  }
}

const app = new App();
//app._getPosition();

//navigator;

//

//form add event listener
