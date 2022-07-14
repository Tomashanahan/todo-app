const { Todo, User } = require("../db");
const jwt = require("jsonwebtoken");

const get_todos = async (req, res) => {
	try {
		const all_todos = await Todo.findAll({ where: { UserId: req.user.id } });
		if (all_todos.length > 0) {
			res.json(all_todos);
		} else {
			res.send("No hay tareas");
		}
	} catch (error) {
		console.log(error);
	}
};

const post_todos = async (req, res) => {
	const { name, active, completed } = req.body;
	try {
		let new_todo = await Todo.create({ name, active, completed });
		await req.user.addTodo(new_todo);
		res.json(new_todo);
	} catch (error) {
		console.log(error);
	}
};

const put_todos = async (req, res) => {
	const { id, name, completed, active } = req.body;
	if (!id) {
		res.send("Falto el id!");
	} else if (!id && !name && !completed && !active) {
		res.send("Falto informacion!");
	} else if (id && name && !completed && !active) {
		const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
		todo.name = name;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && !active) {
		const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
		todo.name = name;
		todo.completed = completed;
		await todo.save();
		res.json(todo);
	} else if (id && !name && completed && !active) {
		const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
		todo.completed = todo.completed === true ? false : true;
		await todo.save();
		res.json(todo);
	} else if (id && !name && !completed && active) {
		const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
		todo.active = active;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && active) {
		const todo = await Todo.findOne({ where: { id, UserId: req.user.id } });
		todo.name = name;
		todo.completed = completed;
		todo.active = active;
		await todo.save();
		res.json(todo);
	}
};

const delete_todos = async (req, res) => {
	const { id } = req.query;
	try {
		const deleted_todo = await Todo.destroy({
			where: { id, UserId: req.user.id },
		});
		if (deleted_todo >= 1) {
			res.send("Todo eliminado con exito");
		} else {
			res.send("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
};

const delete_todos_completed = async (req, res) => {
	try {
		const deleted_todo = await Todo.destroy({
			where: { completed: true, UserId: req.user.id },
		});
		if (deleted_todo >= 1) {
			res.send("Todo eliminado con exito");
		} else {
			res.send("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	get_todos,
	post_todos,
	put_todos,
	delete_todos,
	delete_todos_completed,
};