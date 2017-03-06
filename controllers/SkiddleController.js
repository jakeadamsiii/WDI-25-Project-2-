const request = require('request-promise');

const eventsIndex = (req, res, next) => {
  request({
    url:"http://www.skiddle.com/api/v1/events/",
    method: "GET",
    qs: {
      latitude:51.507558,
      longitude:-0.127625,
      radius:10,
      ticketsavailable:1,
      eventcode:'LIVE',
      api_key:process.env.SKIDDLE_KEY
    },
    json:true
  })
  .then((data) => {
    console.log(data);
    res.render('statics/map', {data: data.results})

  })
  .catch(next);
};

module.exports = {eventsIndex};
