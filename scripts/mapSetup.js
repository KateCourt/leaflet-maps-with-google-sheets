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
      "https://sheets.googleapis.com/v4/spreadsheets/10hoBLjIu0_qothMvChC8mkiI_QyEh7KCwOs4TFxq0kk?key=AIzaSyBx3U9RNDkd76gmJ8YfFR3CHlTNP5eF9kk",
      (data) => {
          console.log(data)
      }
      )

  
  
  
})
