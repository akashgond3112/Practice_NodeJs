const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define path fro express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


//setup handel bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'How is the Weather todday!!',
        name: 'Akash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Akash'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please send address!!'
    })
    }

    const address = req.query.address
    
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({  
            forecast: forecastData,
            location: location
            })
        })
    })

    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
    return res.send({
        error:'You must provide a search query'
    })

    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        name:'Akash',
        error:'This page is under maintainence'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        name:'Akash',
        error:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})