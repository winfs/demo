import * as types from './types'

export default {
    addTotalTime ({commit}, time) {
        commit(types.ADD_TOTAL_TIME, time)
    },
    decTotalTime ({commit}, time) {
        commit(types.DEC_TOTAL_TIME, time)
    },
    savePlan ({commit}, plan) {
        commit(types.SAVE_PLAN, plan)
    },
    delPlan ({commit}, idx) {
        commit(types.DEL_PLAN, idx)
    }
}
