import {createAction} from 'redux-act'

export const setStoreList = createAction('SET_STORE_LIST', data => data)
export const setCurrentStore = createAction('SET_CURRENT_STORE', data => data)