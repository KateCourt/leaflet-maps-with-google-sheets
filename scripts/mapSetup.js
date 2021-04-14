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

    // var parse = function(res) {
    //     return Papa.parse(Papa.unparse(res[0].values), {header: true} ).data;
    // }

  $.getJSON(
      "https://sheets.googleapis.com/v4/spreadsheets/10hoBLjIu0_qothMvChC8mkiI_QyEh7KCwOs4TFxq0kk/values/Sheet1?key=AIzaSyBx3U9RNDkd76gmJ8YfFR3CHlTNP5eF9kk",
      (data) => {
        console.log('test1')

          var djson = Papa.parse(Papa.unparse(data['values']), {header: true} )
          console.log(djson)
         // alert(data[0].values)
         // var parsedData = parse(data)
         //  alert(parsedData[0])
      }
      )


  
  
  
})
