import * as types from './types' 

export default {
    [types.ADD_TOTAL_TIME] (state, time) {
        state.totalTime += ~~time
    },
    [types.DEC_TOTAL_TIME] (state, time) {
        state.totalTime -= time
    },
    [types.SAVE_PLAN] (state, plan) {
        state.list.push(plan)
    },
    [types.DEL_PLAN] (state, idx) {
        state.list.splice(idx, 1)
    }
}
