import { stringify } from 'qs'
import request from '@/utils/request'

// mock
export default async function queryPartMana(params) {
  return request(`/api/partmana${stringify(params)}`)
}