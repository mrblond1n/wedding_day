window.onload = function() { ymaps.ready(init);

let placemarks = [
  {
    latitude: 55.83585,
    longitude: 37.626645,
    hintContent: 'Место встречи',
    balloonContent: 'проспект Мира, 119с421'
  },
  {
    latitude: 55.831089,
    longitude: 37.634721,
    hintContent: 'Кафе',
    balloonContent: 'просп.Мира, 119, стр. 619'
  }
],
  geoObjects = [];

function init() {
  let map = new ymaps.Map('map', {
    center: [55.833242, 37.630499],
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
};