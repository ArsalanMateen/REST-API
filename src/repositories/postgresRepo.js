const BaseRepository = require("./baseRepo");

class PostgresRepository extends BaseRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async findById(id) {
    const { rows } = await this.pool.query(
      "SELECT id, title, completed FROM tasks WHERE id = $1",
      [Number(id)],
    );
    return rows[0] || null;
  }

  async create({ title, completed = false }) {
    const { rows } = await this.pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id, title, completed",
      [title, Boolean(completed)],
    );
    return rows[0];
  }
}

module.exports = PostgresRepository;
