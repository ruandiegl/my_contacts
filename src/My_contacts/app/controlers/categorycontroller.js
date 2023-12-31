const categoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request,response) {
    const categories = await categoriesRepository.findAll();

    response.json(categories)
  }

 async store(request,response) {
    const {name} = request.body;

    if (!name) {
      return response.status(400).json({error: "Name required"})
  }

  const category = await categoriesRepository.create({ name });

  response.json(category);

}
}

module.exports = new CategoryController();
