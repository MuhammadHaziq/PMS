const state = {
    progressValue: (100 / 10) * 1,
    completedStep: 1,
    numberOfStep: 13
};

const getters = {
    getProgressValue: state => state.progressValue,
    getCompletedStep: state => state.completedStep,
};

const actions = {
    setCompletedStep({ commit }, data) {
        commit("SET_COMPLETED_STEP", data);
    }
};

const mutations = {
    SET_COMPLETED_STEP(state, data) {
        const singleStepValue = 100 / state.numberOfStep;
        state.completedStep = data;
        state.progressValue = data ? singleStepValue * data : state.progressValue;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
