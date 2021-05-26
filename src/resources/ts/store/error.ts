interface errorState {
  code: number | null
}

const state: errorState = {
  code: null
}

const mutations = {
  setCode(state: errorState, code: number | null) {
    state.code = code
  }
}

export default {
  namespaced: true,
  state,
  mutations
}