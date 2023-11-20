/* global vars */
let arrayImg = 0; // array of the images
let arraySrc = []; // array of image src
let allJSON;

function init(csvInput) {
  let allImg =
    document.querySelectorAll(
      ".bild"
    ); /* sonst verwechslung mit img von leaflet */

  arrayImg = Array.from(allImg); /* changed NodeList to array */
  //console.log(arrayImg);    /* for debug only */

  allJSON = csvJSON(csvInput);
  allImg.forEach(saveSrc); /* call function saveSrc() with each element */

  allImg.forEach(addClick); /* call function addClick() with each element */
  return;
}

function saveSrc(elem) {
  let s = elem.getAttribute("src"); // source of img
  let a = elem.getAttribute("alt");

  let result = allJSON.find(({ SourceFile }) => SourceFile === s);
  console.log(result);
  if (result) {
    // != undefined
    let x = result["latitude"];
    let y = result["longitude"];
    // create waypoint
    let wp = new WpGeoInfo(s, x, y);
    arraySrc.push(wp);
  }
  //console.log(arraySrc);
}

// add click event function
function addClick(elem) {
  elem.addEventListener("click", setGeoLoc);
  console.log("ac");
}

function setGeoLoc(e) {
  console.log("set geo");
  let clickIndex = arrayImg.indexOf(e.currentTarget);
  let wp = arraySrc[clickIndex];
  wp.setmarker();
  return;
}

/*

// geo location function

var map = 0; /* global */

class WpGeoInfo {
  // #private class method(s)

  // public class method(s)
  setmarker() {
    let linkStr =
      "<a href=" + this.#name + ' target="_blank" >link zum Bild</a>';
    var marker = L.marker([this.#lat, this.#lon]).addTo(map);
    marker.bindPopup("<b>" + this.#name + "</b><br>" + linkStr);
    map.flyTo([this.#lat, this.#lon], 10, {
      animate: true,
      duration: 2, // in seconds
    });

    let fname = this.#name; // fileName
    let ttString = "";
    ttString += `<img src=${fname} style="width:100px; height:auto;">`;
    marker.bindTooltip(ttString, {
      direction: "right",
      offset: [-15, 25],
      permanent: false,
    });
    //marker.bindTooltip('This is my tooltip');
    return;
  }

  // #private class member(s)
  #name;
  #lat;
  #lon;
  // constructor
  constructor(name, lat, lon) {
    this.#name = name;
    this.#lat = lat;
    this.#lon = lon;
    console.trace("constr.WpGeoInfo");
  } // constr.
} // end class

function setKarte(conf) {
  map = L.map(conf.mapid); // var map is global
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  map.setView([conf.lat, conf.lng], conf.zoom);
  return;
}

function setmarker(name) {
  var marker = L.marker([51.5, -0.09]).addTo(map);
  marker.bindPopup("<b>" + name + "</b><br>I am a popup.");

  return;
}

// see https://gist.github.com/iwek/7154578
//var csv is the CSV file with headers
function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  } //for

  return result; //JavaScript object; dann klappt result.find
  //return JSON.stringify(result); //JSON
}
