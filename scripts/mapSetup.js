$(window).on('load', function() {
  
  
  /**
   * Returns an Awesome marker with specified parameters
   */
  function createMarkerIcon(icon, prefix, markerColor, iconColor) {
    return L.AwesomeMarkers.icon({
      icon: icon,
      prefix: prefix,
      markerColor: markerColor,
      iconColor: iconColor
    });
  }


  $.getJSON(
      "https://sheets.googleapis.com/v4/spreadsheets/10hoBLjIu0_qothMvChC8mkiI_QyEh7KCwOs4TFxq0kk/values/Sheet1?key=AIzaSyBM3cy_9U5vFQyj52C2sY-fXcDvIcUqGa8",
      (data) => {
        console.log('test5')

          var datajson = Papa.parse(Papa.unparse(data['values']), {header: true} ).data
          // todo check for errors
          var i;
        for (i = 0; i < datajson.length; i++) {
            L.marker([datajson[i]["Latitude"], datajson[i]["Longitude"]]).addTo(map)
        }
          $('#map').css('visibility', 'visible');
          $('.loader').hide();
      }
      )


  
  
  
})
