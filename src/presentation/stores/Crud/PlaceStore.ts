import { placeRepository } from '@/app/factory/di'
import type { reqQuery } from '@/data/network/app_api'
import type { Failure } from '@/data/network/error_handler'
import { PlaceRepository } from '@/data/repositories/PlaceRepository'
import { placeTypes, type LatestPlaceResponse, type Place } from '@/data/response/place'
import { defineStore } from 'pinia'

export const PlaceStore = defineStore('placeStore', {
    state: () => ({
      places: [] as Place[],
      statusMessage: "",
      total: 0
    }),
    getters: {
      getPlaces: (state) => state.places,
      getStatusMessage: (state) => state.statusMessage,
      getTotal: (state) => state.total,
    },
    actions: {
      async getLatestPlace(params: reqQuery) {
        const responseOrFailure = await placeRepository.getLatestPlaces(params)
        responseOrFailure.fold(
          error => {
            this.statusMessage = error.statusMessage
          },
          (response) => {
            this.places = response.data;
            this.total = response.total
            console.log("from place store",this.total)
        }
        )
      }
    }
  })
  