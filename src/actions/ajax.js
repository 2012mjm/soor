import {createAction} from 'redux-act'

export const isLoading = createAction('IS_LOADING', bool => bool)
export const hasErrored = createAction('HAS_ERRORED', bool => bool)
