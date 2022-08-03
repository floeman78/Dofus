const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {r, ir} = require('./models/Thnigs');




mongoose.connect('mongodb+srv://francois400:frysbee1@dofus.6dlzx.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json())


  /**
   * 
   */
  app.post('/api/item', (req, res, next) => {
    const thing = new r({
      ...req.body
    })

    thing.save()
    .then(() => res.status(201).json({message : "Objet enregistré"}))
    .catch(error => res.status(400).json({error}))
  });

  /**
   * 
   */
  app.post('/api/itemPrix', (req, res, next) => {
    const objet = new ir({
      ...req.body
    })

    console.log(objet);


    objet.save()
    .then(() => res.status(201).json({message : "Objet enregistré"}))
    .catch(error => res.status(400).json({error}))
  });




























  app.get('/api/item/:id', (req, res, next) => {
    
    r.findOne({ _id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

  app.get('/api/item', (req, res, next) => {
    
    r.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/itemPrix/:id', (req, res, next) => {
    ir.find({'ressource._id' : req.params.id})
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });

  


module.exports = app;