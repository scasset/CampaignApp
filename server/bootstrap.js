Meteor.startup(function () {
  //  var result = HTTP.call("GET", "http://dev2008.scasset.net/SCSale/test/Excel",
  //                          {});
  //   console.dir(result);
  
  // Router.route('/users/:id',{where: 'server'})

  //   // GET /message/:id - returns specific records

  //   .get(function(){
  //       var response;
        
  //      // this.response.setHeader('Content-Type','application/json');
  //       this.response.setHeader('Content-Type','application/pdf');
  //     //  this.response.setHeader('Content-Type','text/html');
        
  //       var url = "http://localhost:60343/test/GetBase64String?MobileRequestInfoID=1";
  //        try {
  //      var options = {
  //        //headers: {'Content-Type': 'application/pdf'}
  //     }

  //       var result = HTTP.get(url, {encoding: null});
  //      // var result = HTTP.get("http://dev2008.scasset.net/SCs/images/Blueobject_first.png",options);
  //       //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
  //     } catch (error) {
  //       throw new Meteor.Error(error.getMessage());
  //     } 
  //     if (result.statusCode === 200) {
  //        // console.dir(new Buffer(result.content).toHex()); 
  //       //return new Buffer(result.content).toString('base64');
  //     } else {
  //       throw new Meteor.Error('HTTP get status ' + result.statusCode);
  //     }
  //       this.response.end(new Buffer(result.content,'base64'));
  //   })

  //   // PUT /message/:id {message as put data}- update specific records.

  //    ;
 
 console.log("setting test =" + Meteor.settings.test);
  Campaigns.after.find(function (userId, selector, options) {
   console.log("before.find");
});

Picker.route('/post/:_id', function(params, req, res, next) {
     // this.unblock();
      try {
       var options = {
         //headers: {'Content-Type': 'application/pdf'}
      }

       // var result = HTTP.get("http://localhost:60343/test/GetBase64String?MobileRequestInfoID=1", {encoding: null});
        var result = HTTP.get("http://dev2008.scasset.net/SCSale/Meteor/GetBase64String?MobileRequestInfoID=47", {encoding: null});
       // var result = HTTP.get("http://dev2008.scasset.net/SCs/images/Blueobject_first.png",options);
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
         // console.dir(new Buffer(result.content).toHex()); 
        //return new Buffer(result.content).toString('base64');
      } else {
        throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }
         console.log("get ok:" + result.statusCode)
  //res.end(result.content);
   //res.writeHead(200, { 'Content-Type': 'application/pdf'});
   //res.writeHead(200, { 'Content-Type': 'image/png'});
    res.write(new Buffer(result.content,'base64'));
  res.end();
  //res.write(new Buffer(result.content)); 
});
Picker.route('/file/:_id', function(params, req, res, next) {
        var result  =   parties.find().fetch();
         //  console.dir( result); 
         console.log("get ok:" )
      //   console.log("get ok:" + result._id)
   // res.end(result[0].name);
   res.writeHead(200, { 'Content-Type': 'application/pdf'});
  res.write(new Buffer(result[0].file));
  res.end();
});
Picker.route('/login/', function(params, req, res, next) {
      var response;
      try {
       // var result = HTTP.post("http://localhost:18850/smartdev2/Account/ValidUser",{data:{email:"wasanchai",password:"ckkase7890"}});
        var result = HTTP.post("https://itr.scasset.com/SmartDev2/Account/ValidUser",{data:{email:"wasanchai",password:"ckkase78910"}});
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
        
         console.dir(result.content);
         response = JSON.parse(result.content);
   //     return result.content;
      } else {
        console.log('HTTP get status ' + result.statusCode);
        //throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }

//   res.writeHead(200, { 'Content-Type': 'application/pdf'});
 // res.write(new Buffer(result[0].file));
  res.end("ResponseObject:" + response.ResponseObject);
});
    
 LDAP_DEFAULTS.url = "ldap://batman2008.scasset.com";
 LDAP_DEFAULTS.port = "389";
 LDAP_DEFAULTS.createNewUser = true;
  console.log("Start:" + Campaigns.find().count());
  if (Campaigns.find().count() == 0) {
  
 

   }
   
});
