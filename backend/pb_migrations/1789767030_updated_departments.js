/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("54qbcff39lo1jzy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fyerKPc` ON `departments` (`cas_prefix`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "un7r04nm",
    "name": "cas_prefix",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 5,
      "pattern": "[A-Z]+"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("54qbcff39lo1jzy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fyerKPc` ON `departments` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
