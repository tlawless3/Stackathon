import axios from 'axios';

//Action types
const GET_ALL_PIECES = 'GET_ALL_PIECES';
const DELETE_ALL_PIECES = 'DELETE_ALL_PIECES';
const DELETE_ALL_CRATE_PIECES = 'DELETE_ALL_CRATE_PIECES'
//--------------------------------------------
const GET_BY_CATEGORY_PIECES = 'GET_BY_CATEGORY_PIECES'
const GET_BY_ITEM_PIECES = 'GET_BY_ITEM_PIECES'
//---------------------------------------------
const UPDATE_PIECE = 'UPDATE_PIECE';
const DELETE_PIECE = 'DELETE_PIECE';
const CREATE_PIECE = 'CREATE_PIECE';

//MAYBE YOU SHOULDNT BE ABLE TO UPDATE A PIECE

const defaultPieces = [];

//Action creators
const getAllPieces = pieces => ({ type: GET_ALL_PIECES, pieces })
const deleteAllPieces = () => ({ type: DELETE_ALL_PIECES })
const deleteAllCratePieces = (walls) => ({ type: DELETE_ALL_CRATE_PIECES, walls })
//---------------------------------------------
const getCategoryPieces = (pieces) => ({ type: GET_BY_CATEGORY_PIECES, pieces })
const getItemPieces = (pieces) => ({ type: GET_BY_ITEM_PIECES, pieces })
//---------------------------------------------
const updatePiece = piece => ({ type: UPDATE_PIECE, piece })
const deletePiece = id => ({ type: DELETE_PIECE, id })
const createPiece = piece => ({ type: CREATE_PIECE, piece })


//Thunks

export const fetchAllPieces = () =>
    dispatch =>
        axios.get(`api/pieces`)
            .then(res => dispatch(getAllPieces(res.data || defaultPieces)))
            .catch(error => console.log(error));


export const fetchByCategoryPieces = (category) =>
    dispatch =>
        axios.get(`api/pieces/category/${category}`)
            .then(res => dispatch(getCategoryPieces(res.data || defaultPieces)))
            .catch(error => console.log(error));

export const fetchbyItemPieces = (item) =>
    dispatch =>
        axios.get(`api/pieces/item/${item}`)
            .then(res => dispatch(getItemPieces(res.data || defaultPieces)))
            .catch(error => console.log(error));

export const WipeAllPieces = () =>
    dispatch =>
        axios.delete('api/pieces/p/all')
            .then(() => dispatch(deleteAllPieces()))
            .catch(error => console.log(error));

export const WipeAllCratePieces = () =>
    dispatch =>
        axios.delete('api/pieces/p/crates')
            .then((res) => dispatch(deleteAllCratePieces(res.data)))
            .catch(error => console.log(error));

// ---------------------------------------------
export const updatePieceThunk = (piece, x, y) =>
    dispatch =>
        axios.put(`/api/pieces/${x}/${y}`, piece)
            .then(res => dispatch(updatePiece(res.data || defaultPiece)))
            .catch(err => console.error(err))

export const deletePieceThunk = (id) =>
    dispatch => {
        dispatch(deletePiece(id || defaultPiece))
        axios.delete(`/api/pieces/${id}`)
    }

export const createPieceThunk = (PieceToAdd) => {
    return dispatch =>
        axios.post('/api/pieces', PieceToAdd)
            .then(res => dispatch(createPiece(res.data)))
            .catch(err => console.error(err))
}

//REDUCER
export default function (state = defaultPieces, action) {
    switch (action.type) {
        case GET_ALL_PIECES:
            return action.pieces;
        case DELETE_ALL_PIECES:
            return [];
        case GET_BY_CATEGORY_PIECES:
            return action.pieces
        case GET_BY_ITEM_PIECES:
            return action.pieces
        case DELETE_ALL_CRATE_PIECES:
            return action.walls
        case UPDATE_PIECE:
            return state.map(piece => (action.id === piece.id ? action.piece : piece))
        case CREATE_PIECE:
            return [action.piece, ...state]
        case DELETE_PIECE:
            return state.filter(piece => {
                console.log('each piece', piece.id, 'action id', action.id)
                return piece.id !== action.id
            });
        default:
            return state
    }
}
