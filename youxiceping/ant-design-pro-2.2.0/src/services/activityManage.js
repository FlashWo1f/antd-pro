import { stringify } from 'qs'
import request from '@/utils/request'

export default async function queryActiMana(params) {
  return request(`/api/actimana${stringify(params)}`)
}