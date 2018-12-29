const db = require("../config/db.config");
const Sequelize = require("sequelize");
const ReadyDevSheet = db.readyDevelopmentSheet;
const DevelopmentSheet = db.developmentSheet;
const devSheet = require("./developmentSheet.service");
const compCategory = require("./competencyCategory.service");
const mainCategory = require("./mainCategory.service");
const subCategory = require("./subCategory.service");
const competence = require("./competence.service");

module.exports = {
  update,
  create,
  getById
};

async function create(devSheetParam) {
  let competencesForDevSheet = [];
  // validate
  const version = 1;
  // Create DevSheet
  let body = {
    education: devSheetParam.education,
    department: devSheetParam.department
  };
  await devSheet.create(body);

  let identifier = 1;
  await DevelopmentSheet.findOne({
    where: {},
    attributes: [[Sequelize.fn("max", Sequelize.col("id")), "id"]]
  }).then(function(result) {
    if (result == null || result == {}) {
      identifier = 1;
    } else {
      identifier = result.id + 1;
    }
  });

  // Step through CompetencyCategory
  const content = devSheetParam.content;
  for (let i = 0; i < content.length; i++) {
    let x = { name: content[i].name };
    try {
      await compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.length; j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        await mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategories = maincategories[j].children;
      for (let k = 0; k < subcategories.length; k++) {
        let z = {
          name: subcategories[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          await subCategory.create(z);
        } catch {}
        // Step through competences
        let competences = subcategories[k].children;
        for (let l = 0; l < competences.length; l++) {
          let zA = {
            name: competences[l].name,
            ynAnswer: competences[l].ynAnswer,
            SubCategoryName: subcategories[k].name
          };
          try {
            await competence.create(zA);
          } catch {}

          // Create Relationship

          competencesForDevSheet.push({
            version: version,
            goalCross: competences[l].goalCross,
            CompetenceName: competences[l].name,
            DevelopmentSheetId: identifier
          });
        }
      }
    }
  }
  console.log("LOG: " + competencesForDevSheet);
  await ReadyDevSheet.bulkCreate(competencesForDevSheet, {
    returning: true
  })
    .then(() => {})
    .catch(function(err) {
      console.log(err);
    });
}

async function update(devSheetParam) {
  let competencesForDevSheet = [];
  // validate

  // Step through CompetencyCategory

  let identifier;
  await ReadyDevSheet.findOne({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId
    },
    attributes: [[Sequelize.fn("max", Sequelize.col("version")), "version"]]
  }).then(function(result) {
    identifier = result.version + 1;
    console.log("LOG: " + identifier);
  });

  const content = devSheetParam.content;
  for (let i = 0; i < content.length; i++) {
    let x = { name: content[i].name };
    try {
      await compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.length; j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        await mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategories = maincategories[j].children;
      for (let k = 0; k < subcategories.length; k++) {
        let z = {
          name: subcategories[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          await subCategory.create(z);
        } catch {}
        // Step through competences
        let competences = subcategories[k].children;
        for (let l = 0; l < competences.length; l++) {
          let zA = {
            name: competences[l].name,
            ynAnswer: competences[l].ynAnswer,
            SubCategoryName: subcategories[k].name
          };
          try {
            await competence.create(zA);
          } catch {}

          // Create Relationship

          competencesForDevSheet.push({
            version: identifier,
            goalCross: competences[l].goalCross,
            CompetenceName: competences[l].name,
            DevelopmentSheetId: devSheetParam.DevelopmentSheetId
          });
        }
      }
    }
  }
  await ReadyDevSheet.bulkCreate(competencesForDevSheet, {
    returning: true
  })
    .then(() => {})
    .catch(function(err) {
      console.log(err);
    });
}
async function getById(devsheetparam) {
  let identifier;

  await ReadyDevSheet.findOne({
    where: {
      DevelopmentSheetId: devsheetparam.id
    },
    attributes: [[Sequelize.fn("max", Sequelize.col("version")), "version"]]
  }).then(function(result) {
    identifier = result.version;
    console.log("LOG: " + identifier);
  });
  let result = await db.readyDevelopmentSheet.findAll({
    attributes: ["id", "goalcross", "version", "DevelopmentSheetId"],
    required: true,
    /*order:  Sequelize.col("id"),*/
    where: { version: identifier },
    include: [
      {
        model: db.competence,
        attributes: ["name", "ynAnswer"],
        required: true,
        include: [
          {
            model: db.subCategory,
            attributes: ["name"],
            required: true,
            include: [
              {
                model: db.mainCategory,
                attributes: ["name"],
                required: true,
                include: [
                  {
                    model: db.competencyCategory,
                    attributes: ["name"],
                    required: true,
                    include: [
                      {
                        model: db.developmentSheet,
                        attributes: ["education", "department"],
                        required: true,

                        where: {
                          id: devsheetparam.id
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });
  //collecting ReadyDevSheetInfos
  let content = new Array();
  let info = {
    devSheetid: result[0].DevelopmentSheetId,
    version: result[0].version,
    department:
      result[0].Competence.SubCategory.MainCategory.CompetencyCategory
        .DevelopmentSheet.department,
    education:
      result[0].Competence.SubCategory.MainCategory.CompetencyCategory
        .DevelopmentSheet.education,
    content: []
  };

  let competencycategories = [];

  let i = 0;
  let j = 0;
  let s = 0;
  let m = 0;

  for (i = 0; i < result.length; i++) {
    if (
      !competencycategories.find(c => {
        return (
          c.name ===
          result[i].Competence.SubCategory.MainCategory.CompetencyCategory.name
        );
      })
    ) {
      let comp = {
        name:
          result[i].Competence.SubCategory.MainCategory.CompetencyCategory.name,
        children: []
      };
      competencycategories.push(comp);
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (j = 0; j < result.length; j++) {
      if (
        !competencycategories[i].children.find(c => {
          return c.name === result[j].Competence.SubCategory.MainCategory.name;
        }) &&
        result[j].Competence.SubCategory.MainCategory.CompetencyCategory
          .name === competencycategories[i].name
      ) {
        let comp = {
          name: result[j].Competence.SubCategory.MainCategory.name,
          children: []
        };
        competencycategories[i].children.push(comp);
      }
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (m = 0; m < competencycategories[i].children.length; m++) {
      for (j = 0; j < result.length; j++) {
        if (
          !competencycategories[i].children[m].children.find(c => {
            return c.name === result[j].Competence.SubCategory.name;
          }) &&
          result[j].Competence.SubCategory.MainCategory.name ===
            competencycategories[i].children[m].name
        ) {
          let sub = {
            name: result[j].Competence.SubCategory.name,
            children: []
          };
          competencycategories[i].children[m].children.push(sub);
        }
      }
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (m = 0; m < competencycategories[i].children.length; m++) {
      for (
        s = 0;
        s < competencycategories[i].children[m].children.length;
        s++
      ) {
        for (j = 0; j < result.length; j++) {
          if (
            !competencycategories[i].children[m].children[s].children.find(
              c => {
                return c.name === result[j].Competence.name;
              }
            ) &&
            result[j].Competence.SubCategory.name ===
              competencycategories[i].children[m].children[s].name
          ) {
            let competences = {
              name: result[j].Competence.name,
              goalCross: result[j].goalcross,
              ynAnswer: result[j].Competence.ynAnswer
            };
            competencycategories[i].children[m].children[s].children.push(
              competences
            );
          }
        }
      }
    }
  }
  info.content.push(competencycategories);
  return info;
}
