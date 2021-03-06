const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const dirName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// hbs partials setup
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(dirName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Satya Sanipini"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    /*
    res.send({
        forecast: 'Sunny',
        location: 'Ijamsville',
        address: req.query.address
    })*/
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Satya Sanipini'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help',
        msg: 'Help includes all details about the Weather App',
        name: 'Satya Sanipini'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Article Not Found',
        name: 'Satya Sanipini',
        errorMsg: 'Help Article Not Found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 - Page Not Found',
        name: 'Satya Sanipini',
        errorMsg: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})