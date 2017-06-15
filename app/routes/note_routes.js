var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // app.get('/not', function(req, res) {
  //   res.send(req)
  // }),
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  app.get('/notes', (req, res) => {

    var request = require('request');

    request.get(
        'https://api.betterdoctor.com/2016-03-01/doctors?user_key=0c182e591904104f58efcff3e425573d&name=ben',
        // { json: { key: 'value' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body)
                res.send(body)
            }
        }
    );

    // db.collection('notes').find().toArray((err, items) => {
    //   console.log(items);
    //   if (err) {
    //     res.send({'error':'An error has occurred'});
    //   } else {
    //     res.send(items);
    //   }
    // });
  });


  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
