const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//const routes = require('./server/routes/api/presenters');
//Set up express app
const mongoose = require("mongoose");
const presenterRouter = require("./server/routes/api/presenters");
const PORT = process.env.PORT || 5000;
const app = express();

//initialize routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/',require('./server/routes/api/presenters'));

app.use("/", presenterRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res, next) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//const presenters = [{name: 'Ben', age: 32},{name: 'Joel', age: 23},{name: 'Steve', age: 45}];

// const Schema = mongoose.Schema;

// const PresenterSchema = new Schema ({

//   presentername: {
//     type: String,  //name: Joi.string().min(3).required(),
//     //required: [true,'PresenterName field is required']
//   },
//   evaluatorname: {
//     type: String,  //age: Joi.number().required(),
//   },

//   topic: {
//     type: String,
//   },

//   articleurl: {
//     type: String,
//   },

//   presentationdat: {
//     type: String,
//     //default: Date.now,
//   },

//   date: {
//     type: Date,
//     default: Date.now
//   }

// });

/*const result = Joi.validate(req.body, schema);
if(result.error) {
  res.status(400).send(result.error.details[0].message);
  return;
}*/
//this is our Model
//const Presenter = mongoose.model ('Presenter', PresenterSchema);

const url = "mongodb://ben:ben123@ds054479.mlab.com:54479/students_1_db";

mongoose.connect(
  process.env.MONGODB_URI || url,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database is connected");
    }
  }
);
//get a list of all presenters from the db
// app.get ('/presenters', (req, res,next) => {
//   Presenter.find ({}, (err, presenters) => {
//     if (err) {
//       res.status(404).send ('Data was not found');
//     }
//     res.json (presenters);
//   });
// });

// //get a presenter with an id from db
// app.get ('/presenters/:id', (req, res,next) => {
//   const _id = req.params.id;
//   Presenter.find ({_id}, (err, presenter) => {
//     console.log (presenter);

//     if (err) {
//       res.status(404).send('An error(The given Id was not found)');
//     }
//     if(presenter.length < 1){
//       res.send('A presenter with that name was not found');

//     }
//     res.json (presenter);
//   });
// });

// //add a new presenter to the db
// app.post ('/presenters', (req, res,next) => {
//   console.log(req.body)
//   const newPresenter = new Presenter (req.body);
//  //or we can use create method which save automatically
//  //Presenter.create(req.body).then(()=> {}) .catch(next)//
//   newPresenter
//     .save ()
//     .then (() => {
//       console.log ('Data is saved');
//     })
//     .catch (err => console.log ('Error', err));
//   res.send ('A new presenter has been added');
// });

// //update a presenter in the db
// app.put ('/presenters/:id', (req, res,next) => {

//   const _id = req.params.id
//   Presenter.findOne({_id}, (err, presenter) => {
//     console.log(req.body)
//     presenter.presentername = req.body.presentername,
//     presenter.age = req.body.evaluatorname;
//     presenter.topic = req.body.topic;
//     presenter.articleurl = req.body.articleurl;
//     presenter.presentationdat = req.body.presentationdat;

//     presenter.save(err => {
//       if(err) {
//         res.status(404).send(err)
//       }
//       console.log('Saved')
//       res.send(presenter)
//     })
//   })

// });

// //delete a presenter from the db

// app.delete ('/presenters/:id', (req, res,next) => {
//   const _id = req.params.id;
//   Presenter.findByIdAndRemove({_id}, (err, presenter) => {
//     if(err){
//       res.status(404).send('Unable to delete')
//     }
//     res.send (`A presenter with id ${_id} has been removed.`);

//   })

// });
//ERROR handling middleware
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

//Listen for requests

app.listen(PORT, () => {
  console.log(`Now Listening requests at port ${PORT}`);
});
