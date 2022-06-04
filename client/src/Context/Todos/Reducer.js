import { GET_TODOS, POST_TODOS, PUT_TODOS, DELETE_TODOS, TODOS_STATUS_SELECTED } from "../Actions";

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case GET_TODOS:
			return {
				...state,
				todos: payload.data,
				todos_active: payload.data.filter(elem => elem.active === true && elem.completed === false),
				todos_completed: payload.data.filter(elem => elem.completed === true),
			};
		case POST_TODOS:
			return {
				...state,
				todos: payload,
			};
		case PUT_TODOS:
			return {
				...state,
			};
		case DELETE_TODOS:
			return {
				...state,
			};
		case TODOS_STATUS_SELECTED:
            console.log(payload)
			return {
				...state,
                todos_status_selected : payload
			};
		default:
			return state;
	}
};
