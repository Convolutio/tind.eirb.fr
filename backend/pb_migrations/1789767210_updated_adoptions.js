/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "@request.auth.id = parrain.id\n&& parrain.diploma ~ \"%4\"\n&& fillot.diploma ~ \"%3\"\n&& parrain.shotgunDate <= @now\n\n&& @collection.fillot_nbs.id ?= parrain.id\n&& @collection.fillot_nbs.fillot_nb <= 3\n\n&& parrain.department = fillot.department"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "@request.auth.id = parrain.id\n&& parrain.diploma ~ \"%4\"\n&& fillot.diploma ~ \"%3\"\n&& parrain.shotgunDate <= @now\n\n&& @collection.fillot_nbs.id ?= parrain.id\n&& @collection.fillot_nbs.fillot_nb <= 3\n\n&& @collection.departments:parrain_dept.id ?= parrain.id\n&& @collection.departments:fillot_dept.id ?= fillot.id\n&& @collection.departments:parrain_dept.department_id = @collection.departments:fillot_dept.department_id"

  return dao.saveCollection(collection)
})
