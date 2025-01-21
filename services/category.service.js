const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 5; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      })
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

   async find() {
    const query = 'SELECT * FROM tasks';
    const [ data ] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1) {
      throw new Error("category not found");
    }

    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1) {
      throw new Error('This category not exist');
    }

    this.categories.splice(index, 1);
    return { id }

  }

}

module.exports = CategoriesService;
