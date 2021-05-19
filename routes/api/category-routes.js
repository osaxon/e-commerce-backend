const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const id = req.params.id;
  try {
    const catData = await Category.findByPk(id, {
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  const newCat = req.body;
  try {
    const catData = await Category.create(newCat);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const catID = req.params.id;
  const props = req.body;
  try {
    const catData = await Category.update(props, { where: { id: catID } });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const catID = req.params.id;
  try {
    const catData = await Category.destroy({ where: { id: catID } });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
