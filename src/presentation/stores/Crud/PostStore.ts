import type { reqQuery } from '@/data/network/app_api'
import type { Failure } from '@/data/network/error_handler'
import { defineStore } from 'pinia'
import type { Post } from '@/data/response/Post'
import { postRepository } from '@/app/factory/di'
export const PostStore = defineStore('PostStore', {
    state: () => ({
      Posts: [] as Post[],
      statusMessage: "",
      total: 0
    }),
    getters: {
      getPosts: (state) => state.Posts,
      getStatusMessage: (state) => state.statusMessage,
      getTotal: (state) => state.total,
    },
    actions: {
      async getTopPost(params: {sortBy: string, limit: number }) {
        const responseOrFailure = await postRepository.getTopPosts(params)
        responseOrFailure.fold(
          error => {
            this.statusMessage = error.statusMessage
          },
          (response) => {
            this.Posts = response.data;
            // this.total = response.total
            // console.log("from Post store",this.total)
        }
        )
      }
    }
  })
  