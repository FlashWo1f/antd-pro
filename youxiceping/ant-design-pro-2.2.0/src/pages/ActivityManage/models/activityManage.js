import queryActiMana from '@/services/activityManage'
import { isFn } from '@/utils/utils'
import moment from 'moment'

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
    ShareModal: false,
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
      console.log('baiping', payload)
      // const dealPayload = JSON.parse(JSON.stringify(payload))
      // dealPayload.time = [moment(payload.startTime), moment(payload.endTime)]
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
      console.log('reducer', {
        ...state,
        newActivityModal: action.payload.newActivityModal,
        operate: action.payload.operate,
        formValue: {
          ...action.payload.formValue
        }
      })
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
      return {
        ...state,
        formValue: {
          ...state.formValue,
          ...action.payload
        }
      }
    },
    setShareModal(state, action) {
      console.log('啥子东西啊', action)
      return {
        ...state,
        ShareModal: action.payload.ShareModal
      }
    },
  }
}