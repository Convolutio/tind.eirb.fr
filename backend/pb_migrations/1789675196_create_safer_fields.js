/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  // up queries...
  const dao = new Dao(db);

  // Select all the users
  const users = arrayOf(new DynamicModel({
    "id":    "",
    "parrain": "",
  }));
  dao.select("parrain", "id").from("users").all(users);

  // Create the adoptions
  const adoptions = dao.findCollectionByNameOrId("adoptions");
  users.forEach(user => {
    const parrainId = user["parrain"]
    if (parrainId) {
      const adoptionRecord = new Record(adoptions);
      adoptionRecord.set("parrain", parrainId);
      adoptionRecord.set("fillot", user["id"]);
      dao.save(adoptionRecord);
    }
  });
}, (db) => {
  // down queries...
  db.newQuery("DELETE FROM adoptions;").execute();
})
