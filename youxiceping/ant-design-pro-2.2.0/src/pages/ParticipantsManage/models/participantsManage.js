import queryPartMana from '@/services/participantsManage'
import { isFn } from '@/utils/utils'

export default {
  namespace: 'participantsManage',
  state: {
    data: {
      list: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    sortParams: {

    },
  },

  effects: {
    *queryPartMana({ payload, callback }, { put, call }) {
      const response = yield call(queryPartMana, payload)
      if (isFn(callback)) callback(response)
      const { list } = response
      console.log(response)
      yield put({
        type: 'setPartManaData',
        list
      })
    }
  },

  reducers: {
    setPartManaData(state, action) {
      return {
        ...state,
        data: {
          ...state.data,
          list: action.list
        }
      }
    }
  }
}