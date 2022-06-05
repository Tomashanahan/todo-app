/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Context from "../../Context/Todos/CotextTodos";
import { useEffect } from "react";
import { Box, Button, Checkbox, Flex, Stack } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

function Todos() {
	const { state, dispatch, get_todos, put_todos } = useContext(Context);

	useEffect(() => {
		dispatch(get_todos());
	}, [state.todos_status_selected]);

	return (
		<Stack mt="33px" mb='100px'>
			{state.todos?.length > 0 && state.todos_status_selected === "All" ? (
				state.todos.map((elem) => {
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
			) : state.todos_status_selected === "Active" ? (
				state.todos_active.map((elem) => {
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
			) : (
				<Stack>
					{state.todos_completed.map((elem) => {
						return (
							<Box key={elem.id} /* mb='37px' */>
								<Flex justify={"space-between"} align="center">
									<Box
										textAlign="left"
										onClick={(e) => {
											e.preventDefault();
											dispatch(put_todos({ id: elem.id, completed: true }));
											window.location.reload();
										}}
									>
										<Checkbox
											defaultChecked={elem.completed}
											textDecoration={
												elem.completed === true ? "line-through" : ""
											}
											fontSize={"18px"}
										>
											{elem.name}
										</Checkbox>
									</Box>
									<Box fontSize={"18px"} color="#BDBDBD" cursor="pointer">
										<MdDeleteOutline />
									</Box>
								</Flex>
							</Box>
						);
					})}
					{state.todos_completed.length > 0 && (
						<Button
							style={{marginTop : '37px'}}
							bg="#EB5757"
							color="#FFFFFF"
							fontSize={"12px"}
							w="124px"
							h="40px"
							alignSelf={"flex-end"}
							_hover={{bg : '#EB5757'}}
						>
							<MdDeleteOutline />
							delete all
						</Button>
					)}
				</Stack>
			)}
		</Stack>
	);
}

export default Todos;
