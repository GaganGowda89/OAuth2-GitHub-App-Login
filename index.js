const express = require('express');
const axios = require('axios');

const app = express();

const GITHUB_CLIENT_ID = "Your Client ID";
const GITHUB_CLIENT_SECRET = "Your Secret ID";


/*  EXPRESS */
app.set('view engine', 'ejs');
var access_token = "";

app.use(express.static(__dirname ));

const port = process.env.PORT || 2400;
app.listen(port , () => console.log('App listening on port ' + port));


app.get('/', function(req, res) {
  res.render('/index.html',{client_id: GITHUB_CLIENT_ID});
});


app.get('/home', (req, res)=>{

    //req. query object which is been sent to this route
    const token = req.query.code;
    
    //Get the token by sending a post request with code
    axios({
        method: 'POST',
        url:`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${token}`,
        headers:{
            accept:'application/json'
        }
    }).then((response)=>{
        access_token = response.data.access_token
        console.log("Token : "+ access_token);

        //Redirect the user to the homepage
        res.redirect(`/home.html?access_token=${access_token}`)
    })

})


