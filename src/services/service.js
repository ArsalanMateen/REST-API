function isValidTitle(title) {
  if (title === undefined || typeof title !== "string" || title.trim() === "") {
    return false;
  }
  return true;
}

class Service {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll({ search, completed, sort } = {}) {
    return this.repo.findAll({
      search,
      completed,
      sort,
    });
  }

  async getById(id) {
    if (isNaN(Number(id))) {
      return { error: "Invalid id", statusCode: 400 };
    }
    const item = await this.repo.findById(Number(id));
    if (!item) {
      return { error: `Task ${id} not found`, statusCode: 404 };
    }
    return { data: item };
  }
}

module.exports = Service;
