import queryActiMana from '@/services/activityManage'
import { isFn } from '@/utils/utils'

export default {
  namespace: 'activityManage',
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
    *queryActiMana({ payload, callback }, { put, call }) {
      const response = yield call(queryActiMana, payload)
      if (isFn(callback)) callback(response)
      const { list } = response
      console.log(response)
      yield put({
        type: 'setActiManaData',
        list
      })
    }
  },

  reducers: {
    setActiManaData(state, action) {
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