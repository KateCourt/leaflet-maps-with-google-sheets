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

  
  /**
   * Triggers the load of the spreadsheet and map creation
   */
   var mapData;

   $.ajax({
       url:'./csv/Options.csv',
       type:'HEAD',
       error: function() {
         // Options.csv does not exist in the root level, so use Tabletop to fetch data from
         // the Google sheet

         if (typeof googleApiKey !== 'undefined' && googleApiKey) {

          var parse = function(res) {
            return Papa.parse(Papa.unparse(res[0].values), {header: true} ).data;
          }

          var apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'
          var spreadsheetId = googleDocURL.indexOf('/d/') > 0
            ? googleDocURL.split('/d/')[1].split('/')[0]
            : googleDocURL

          $.getJSON(
            apiUrl + spreadsheetId + '?key=' + googleApiKey
          ).then(function(data) {
              var sheets = data.sheets.map(function(o) { return o.properties.title })

              if (sheets.length === 0 || !sheets.includes('Options')) {
                'Could not load data from the Google Sheet'
              }

              // First, read 3 sheets: Options, Points, and Polylines
              $.when(
                $.getJSON(apiUrl + spreadsheetId + '/values/Options?key=' + googleApiKey),
                $.getJSON(apiUrl + spreadsheetId + '/values/Points?key=' + googleApiKey),
                $.getJSON(apiUrl + spreadsheetId + '/values/Polylines?key=' + googleApiKey)
              ).done(function(options, points, polylines) {

                // Which sheet names contain polygon data?
                var polygonSheets = sheets.filter(function(name) { return name.indexOf('Polygons') === 0})

                // Define a recursive function to fetch data from a polygon sheet
                var fetchPolygonsSheet = function(polygonSheets) {

                  // Load map once all polygon sheets have been loaded (if any)
                  if (polygonSheets.length === 0) {
                    onMapDataLoad(
                      parse(options),
                      parse(points),
                      parse(polylines)
                    )
                  } else {
                    
                    // Fetch another polygons sheet
                    $.getJSON(apiUrl + spreadsheetId + '/values/' + polygonSheets.shift() + '?key=' + googleApiKey, function(data) {
                      createPolygonSettings( parse([data]) )
                      fetchPolygonsSheet(polygonSheets)
                    })

                  }

                }

                // Start recursive function
                fetchPolygonsSheet( polygonSheets )

              })
              
            }
          )

         } else {
          alert('You load data from a Google Sheet, you need to add a free Google API key')
         }

       },

       /*
       Loading data from CSV files.
       */
       success: function() {

        var parse = function(s) {
          return Papa.parse(s[0], {header: true}).data
        }
      
        $.when(
          $.get('./csv/Options.csv'),
          $.get('./csv/Points.csv'),
          $.get('./csv/Polylines.csv')
        ).done(function(options, points, polylines) {
      
          function loadPolygonCsv(n) {
      
            $.get('./csv/Polygons' + (n === 0 ? '' : n) + '.csv', function(data) {
              createPolygonSettings( parse([data]) )
              loadPolygonCsv(n+1)
            }).fail(function() { 
              // No more sheets to load, initialize the map  
              onMapDataLoad( parse(options), parse(points), parse(polylines) )
            })
      
          }
      
          loadPolygonCsv(0)
      
        })

       }
   });

  
  
  
}
