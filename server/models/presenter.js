const mongoose = require('mongoose');
//import { Presenter } from '../../client/react-node/src/components/Presenter';

const Schema = mongoose.Schema;

const PresenterSchema = new Schema ({

  //_id: {type: String},

  presentername: {
    type: String,  //name: Joi.string().min(3).required(),
    required: [true,'PresenterName field is required']
  },
  evaluatorname: {
    type: String,  //age: Joi.number().required(),
  },

  topic: {
    type: String,  
  },

  articleurl: {
    type: String,  
  },

  presentationdat: {
    type: String,  
    //default: Date.now,
  },
  
  date: {
    type: Date,
    default: Date.now,
    required: [true,'Date is required']
  }


  
});
const Presenter = mongoose.model('presenter',PresenterSchema);
module.exports = Presenter;