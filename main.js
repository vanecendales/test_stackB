var request = require('request');
var cheerio = require('cheerio');

request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);
    var parsedResults = [];

    $('span.comhead').each(function(i, element){
      var a = $(this).prev();
      var rank = a.parent().parent().text();
      var title = a.text();
      var title1 = title.split(" "); 
      var subtext = a.parent().parent().next().children('.subtext').children();
      var points = $(subtext).eq(0).text();
      var comments = $(subtext).eq(2).text();
      var position = title1.length;
     
      var metadata = {
        rank: parseInt(rank),
        title: title,     
        points: parseInt(points),
        comments: parseInt(comments),
        position: position
      };   

      parsedResults.push(metadata);
      parsedResult1 = parsedResults.filter(function(o){
        return ( o.position > 5 );
        });

     function compare(a,b) {
      if (a.comments > b.comments)
        return -1;
      if (a.comments < b.comments)
        return 1;
      return 0;
    }

    parsedResult1.sort(compare);

    parsedResult2 = parsedResults.filter(function(o){
    return ( o.position < 5 );
        });

     function compare2(a,b) {
      if (a.points > b.points)
        return -1;
      if (a.points < b.points)
        return 1;
      return 0;
    }

    parsedResult2.sort(compare2);

    });

    var result = parsedResult1.concat(parsedResult2);

    console.log(result);  
  }
});