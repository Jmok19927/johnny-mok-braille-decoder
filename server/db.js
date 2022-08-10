const mongoose = require("mongoose");
const uri = 'mongodb+srv://username:p4ssword@brailledecoder.wdbtzba.mongodb.net/brailledecoder?retryWrites=true&w=majority'

mongoose.connect(uri);

const searchSchema = new mongoose.Schema({
  search: String
})

const Search = mongoose.model('Search', searchSchema);

module.exports.Search = Search;