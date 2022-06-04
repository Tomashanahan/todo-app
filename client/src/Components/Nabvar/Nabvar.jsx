import React, { useState, useEffect, useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Context from "../../Context/Todos/CotextTodos";

function Nabvar() {
	let seelcted_localStorage = localStorage.getItem("selected");
	console.log(seelcted_localStorage);
	const [selected, setSelected] = useState(seelcted_localStorage || "All");
	const { dispatch, select_status_todos } = useContext(Context);

	useEffect(() => {
		localStorage.setItem("selected", selected);
		dispatch(select_status_todos(selected));
	}, [selected]);

	return (
		<Box borderBottom={"1px solid #BDBDBD"} mt="58px">
			<Flex justify={"space-between"} w="90%" m="auto">
				<Box>
					<Box
						mb="14px"
						w="91px"
						onClick={() => setSelected("All")}
						cursor="pointer "
					>
						All
					</Box>
					{selected === "All" && (
						<Box h="4px" borderRadius={"4px 4px 0px 0px"} bg="#2F80ED" />
					)}
				</Box>
				<Box>
					<Box
						mb="14px"
						w="91px"
						onClick={() => setSelected("Active")}
						cursor="pointer"
					>
						Active
					</Box>
					{selected === "Active" && (
						<Box h="4px" borderRadius={"4px 4px 0px 0px"} bg="#2F80ED" />
					)}
				</Box>
				<Box>
					<Box
						mb="14px"
						w="91px"
						onClick={() => setSelected("Completed")}
						cursor="pointer"
					>
						Completed
					</Box>
					{selected === "Completed" && (
						<Box h="4px" borderRadius={"4px 4px 0px 0px"} bg="#2F80ED" />
					)}
				</Box>
			</Flex>
		</Box>
	);
}

export default Nabvar;
