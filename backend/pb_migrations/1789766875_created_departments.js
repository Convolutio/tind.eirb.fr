/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "54qbcff39lo1jzy",
    "created": "2026-09-18 21:27:55.973Z",
    "updated": "2026-09-18 21:27:55.973Z",
    "name": "departments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "un7r04nm",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 6,
          "max": 6,
          "pattern": "[A-Z]+ \\d"
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_fyerKPc` ON `departments` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("54qbcff39lo1jzy");

  return dao.deleteCollection(collection);
})
