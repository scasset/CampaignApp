Meteor.publish("userData", function () {
  return Meteor.users.find({ _id: this.userId },
    { fields: { 'UserID': 1 } });
});

Meteor.publish('users', function () {
  return Meteor.users.find({}, { fields: { profile: 1, UserID: 1 } });
});
Meteor.publish('parties', function () {
  return parties.find();


});
// ok;
Meteor.publish('Medias', function () {
  return Medias.find({ Status: "A" });


}
);
Meteor.publish('CampaignDetails', function () {
  if (!this.userId) {
    return;
  }
  return Campaigns.find({ Status: "A" }, {});


}

);


Meteor.publish('Campaigns', function () {
  if (!this.userId) {
    return;
  }
  var user = Meteor.users.find(this.userId).fetch()[0];
  console.log("Campaign Refresh");
  //console.dir( user)
  //console.log( user.UserID)
  return Campaigns.find({ Status: "A" }, {
    fields: {
      "medias.ActualVisit": 0 //Exclude family.relation from the sent data
    }
  });

  //   return Campaigns.find( {UserID:user.UserID,Status:"A"},{
  // fields : {
  //   "medias.ActualVisit" : 0 //Exclude family.relation from the sent data
  // }});

}
  // Meteor.publishComposite('campaigns', function () {
  //   console.log("Meteor.Campaigns.find()");
  //   return {
  //     find() {
  //       return Campaigns.find();
  //     }
  //   }


  //return Meteor.Campaigns.find({}, { fields: { name: 1 } });
  //  console.log(Meteor.Campaigns.find());
  //    return Meteor.Campaigns.find();
);
Meteor.publishComposite('chats', function () {
  if (!this.userId) {
    return;
  }

  return {
    find: function () {
      return Chats.find({ userIds: this.userId });
    },
    children: [
      {
        find: function (chat) {
          return Messages.find({ chatId: chat._id });
        }
      },
      {
        find: function (chat) {
          var query = { _id: { $in: chat.userIds } };
          var options = { fields: { profile: 1 } };

          return Meteor.users.find(query, options);
        }
      }
    ]
  }
});


Campaigns.find({ Status: "A" }, {
    fields: {
      "medias.ActualVisit": 0 //Exclude family.relation from the sent data
    }
  });


Meteor.publishComposite('ReportByMedia', function () {

  return {
    find: function () {
        return Medias.find({ Status: "A" });
    },
    children: [
      {
        find: function () {
          return Campaigns.find({ Status: "A" ,"Medias.MediaCode":"think"}, {
    fields: {
      "medias.ActualVisit": 0 //Exclude family.relation from the sent data
    }
  });
        }
      } 
    ]
     
  }
});

/**
 db.getCollection('Campaigns').aggregate(
   [
   { $match: {
    $and: [
        { "Status": "A" },
        { "Medias.MediaCode": "facebook" }
    ]
} },
   { $unwind : "$Medias"},
     {
       $group:
         {
            _id : null,
          // totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           SumBudgetVisit: { $sum: "$Medias.BudgetVisit" },
           SumActualVisit: { $sum: "$Medias.ActualVisit" },
           SumBudgetExpense: { $sum: "$Medias.BudgetExpense" },
         }
     }
   ]
)
  
 * **/