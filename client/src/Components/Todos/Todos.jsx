/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Context from "../../Context/Todos/CotextTodos";
import { useEffect } from "react";
import { Box, Checkbox, Stack } from "@chakra-ui/react";

function Todos() {
	const { state, dispatch, get_todos, put_todos } = useContext(Context);
	state.todos = state.todos.sort((a, b) => a.id - b.id);

	useEffect(() => {
		dispatch(get_todos());
	}, [state.todos_status_selected]);

	return (
		<Stack mt="33px">
			{state.todos?.length > 0 && state.todos_status_selected === "All"
				? state.todos.map((elem) => {
						return (
							<Box
								key={elem.id}
								textAlign="left"
								onClick={(e) => {
									e.preventDefault();
									dispatch(put_todos({ id: elem.id, completed: true }));
									window.location.reload();
								}}
							>
								<Checkbox
									defaultChecked={elem.completed}
									textDecoration={elem.completed === true ? "line-through" : ""}
									fontSize={"18px"}
								>
									{elem.name}
								</Checkbox>
							</Box>
						);
				  })
				: state.todos_status_selected === "Active"
				? state.todos_active.map((elem) => {
						return (
							<Box
								key={elem.id}
								textAlign="left"
								onClick={(e) => {
									e.preventDefault();
									dispatch(put_todos({ id: elem.id, completed: true }));
									window.location.reload();
								}}
							>
								<Checkbox
									defaultChecked={elem.completed}
									textDecoration={elem.completed === true ? "line-through" : ""}
									fontSize={"18px"}
								>
									{elem.name}
								</Checkbox>
							</Box>
						);
				  })
				: state.todos_completed.map((elem) => {
						return (
							<Box
								key={elem.id}
								textAlign="left"
								onClick={(e) => {
									e.preventDefault();
									dispatch(put_todos({ id: elem.id, completed: true }));
									window.location.reload();
								}}
							>
								<Checkbox
									defaultChecked={elem.completed}
									textDecoration={elem.completed === true ? "line-through" : ""}
									fontSize={"18px"}
								>
									{elem.name}
								</Checkbox>
							</Box>
						);
				  })}
		</Stack>
	);
}

export default Todos;
