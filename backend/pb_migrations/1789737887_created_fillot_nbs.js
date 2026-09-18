/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "t39ke79knykpyjx",
    "created": "2026-09-18 13:24:47.728Z",
    "updated": "2026-09-18 13:24:47.728Z",
    "name": "fillot_nbs",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tmxdrvwy",
        "name": "fillot_nb",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
      "query": "SELECT parrain as id, COUNT(*) as fillot_nb FROM adoptions GROUP BY parrain;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("t39ke79knykpyjx");

  return dao.deleteCollection(collection);
})
