
module.exports = {
  ensureAuthenticated: function(req, res, next) {
  //  console.log(req)
  console.log('url')
   console.log(req.originalUrl)

    

    if(req.originalUrl.includes('/instructor')){

      if(req.user){
      if(req.user.isInstructor!=true){
        res.send("You dont have acess to this page")
      }

      }
    }

    if(req.originalUrl.includes('/admin')){
       
    if(req.user){

      if(!req.user.isAdmin){
        res.send("You dont have acess to this page")
      }
    }
      

    }

    if (req.isAuthenticated()) {
      return next();
    }



   
    

    //req.flash('error_msg', 'Please log in to view that resource');
   // req.session.save(function () {
      res.redirect('/users/login');
    //});
    // 
   
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
