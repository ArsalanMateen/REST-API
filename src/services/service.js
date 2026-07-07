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
}

module.exports = Service;
