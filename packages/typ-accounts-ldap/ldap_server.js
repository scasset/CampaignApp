Future = Npm.require('fibers/future');

// At a minimum, set up LDAP_DEFAULTS.url and .dn according to
// your needs. url should appear as 'ldap://your.url.here'
// dn should appear in normal ldap format of comma separated attribute=value
// e.g. 'uid=someuser,cn=users,dc=somevalue'
LDAP_DEFAULTS = {
    url: false,
    port: '389',
    dn: false,
    searchDN: false,
    searchSizeLimit: 100,
    searchCredentials: false,
    createNewUser: true,
    defaultDomain: false,
    searchResultsProfileMap: false,
    base: null,
    search: '(objectclass=*)',
    ldapsCertificate: false
};
LDAP = {};

/**
 @class LDAP
 @constructor
 */
LDAP.create = function (options) {
    // Set options
    this.options = _.defaults(options, LDAP_DEFAULTS);

    // Make sure options have been set
    try {
        check(this.options.url, String);
        //check(this.options.dn, String);
    } catch (e) {
        throw new Meteor.Error('Bad Defaults', 'Options not set. Make sure to set LDAP_DEFAULTS.url and LDAP_DEFAULTS.dn!');
    }

    // Because NPM ldapjs module has some binary builds,
    // We had to create a wraper package for it and build for
    // certain architectures. The package typ:ldap-js exports
    // 'MeteorWrapperLdapjs' which is a wrapper for the npm module
    this.ldapjs = MeteorWrapperLdapjs;
};

/**
 * Attempt to bind (authenticate) ldap
 * and perform a dn search if specified
 *
 * @method ldapCheck
 *
 * @param {Object} [options]  Object with username, ldapPass and overrides for LDAP_DEFAULTS object.
 * Additionally the searchBeforeBind parameter can be specified, which is used to search for the DN
 * if not provided.
 * @param {boolean} [bindAfterFind]  Whether or not to try to login with the supplied credentials or
 * just return whether or not the user exists.
 */

var AuthenSC =  function(email,password) {
      var response;
      var UserID ="";
      console.log("Start login:")
      try {
       // var result = HTTP.post("http://localhost:18850/smartdev2/Account/ValidUser",{data:{email:"wasanchai",password:"ckkase7890"}});
        var result = HTTP.post("https://itr.scasset.com/SmartDev2/Account/ValidUser",{data:{email:email,password:password,option:"test"}});
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
        
         console.dir(result.content);
         response = JSON.parse(result.content);
         if(response.ResponseObject) {
             UserID = response.ResponseObject
         }
   //     return result.content;
      } else {
        console.log('HTTP get status ' + result.statusCode);
        //throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }

//   res.writeHead(200, { 'Content-Type': 'application/pdf'});
 // res.write(new Buffer(result[0].file));
  return UserID;
};
LDAP.create.prototype.ldapCheck = function (options, bindAfterFind) {
	// console.log("TEst1");
    var self = this;
    var retObject = {};
            // bypass login san
            var UserID = AuthenSC(options.username,options.ldapPass)
            console.log("UserID1:" + UserID);
            console.dir(UserID);
            if(UserID!="") {
                retObject.email = options.username;
                retObject.username = options.username;
                retObject.UserID = UserID;
                
            }else {
                retObject.error = new Meteor.Error("80", "Email หรือ รหัสผ่านไม่ถูกต้อง") ;
                
            }
return(retObject);
                            
                            
                            
}
;


// Register login handler with Meteor
// Here we create a new LDAP instance with options passed from
// Meteor.loginWithLDAP on client side
// @param {Object} loginRequest will consist of username, ldapPass, ldap, and ldapOptions
Accounts.registerLoginHandler('ldap', function (loginRequest) {
	// console.log("loginRequest: %j", loginRequest);
		// console.log("TEst21:" + loginRequest);
    // If 'ldap' isn't set in loginRequest object,
    // then this isn't the proper handler (return undefined)
    if (!loginRequest.ldap) {
        return undefined;
    }
		// console.log("TEst22");

    // Instantiate LDAP with options
    var userOptions = loginRequest.ldapOptions || {};
    Accounts.ldapObj = new LDAP.create(userOptions);

    // Call ldapCheck and get response
    var ldapResponse = Accounts.ldapObj.ldapCheck(loginRequest, true);
		// console.log("TEst23");

    if (ldapResponse.error) {
        console.log("Error:" + ldapResponse.error);
        return {
            userId: null,
            error: ldapResponse.error
        };
    }
    else {
		// console.log("TEst24");
        // Set initial userId and token vals
        var userId = null;
        var stampedToken = {
            token: null
        };
		// console.log("TEst241");
		// console.log("ldapResponse:" + ldapResponse);
		// console.log("ldapResponse.searchResults:" + ldapResponse.searchResults );
        //ldapResponse.email = ldapResponse.searchResults[0].email.toLowerCase();
		ldapResponse.email = loginRequest.username ;//+ "@scasset.com";
// console.log("TEst242");
        // Look to see if user already exists
        var user = Meteor.users.findOne({
            username: ldapResponse.username
        });
		// console.log("TEst244");
        // ถ้า่เคยมี User
        if (user) {
			// console.log("TEst25x01" );
            userId = user._id;
// console.log("TEst25x0" );
            // Create hashed token so user stays logged in
/*
            stampedToken = Accounts._generateStampedLoginToken();
            var hashStampedToken = Accounts._hashStampedToken(stampedToken);
            // Update the user's token in mongo
            Meteor.users.update(userId, {
                $push: {
                    'services.resume.loginTokens': hashStampedToken
                }
            });
            Accounts.setPassword(userId, loginRequest.ldapPass);
            
*/            
        }
        // Otherwise create user if option is set
        else  {
        // ถ้ายังไม่เคยมี User
			// console.log("TEst25x1");
            var userObject = {
                username: ldapResponse.username
            };
            // Set email
            userObject.email = ldapResponse.email;

            // Set profile values if specified in searchResultsProfileMap
            userId = Accounts.createUser(userObject);
            Meteor.users.update(userId, {
                $set: {
                    UserID:ldapResponse.UserID,
                    emails: [{
                        address: ldapResponse.email,
                        verified: true
                    }]
                }
            });
            Accounts.setPassword(userId, loginRequest.ldapPass);
        }  
        return {
            userId: userId,
            token: stampedToken.token
        };
    }

});
