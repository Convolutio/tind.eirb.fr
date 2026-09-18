/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  db.newQuery(`
    INSERT INTO departments (name)
    SELECT DISTINCT substr(diploma, 1, 5)
    FROM users
    WHERE diploma IS NOT NULL;
    UPDATE users AS u
    SET department = d.id
    FROM departments AS d
    WHERE substr(u.diploma, 1, 5) = d.name;
  `).execute();
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qbtnpirj",
    "name": "department",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "54qbcff39lo1jzy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qbtnpirj",
    "name": "department",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "54qbcff39lo1jzy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))
  const result = dao.saveCollection(collection);
  db.newQuery(`
    DELETE FROM departments;
    UPDATE users AS u
    SET department = "";
  `).execute();
  return result;
})
