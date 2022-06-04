import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import InputTodo from "./Components/Input/Input";
import Nabvar from "./Components/Nabvar/Nabvar.jsx";
import Todos from "./Components/Todos/Todos";
import StateTodos from "./Context/Todos/StateTodos";

function App() {
	return (
		<StateTodos>
			<Box w="608px" m={"auto"} className="App">
				<Text
					fontWeight={"extrabold"}
					fontSize="36px"
					mt="36px"
					color={"#333333"}
				>
					#todo
				</Text>
				<Nabvar />
				<InputTodo />
				<Todos />
			</Box>
		</StateTodos>
	);
}

export default App;
