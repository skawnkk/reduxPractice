const OPEN = "modal/OPEN";
const CLOSE = "modal/CLOSE";
export const openModal = (title) => ({ type: OPEN, title });
export const closeModal = () => ({ type: CLOSE });

const initialState = { open: false, title: "" };

export default function modalControll(state = initialState, action) {
  switch (action.type) {
    case OPEN:
      return { ...state, open: true, title: action.title };
    case CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
}
