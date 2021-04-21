$(window).on('load', function() {
  
    /** Get data from Google Sheet and add markers to map
     */
  $.getJSON(
      "https://sheets.googleapis.com/v4/spreadsheets/10hoBLjIu0_qothMvChC8mkiI_QyEh7KCwOs4TFxq0kk/values/Sheet1?key=AIzaSyBM3cy_9U5vFQyj52C2sY-fXcDvIcUqGa8",
      (data) => {
        console.log('test5')

          // parse data from Sheets API into JSON
          var parsedData = Papa.parse(Papa.unparse(data['values']), {header: true} ).data
          // todo check for errors



          // get unique list of all locations
          var countries = []
          for (var j = 0; j < parsedData.length; j++) {
              var country = parsedData[j]["Place of Publication"]
              countries.push(country)
          }
          countries = [...new Set(countries)]

          // group data into clusters per country
          for (var k = 0; k < countries.length; k++) {
              var country = countries[k]
              var entries = _.filter(parsedData, function(o) {return o["Place of Publication"] === country})

              // for each group of entries, create a cluster on the map
              createCluster(entries)
          }

        // for (var i = 0; i < parsedData.length; i++) {
        //     L.marker([parsedData[i]["Latitude"], parsedData[i]["Longitude"]]).addTo(map)
        // }
          $('#map').css('visibility', 'visible');
          $('.loader').hide();
      }
      )

    //--------------------- Utility methods

  // Returns an Awesome marker with specified parameters
    function createMarkerIcon(icon, prefix, markerColor, iconColor) {
        return L.AwesomeMarkers.icon({
            icon: icon,
            prefix: prefix,
            markerColor: markerColor,
            iconColor: iconColor
        });
    }

    // create cluster on map for list of points
    function createCluster(entries) {
        var markers = L.markerClusterGroup();
        for (var i = 0; i < entries.length; i++) {
            markers.addLayer(L.marker([entries[i]["Latitude"], entries[i]["Longitude"]]));
        }
        map.addLayer(markers);
    }
})
