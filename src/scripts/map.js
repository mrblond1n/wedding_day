window.onload = function() { ymaps.ready(init);

let placemarks = [
  {
    latitude: 55.83585,
    longitude: 37.626645,
    hintContent: 'Дворец бракосочетания',
    balloonContent: 'начало в 15:30'
  }
],
  geoObjects = [];

function init() {
  let map = new ymaps.Map('map', {
    center: [55.83585, 37.626645],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  for (let i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark(
      [placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent
      },
      {
        iconLayout: 'default#image',
        iconImageHref: './assets/img/icons/love.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
      });
  }
  let clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: './img/icons/love.svg',
        size: [100, 100],
        offset: [-50, -50]
      }
    ],
    clusterIconContentLayout: null
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);
};
};