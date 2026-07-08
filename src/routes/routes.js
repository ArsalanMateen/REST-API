const express = require("express");

function createRouter(service) {
  const router = express.Router();

  // read all tasks (with optional search, filter by status, and sort)
  router.get("/tasks", async (req, res, next) => {
    try {
      const { search, completed, sort } = req.query;
      const items = await service.getAll({
        search,
        completed,
        sort,
      });
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  });

  // read a specific task by id
  router.get("/tasks/:id", async (req, res, next) => {
    try {
      const result = await service.getById(req.params.id);
      if (result.error) {
        return res.status(result.statusCode).json({ message: result.error });
      }
      res.status(200).json(result.data);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = createRouter;
