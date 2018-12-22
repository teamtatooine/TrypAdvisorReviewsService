const tables = require('./index.js');
const {Attraction, Review, User, Photo} = tables;

module.exports = {
  messages: {
    // a function which retrieves all messages from the database
    get: function (res) {
      db.Message.findAll({order: [['createdAt', 'DESC']]}).then(data => {
        res.end(JSON.stringify({results: data}));
      });
    },
    // a function which inserts a message into the database
    post: function (data) {
      // force: true will drop the table if it already exists
      Message.sync({force: false}).then(() => {
        // Table created
        return Message.create({
          username: data.username,
          text: data.text,
          roomname: data.roomname
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

