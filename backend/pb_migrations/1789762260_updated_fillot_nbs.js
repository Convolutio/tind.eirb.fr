/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t39ke79knykpyjx")

  collection.options = {
    "query": "SELECT\n    u.id,\n    COUNT(a.id) AS fillot_nb\nFROM users u\nLEFT JOIN adoptions a ON a.parrain = u.id\nGROUP BY u.id;"
  }

  // remove
  collection.schema.removeField("zd5mxcxu")

  // remove
  collection.schema.removeField("jx1icney")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7gthnbft",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t39ke79knykpyjx")

  collection.options = {
    "query": "SELECT\n    u.id,\n    COUNT(a.id) AS fillot_nb,\n    SUBSTR(u.diploma, 1, 5) as department_id\nFROM users u\nLEFT JOIN adoptions a ON a.parrain = u.id\nGROUP BY u.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zd5mxcxu",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jx1icney",
    "name": "department_id",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("7gthnbft")

  return dao.saveCollection(collection)
})
