const guard = require("../_helpers/guard.js");
const SubCategory = require("../controllers/subCategory.controller.js");

module.exports = app => {
  //Get all Items
  app.post(
    "/services/createSubCategory",
    guard(["admin", "trainer"]),
    SubCategory.newSubCategory
  );
  app.get(
    "/services/getAllCompetences",
    guard(["admin", "trainer"]),
    SubCategory.getAll
  );
  app.get(
    "/services/getSubCategoriesByCompetencyCategory",
    guard(["admin", "trainer"]),
    SubCategory.getAllByCompetencyCategory
  );
  app.post(
    "/services/getSubCategoriesByMainCategory",
    guard(["admin", "trainer"]),
    SubCategory.getAllByMainCategory
  );
};
