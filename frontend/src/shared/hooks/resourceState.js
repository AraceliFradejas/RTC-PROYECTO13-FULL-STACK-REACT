export const initialResource = { status: 'loading', data: null, error: null };
export function resourceReducer(state, action) {
  switch (action.type) {
    case 'start': return { ...state, status: 'loading', error: null };
    case 'success': return { status: 'success', data: action.data, error: null };
    case 'error': return { status: 'error', data: null, error: action.error };
    default: return state;
  }
}
