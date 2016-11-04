this.Documents = new Mongo.Collection("documents");  

if (Meteor.isClient){

    //Make the date "reactive" by setting in in the Session, which is reactive, so the date_display template will re-render automatically
    Meteor.setInterval(function(){
        Session.set("current_date", new Date());
    },1000); // every second
    
    Template.editor.helpers({
        docid: function(){
            var doc = Documents.findOne();
            if (doc){
                return doc._id;
            }else{
                return undefined;
            }
        }
    });
    Template.date_display.helpers({
        current_date: function(){
            return Session.get("current_date");
        }
    });
}

if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
        if(!Documents.findOne()){ //no document yet
            Documents.insert({title:"my new document"});
        }
	});
}