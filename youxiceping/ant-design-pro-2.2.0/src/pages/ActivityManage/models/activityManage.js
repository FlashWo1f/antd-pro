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
    formValue: {

    },
    newActivityModal: false,
    operate: 'edit',
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
    },
    *triggleActivityModal({ payload }, { put }) {
      yield put({
        type: 'handleActivityModal',
        payload
      })
    },
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
    },
    handleActivityModal(state, action) {
      return {
        ...state,
        newActivityModal: action.payload.newActivityModal,
        operate: action.payload.operate,
        formValue: {
          ...action.payload.formValue
        }
      }
    },
    setActivityFormValue(state, action) {
      console.log('啥子东西啊', action)
      return {
        ...state,
        formValue: {
          ...state.formValue,
          ...action.payload
        }
      }
    }
  }
}