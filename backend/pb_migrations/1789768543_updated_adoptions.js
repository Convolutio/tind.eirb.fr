/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "@request.auth.id = parrain.id\n&& parrain.diploma ~ \"%4\"\n&& fillot.diploma ~ \"%3\"\n&& parrain.shotgunDate <= @now\n\n&& @collection.fillot_nbs.id ?= parrain.id\n&& @collection.config.key ?= \"MAX_FILLOTS\"\n&& @collection.fillot_nbs.fillot_nb <= @collection.config.value\n\n&& parrain.department = fillot.department"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "@request.auth.id = parrain.id\n&& parrain.diploma ~ \"%4\"\n&& fillot.diploma ~ \"%3\"\n&& parrain.shotgunDate <= @now\n\n&& @collection.fillot_nbs.id ?= parrain.id\n&& @collection.fillot_nbs.fillot_nb <= 3\n\n&& parrain.department = fillot.department"

  return dao.saveCollection(collection)
})
