
const moment = require('moment');

module.exports = {
    format_date: date => {
        return moment(date).format('MMMM Do YYYY');
      },

}




