/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "91m2569kt99jcfc",
    "created": "2026-09-17 15:14:22.594Z",
    "updated": "2026-09-17 15:14:22.594Z",
    "name": "adoptions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dwlvtkom",
        "name": "parrain",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8qpbu4ku",
        "name": "fillot",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_5bjL8Ie` ON `adoptions` (`fillot`)"
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
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc");

  return dao.deleteCollection(collection);
})
