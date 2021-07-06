const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuaXBpbmkiLCJhIjoiY2txYjR1bmd4MG5vaTJubW84Y2tpZHFydiJ9.k6hwOjt8ClNeRNNQgHaXNg&limit=1'
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Error connecting to GeoCode service')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location.  Try a new search.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode