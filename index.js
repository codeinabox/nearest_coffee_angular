// Modules
var express = require('express');
var app = express();
var Q = require('q');
var request = require('request');
var _ = require('underscore');

// Config vars
var foursquareClientId = process.env.FOURSQUARE_CLIENT_ID;
var foursquareClientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
var categoryId = "4bf58dd8d48988d1e0931735";

function foursquareRequest(latitude, longitude) {
    var deferred = Q.defer();
    var requestUrl = 'https://api.foursquare.com/v2/venues/search' +
        '?client_id='+foursquareClientId +
        '&client_secret='+foursquareClientSecret +
        '&v=20130815' +
        '&intent=browse' +
        '&ll='+latitude+','+longitude +
        '&radius=1000' +
        '&categoryId='+categoryId;

    request(requestUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            deferred.resolve(json.response.venues);
        } else if(error) {
            deferred.resolve(error);
        }
    });

    return deferred.promise;
}

app.set('port', (process.env.PORT || 5000));
app.use('/',express.static(__dirname + '/public'));

app.get('/venues', function(request, response) {
    foursquareRequest(request.query.lat, request.query.long).then(function(venues) {
        var sorted = _.sortBy(venues, function(venue){ return venue.location.distance; });
        response.type('json').send(sorted);
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
