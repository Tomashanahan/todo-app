const { Router } = require("express");
const router = Router();
const {
	get_todos,
	post_todos,
	put_todos,
	delete_todos,
	delete_todos_completed,
} = require('../Controllers/TodoController')
const { Todo } = require("../db");
const check_user_auth = require("../Middleware/authmiddleware")


router.get("/", check_user_auth, get_todos);

router.post("/create", check_user_auth, post_todos);

router.put("/update", check_user_auth, put_todos);

router.delete("/delete", check_user_auth, delete_todos);

router.delete("/delete/allCompleted", check_user_auth, delete_todos_completed);

module.exports = router;
