module.exports = function(app, exp) {

	// Redirect to xxx.subnod.es
	/*app.configure('development', function(){ //production
		app.use(function(req, res, next){
			var hostname = req.header("host").split(":")[0];
			if (hostname != "subnod.es") {
				res.redirect('http://subnod.es');
				return;
			}

			next();
		});
	});*/

	app.configure(function(){
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype: 'html', pretty: true });
		app.use(exp.logger('dev'));
  		app.use(exp.bodyParser());
		app.use(exp.methodOverride());
		//app.use(exp.cookieParser());
		//app.use(exp.basicAuth('username','password'));
		app.use(exp.static(app.root + '/app/server'));
		app.use(require('stylus').middleware({
	        src: app.root + '/app/public',
	        compress: true
	    }));
		app.use(exp.static(app.root + '/app/public'));
		//app.use(exp.session())
		//app.use(app.router) // the router itself (app.get(), app.put() etc)
		app.use(function(err, req, res, next){
		  // if an error occurs Connect will pass it down
		  // through these "error-handling" middleware
		  // allowing you to respond however you like
		  res.send(500, { error: 'Sorry something bad happened! ' + err });
		})
	});

	app.configure('development', function(){
		app.use(exp.errorHandler());
	});

	//app.use(function(req, res, next){
	//	res.render('404', {title: 'Page Not Found'});
	//});

}