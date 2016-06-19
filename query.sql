db.sales.aggregate(
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
  
  
  
  //////////
  
  db.campaigns.aggregate(
     [
       {
         $group : {
             _id : { mediacode: '$name' },
             TotalVisit: { $sum: '$test'},
            TotalGoal: { $sum: "$medias.targetvisit" },
            count: { $sum: 1 }
          }
        }
     ]
  )
  ///
  
  db.campaigns.group  (
        {
             key : { 'name': 1 },
             cond:{},
             reduce: function (curr,result) {
                 result.total += curr.test;
                 },
               initial :{total:0} 
          }
      
  )
  
  
  //
  
  var mapFunction1 = function() {
                       for (var idx = 0; idx < this.medias.length; idx++) {
                           var key = this.medias[idx].mediacode;
                           var value = {
                                         count: 1,
                                         qty: this.medias[idx].targetvisit
                                       };
                           emit(key, value);
                       }
                    };
var reduceFunction1 = function(keySKU, countObjVals) {
                     reducedVal = { count: 0, qty: 0 };

                     for (var idx = 0; idx < countObjVals.length; idx++) {
                         reducedVal.count += countObjVals[idx].count;
                         reducedVal.qty += countObjVals[idx].qty;
                     }

                     return reducedVal;
                  };
db.campaigns.mapReduce(
                     mapFunction1,
                     reduceFunction1,
                     { out: "map_reduce_example" }
                   )
                   
///
var mapFunction2 = function() {
                       for (var idx = 0; idx < this.medias.length; idx++) {
                           var key = this.medias[idx].mediacode;
                           var value = {
                                         count: 1,
                                         qty: this.medias[idx].targetvisit
                                       };
                           emit(key, value);
                       }
                    };
                    
  var reduceFunction2 = function(keySKU, countObjVals) {
                     reducedVal = { count: 0, qty: 0 };

                     for (var idx = 0; idx < countObjVals.length; idx++) {
                         reducedVal.count += countObjVals[idx].count;
                         reducedVal.qty += countObjVals[idx].qty;
                     }

                     return reducedVal;
                  };

var finalizeFunction2 = function (key, reducedVal) {

                       reducedVal.avg = reducedVal.qty/reducedVal.count;

                       return reducedVal;

                    };
                    
db.campaigns.mapReduce( mapFunction2,
                     reduceFunction2,
                     {
                       out: { merge: "map_reduce_example" } 
                     }
                   )                    
                                     
                                     
////
  db.campaigns.aggregate(
     [
     { $unwind : "$medias" },
     
       {
         $group : {
             _id : { mediacode: '$medias.mediacode' },
             TotalVisit: { $sum: '$test'},
            TotalGoal: { $sum: "$medias.targetvisit" },
            count: { $sum: 1 }
          }
        }
     ]
  )                                     
  
  