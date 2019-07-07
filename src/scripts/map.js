window.onload = function() { ymaps.ready(init);

let placemarks = [
  {
    latitude: 59.97,
    longitude: 30.31,
    hintContent: 'Наша бургерная',
    balloonContent: 'Время работы: 9.00 - 18.00'
  },
  {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: 'Наша бургерная',
    balloonContent: 'Время работы: 9.00 - 18.00'
  },
  {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: 'Наша бургерная',
    balloonContent: 'Время работы: 9.00 - 18.00'
  }
],
  geoObjects = [];

function init() {
  let map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    zoom: 12,
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
        iconImageHref: './img/icons/love.svg',
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
}