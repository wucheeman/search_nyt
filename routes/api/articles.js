const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);


// Matches with "/api/articles/:id"
router
  .route("/:id")
  // TODO: delete these on cleanup
  // .get(booksController.findById)
  // .put(booksController.update)
  .delete(articlesController.remove);

module.exports = router;