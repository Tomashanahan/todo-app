import React, { useContext, useState } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import Context from "../../Context/Todos/CotextTodos";

function InputTodo() {
	const [input, setInput] = useState("");
	const { state, dispatch, post_todos } = useContext(Context);
	console.log(state.todo);
	console.log(input);

	function handleSubmit(e) {
		e.preventDefault();
		if (input !== "") {
			dispatch(post_todos({ name: input }));
			window.location.reload()
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex mt="18px" justify={"space-between"}>
				<Input
					type={"text"}
					w="476px"
					h="56px"
					borderRadius={"12px"}
					border="1px solid #BDBDBD"
					placeholder="add details"
					_placeholder={{ fontWeight: "hairline" }}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button
					bg="#2F80ED"
					color={"white"}
					fontSize="14px"
					w="109px"
					h="56px"
					borderRadius={"12px"}
					type="submit"
					_hover={{ bg: "#2F80ED" }}
				>
					Add
				</Button>
			</Flex>
		</form>
	);
}

export default InputTodo;
