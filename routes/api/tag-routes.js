const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
      res.status(200).json(tagData)
    } catch (err) {
      res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = req.body;
  try {
    const tagData = await Tag.create(newTag);
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagID = req.params.id;
  const props = req.body;
  try {
    const tagData = await Tag.update(props, { where: { id: tagID }});
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagID = req.params.id;
  try {
    const tagData = await Tag.destroy({
      where: { id: tagID }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
