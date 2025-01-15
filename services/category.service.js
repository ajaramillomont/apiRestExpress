const { faker } = require('@faker-js/faker');
const pool = require('../libs/postgres.pool');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
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
    const rta = await this.pool.query(query);
    return rta.rows;
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
