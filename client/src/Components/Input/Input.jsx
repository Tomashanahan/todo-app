import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";

function InputTodo() {
	return (
		<Flex mt="18px" justify={"space-between"}>
			<Input
				type={"text"}
				w="476px"
				h="56px"
				borderRadius={"12px"}
				border="1px solid #BDBDBD"
				placeholder="add details"
				_placeholder={{ fontWeight : 'hairline' }}
			/>
			<Button
				bg="#2F80ED"
				color={"white"}
				fontSize="14px"
				w="109px"
				h="56px"
				borderRadius={"12px"}
			>
				Add
			</Button>
		</Flex>
	);
}

export default InputTodo;
