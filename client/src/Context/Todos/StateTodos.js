import axios from "axios";
import React, { useReducer } from "react";
import Context from "./CotextTodos";
import { reducer } from "./Reducer";
import {
	GET_TODOS,
	POST_TODOS,
	PUT_TODOS,
	DELETE_TODOS,
	TODOS_STATUS_SELECTED,
	DELETE_ALL_COMPLETED_TODOS,
} from "../Actions";

const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		todos_active: [],
		todos_completed: [],
		todos_status_selected: "",
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	async function get_todos() {
		let todos = await axios.get("http://localhost:3001/todos");
		dispatch({
			type: GET_TODOS,
			payload: todos,
		});
	}

	async function delete_todos(id) {
		let todos = await axios.delete(
			`http://localhost:3001/todos/delete?id=${id}`
		);
		dispatch({
			type: DELETE_TODOS,
			payload: todos,
		});
	}

	async function post_todos(newTodo) {
		console.log(newTodo);
		let todos = await axios.post(`http://localhost:3001/todos/create`, newTodo);
		dispatch({
			type: POST_TODOS,
			payload: todos,
		});
	}

	async function put_todos(info) {
		console.log("soy la action! -->", info);
		await axios.put(`http://localhost:3001/todos/update`, info);
		dispatch({
			type: PUT_TODOS,
		});
	}

	async function delete_all_completed_todos() {
		await axios.delete(`http://localhost:3001/todos/delete/allCompleted`);
		dispatch({
			type: DELETE_ALL_COMPLETED_TODOS,
		});
	}

	function select_status_todos(status) {
		return {
			type: TODOS_STATUS_SELECTED,
			payload: status,
		};
	}

	return (
		<Context.Provider
			value={{
				state,
				dispatch,
				get_todos,
				delete_todos,
				post_todos,
				put_todos,
				select_status_todos,
				delete_all_completed_todos,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default TodoState;
