import Vue from 'vue'
import { ActionContext } from 'vuex'
// import { AxiosRequestConfig } from 'axios'
import { AxiosAction } from '@/interfaces/app/vuex'
// import { cancelToken } from '@/utilities/'
import {
  IQiitaSearchPayload,
  IQiitaSearch
} from '@/interfaces/api/IQiitaSearch'

export interface IState {
  /**
   * Qiita記事のデータ
   */
  qiitaSearch: IQiitaSearch[]
  /**
   * ローディング
   */
  busy: {
    qiitaSearch: boolean
  }
}

/** State */
export const state = (): IState => ({
  qiitaSearch: [],
  busy: {
    qiitaSearch: false
  }
})

/** Getters */
export const getters = {
  qiitaSearch: (state: IState): IQiitaSearch[] => {
    console.log('getter state.qiitaSearch', state.qiitaSearch)
    return state.qiitaSearch
  }
}

/** Mutations */
export const mutations = {
  /**
   * Qiita記事情報を保存する
   */
  saveQiitaSearch(state: IState, payload: IQiitaSearch[]): void {
    console.log('saveQiitaSearch', payload)
    state.qiitaSearch = payload
  },
  /**
   * 処理中ステータスを更新する
   */
  updateBusyStatus(
    state: IState,
    payload: [keyof IState['busy'], boolean]
  ): void {
    const [key, status] = payload

    Vue.set(state.busy, key, status)
  }
}

/** Actions */
export const actions = {
  /**
   * Qiitaの記事データを取得する
   */
  async fetchQiitaSearch(
    this: Vue,
    { state, commit }: ActionContext<any, any>,
    payload: AxiosAction<IQiitaSearchPayload> = {} as any
  ): Promise<void> {
    const { data } = payload
    // const { key = Symbol('qiitaSearch'), data } = payload

    commit('updateBusyStatus', ['qiitaSearch', true])

    console.log('fetchQiitaSearch!')

    try {
      const response: IQiitaSearch[] = await this.$axios.$get<IQiitaSearch[]>(
        this.$C.API_ENDPOINT.QIITA_SEATCH,
        { params: data }
        // {
        //   cancelToken: cancelToken.getToken(key)
        // } as AxiosRequestConfig
      )
      console.log('response', response)

      // Qiita取得記事データを更新
      commit('saveQiitaSearch', response)
    } catch (err) {
      throw err
    } finally {
      commit('updateBusyStatus', ['qiitaSearch', false])
    }
  }
}
