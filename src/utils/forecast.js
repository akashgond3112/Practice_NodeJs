const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=85d4be2bfa1a77d49ae46298945856fa&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, {
              description:
                body.current.weather_descriptions[0] +
                " It is currently " +
                body.current.temperature +
                " degress out. There is a " +
                body.current.visibility +
                "% chance of rain.",
              weather_icons: body.current.weather_icons[0],
            })
        }
    })
}

module.exports = forecast