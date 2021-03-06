const guard = require("../_helpers/guard.js");
const ReadyDevelopmentSheet = require("../controllers/readyDevelopmentSheet.controller.js");

module.exports = app => {
  app.post(
    "/services/createReadyDevelopmentSheet",
    guard(["admin"]),
    ReadyDevelopmentSheet.newReadyDevSheet
  );
  app.post(
    "/services/updateReadyDevelopmentSheet",
    guard(["admin"]),
    ReadyDevelopmentSheet.updateReadyDevSheet
  );
  app.post(
    "/services/getEmptyDevSheet",
    guard(["admin", "trainer", "trainee"]),
    ReadyDevelopmentSheet.getemptyById
  );
  app.post(
    "/services/getFullDevSheetTrainer",
    guard(["admin", "trainer"]),
    ReadyDevelopmentSheet.getfullByIdTrainer
  );
  app.post(
    "/services/getFullDevSheetTrainee",
    guard(["trainee"]),
    ReadyDevelopmentSheet.getfullByIdTrainee
  );
};
