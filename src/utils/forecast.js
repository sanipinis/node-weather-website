const request = require('postman-request')
const chalk = require('chalk')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e05a6067adfe64b2bb2842e235a4acf0&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=f'
    request({url, json: true}, (error, response, body) => {
        if(error){
            callback('Error connecting to weather service')
        } else if(response.body.error){
            callback('Unable to find location.  Try a new search.')
        }else{
            callback(undefined, body.current.weather_descriptions[0]+': It is currently '+body.current.temperature+ ' degrees out.  It feels like '+body.current.feelslike+' degrees out.')
        }
    })
 }

 module.exports = forecast