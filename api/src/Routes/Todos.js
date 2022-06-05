const { Router } = require("express");

const router = Router();
const { Todo } = require("../db");

router.get("/", async (req, res) => {
	try {
		const all_todos = await Todo.findAll();
		if (all_todos.length > 0) {
			res.json(all_todos);
		} else {
			res.send("No hay tareas");
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/create", async (req, res) => {
	const { name, active, completed } = req.body;
	try {
		let new_todo = await Todo.create({ name, active, completed });
		res.json(new_todo);
	} catch (error) {
		console.log(error);
	}
});

router.put("/update", async (req, res) => {
	const { _id, _completed } = req.query;
	const { id, name, completed, active } = req.body;
	
	if (!id) {
		res.send("Falto el id!");
	} else if (!id && !name && !completed && !active) {
		res.send("Falto informacion!");
	} else if (id && name && !completed && !active) {
		const todo = await Todo.findOne({ where: { id } });
		todo.name = name;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && !active) {
		const todo = await Todo.findOne({ where: { id } });
		todo.name = name;
		todo.completed = completed;
		await todo.save();
		res.json(todo);
	} else if (id && !name && completed && !active) {
		const todo = await Todo.findOne({ where: { id } });
		todo.completed = todo.completed === true ? false : true;
		await todo.save();
		res.json(todo);
	} else if (id && !name && !completed && active) {
		const todo = await Todo.findOne({ where: { id } });
		todo.active = active;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && active) {
		const todo = await Todo.findOne({ where: { id } });
		todo.name = name;
		todo.completed = completed;
		todo.active = active;
		await todo.save();
		res.json(todo);
	}
});

router.delete("/delete", async (req, res) => {
	const { id } = req.query;
	try {
		const deleted_todo = await Todo.destroy({ where: { id } });
		if (deleted_todo >= 1) {
			res.send("Todo eliminado con exito");
		} else {
			res.send("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
