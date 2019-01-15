// const express = require('express'),
// 	  path=require('path');
	  
// const app = express();


// app.use(express.static('.dist/shopping-store'));

// app.get('/', (req, res) => {
	
// 	res.sendFile(path.join(__dirname,'/dist/shopping-store/index.html'));

// 	});

// app.listen(process.env.PORT||8080, () => console.log(`server started!`));


//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/shopping-store'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/shopping-store/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);