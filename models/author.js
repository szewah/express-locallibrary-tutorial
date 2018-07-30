var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema( 
	{
		first_name: {type: String, required: true, max: 100},
		family_name: {type: String, required: true, max: 100},
		date_of_birth: {type: Date},
		date_of_death: {type: Date},
	}
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's instance URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var lifetime_string='';
  if (this.date_of_birth) {
      lifetime_string=moment(this.date_of_birth).format('D MMMM, YYYY');
      }
  lifetime_string+=' - ';
  if (this.date_of_death) {
      lifetime_string+=moment(this.date_of_death).format('D MMMM, YYYY');
      }
  return lifetime_string
});

AuthorSchema
.virtual('date_of_birth_dd_mm_yyy')
.get(function () {
  return moment(this.date_of_birth).format('DD-MMMM-YYYY');
});

AuthorSchema
.virtual('date_of_death_dd_mm_yyyy')
.get(function () {
  return moment(this.date_of_death).format('DD-MMMM-YYYY');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
