Meteor.methods({
   checkTwitter: function () {
  let userId="wasanchai";
   this.unblock();
  try {
    var result = HTTP.call("GET", "http://dev2008.scasset.net/SCSale/test/Excel",
                           {});
    console.dir(result);
    return true;
  } catch (e) {
      console.dir(e);
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
},
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);

    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    const chatId = Chats.insert(chat);

    return chatId;
  },
  SaleGroup(id) {
    //var Sales = new Mongo.Collection('Sales');
// var pipeline = [
//   {$group: {_id: null, resTime: {$sum: "$price"}}}
// ];
// var result = Sales.aggregate(pipeline);

// return result;
      return Sales.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
)
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }

    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
 ,retrieveMedia: function () {
      this.unblock();
      try {
        var result = HTTP.get("http://dev2008.scasset.net/SCs/documents/camk/CAMK-57060018-3.pdf");
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
         console.dir( new Buffer(result.content).toString('base64'));
        return new Buffer(result.content).toString('base64');
      } else {
        throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }
    }
 ,TestLogin: function () {
      this.unblock();
      try {
        var result = HTTP.post("http://localhost:18850/smartdev2/Home/Account/SignIn",{email:"wasanchai",passowrd:"test",remember:false});
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
         console.dir(result.content);
        return result.content;
      } else {
        throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }
    }
  
 ,retrieveMedia1: function () {
      this.unblock();
      try {
        var result = HTTP.get("http://dev2008.scasset.net/SCs/documents/camk/CAMK-57060018-3.pdf");
        //var result = HTTP.get("http://tools.cdc.gov/api/v2/resources/media?max=3");
      } catch (error) {
        throw new Meteor.Error(error.getMessage());
      } 
      if (result.statusCode === 200) {
         console.dir( new Buffer(result.content).toString('base64'));
        return new Buffer(result.content).toString('base64');
      } else {
        throw new Meteor.Error('HTTP get status ' + result.statusCode);
      }
    }
  ,
  SaveCampaign(data) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in to update his picture.');
    // }

    //check(data, String);
   // console.log(data);
    this.unblock();
    //debugger;
      // check(taskId, String);
   // check(setChecked, Boolean);
   var id = data._id;
   //Campaigns.update(id,data); //ok
   //delete data.$$dependencies;
   delete data._id;
   if(id && id != "") {
    
   console.log("update _id=" + id);

    //   delete data.$$dependencies;
   Campaigns.update(id,{$set:data}); 
   }else {
      console.log("add  "  );
     id = Campaigns.insert(data);
   }
   //ok
 //  console.log(data);
    console.log("_id=" + id);
    //Tasks.update(taskId, { $set: { checked: setChecked } });
   //  throw new Meteor.Error(404, "Please enter your name");
     //  debugger;
    return id;
   // return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
    ,
  SaveMedia(data) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in to update his picture.');
    // }

    //check(data, String);
    console.dir(data);
    this.unblock();
    //debugger;
      // check(taskId, String);
   // check(setChecked, Boolean);
   var id = data._id;
   //Medias.update(id,data); //ok
   //delete data.$$dependencies;
   delete data._id;
   if(id && id != "") {
    
   console.log("update Media _id=" + id);

    //   delete data.$$dependencies;
   Medias.update(id,{$set:data}); 
   }else {
      console.log("add  Media"  );
      Medias.Status="A";
     id = Medias.insert(data);
   }
   //ok
 //  console.log(data);
    console.log("_id=" + id);
    //Tasks.update(taskId, { $set: { checked: setChecked } });
   //  throw new Meteor.Error(404, "Please enter your name");
     //  debugger;
    return id;
   // return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
   ,
  RemoveCampaign(data) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged in to update his picture.');
    // }

    //check(data, String);
    console.dir(data);
      // check(taskId, String);
   // check(setChecked, Boolean);
   var id = data._id;
   //Campaigns.update(id,data); //ok
   Campaigns.update(id,{$set:{'Status':'D'}}); //ok
    console.log("_id=" + id);
    //Tasks.update(taskId, { $set: { checked: setChecked } });
   //  throw new Meteor.Error(404, "Please enter your name");
    return id;
   // return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});
