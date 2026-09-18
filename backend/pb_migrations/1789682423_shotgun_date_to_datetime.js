/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  // add up queries...
  const dao = new Dao(db);

  // Select users with the old shotgun dates
  const users = arrayOf(DynamicModel({
    "id": "",
    "shotgunDateOld": ""
  }));
  dao.db().select("id", "shotgunDateOld").from("users").all(users);

  console.log("Store the shotgun datetimes in UTC format");

  // Update for each record
  users.forEach(user => {
    const userId = user["id"];
    const oldDate = user["shotgunDateOld"];
    if (oldDate) {
      const newDate = (new Date(oldDate.toString().replace(" ", "T"))).toISOString();
      const record = dao.findRecordById("users", userId);
      record.set("shotgunDate", newDate);
      record.set("shotgunDateOld", "");
      dao.save(record);
    }
  }); 
}, (db) => {
  // add down queries...
  const dao = new Dao(db);

  // Select the users with all the new shotgun dates
  const users = arrayOf(DynamicModel({
    "id": "",
    "shotgunDate": ""
  }));
  dao.db().select("id", "shotgunDate").from("users").all(users);

  console.log("Store the shotgun datetimes in locale string format.");

  // Set the shotgunDateOld attribute
  users.forEach(user => {
    const userId = user["id"]; 
    const shotgunDate = user["shotgunDate"].toString().replace(" ", "T");
    if (shotgunDate) {
      const record = dao.findRecordById("users", userId);

      // Reconvert to locale string format
      const shotgunDate_ = new Date(shotgunDate); 
      const localeTime = shotgunDate_.toLocaleTimeString();
      const nonFormattedLocaleDate = shotgunDate_.toLocaleDateString();
      const [_, month, day, year] = nonFormattedLocaleDate.match(/^(\d+)\/(\d+)\/(\d+)$/);
      const localeDateTimeString = `${year}-${month}-${day} ${localeTime}`;

      record.set("shotgunDateOld", localeDateTimeString);
      record.set("shotgunDate", "");
      dao.save(record);
    }
  }) 
})
