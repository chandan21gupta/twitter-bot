var Twitter = require('twitter');
var config = require('./config.js');

var twitter = new Twitter(config);

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'        
};

twitter.get('search/tweets',params,(err,data,response) => {
    if(!err){
        for(let i=0;i<data.statuses.length;i++){
            let id = {id:data.statuses[i].id_str};
            twitter.post('favorites/create',id,(err,response) => {
                if(err){
                    console.log(err[0].message);
                }
                else{
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
                }
            });
        }  
    }
    else{
        console.log('failed');
    }

});