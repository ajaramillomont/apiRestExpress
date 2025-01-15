const { faker } = require('@faker-js/faker');
const pool = require('../libs/postgres.pool');
class UsersService {

  constructor() {

    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (error) => console.log(error));
  }

  generate() {
    for (let index = 0; index < 3; index++) {
      this.users.push({
        id: faker.string.uuid(),
        username: faker.internet.username(),
        password: faker.internet.password()
      })
    }
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    return this.users.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if( index === -1) {
      throw new Error('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if( index === -1) {
      throw new Error('El usuario no existe');
    }
    this.users.splice(index, 1);

    return { id };
  }

}

module.exports = UsersService;
