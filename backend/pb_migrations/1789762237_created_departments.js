/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7to85geluotap65",
    "created": "2026-09-18 20:10:37.832Z",
    "updated": "2026-09-18 20:10:37.832Z",
    "name": "departments",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3pptlxzb",
        "name": "department_id",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n    u.id,\n    SUBSTR(u.diploma, 1, 5) as department_id\nFROM users u"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7to85geluotap65");

  return dao.deleteCollection(collection);
})
