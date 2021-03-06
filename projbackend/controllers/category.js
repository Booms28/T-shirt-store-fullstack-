// const Category = require("../models/category");
// const formidable = require("formidable");

// exports.getCategoryById = (req, res, next, id) => {
//   Category.findById(id).exec((err, cate) => {
//     if (err) {
//       return res.json(400).json({
//         error: "Category not found",
//       });
//     }
//     req.category = cate;
//     next();
//   });
// };
// exports.createCategory = (req, res) => {
//   const category = new Category(req.body);
//   category.save((err, category) => {
//     if (err) {
//       return res.status(400).json({
//         error: "not able to save category in db",
//       });
//     }
//     res.json({ category });
//   });
// };

// exports.getCategory = (req, res) => {
//   return res.json(req.category);
// };
// exports.getAllCategory = (req, res) => {
//   Category.find().exec((err, items) => {
//     if (err) {
//       return res.status(400).json({
//         error: "no categories found",
//       });
//     }
//     res.json(items);
//   });
// };

// exports.updateCategory = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   const category = req.category;
//   category.name = req.body.name;
//   form.parse(req, (err, fields, file) => {
//     const { name } = fields;
//     let category = req.category;
//     category = _.extend(category, fields);

//     category.save((err, updatedCategory) => {
//       if (err) {
//         return res.status(400).json({
//           error: "no categories found",
//         });
//       }
//       res.json(updatedCategory);
//     });
//   });
// };

// exports.removeCategory = (req, res) => {
//   const category = req.category;
//   category.remove((err, category) => {
//     if (err) {
//       return res.status(400).json({
//         error: "no categories found",
//       });
//     }
//     res.json({
//       message: `Successfully deleted ${category.name}`,
//     });
//   });
// };

const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: "Successfully deleted",
    });
  });
};
