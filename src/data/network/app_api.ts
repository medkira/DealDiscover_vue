import { NetworkConstants } from '@/app/constants'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { LatestPlaceResponse } from '../response/place'
import type { Post } from '../response/Post'
export class AppServiceClient {
  constructor(private readonly http: AxiosInstance) {}

  //  ? Auth
  async login(loginRequest: {
    email: string
    password: string
  }): Promise<AxiosResponse<{ authenticationToken: string }>> {
    return await this.http.post(`${NetworkConstants.BASE_API}/login`, loginRequest)
  }

  async authGoogle(): Promise<AxiosResponse<{ authenticationToken: string }>> {
    return await this.http.get(`${NetworkConstants.BASE_API}/google`)
  }

  // ? Post
  async getLatestPost(req: reqQuery) {
    return await this.http.get(`${NetworkConstants.BASE_API}/post/page`, {
      params: {
        page: req.page,
        type: req.type,
        location: req.location
      }
    })
  }
  async getLatestPlace(req: reqQuery): Promise<AxiosResponse<LatestPlaceResponse>> {
    return await this.http.get(`${NetworkConstants.BASE_API}/place/page`, {
      params: {
        page: req.page,
        type: req.type,
        location: req.location
      }
    })
  }
  async getTopPosts(req: { sortBy: string, limit: number }): Promise<AxiosResponse<Post[]>> {
    return await this.http.get(`${NetworkConstants.BASE_API}/topPosts`, {
      params: {
        sortBy: req.sortBy,
        limit: req.limit
      }
    })
  }
  async getPostData(): Promise<any> {
    try {
        const url = `https://api.browse.ai/v2/robots/6b87b62c-488a-4dc4-8868-be694b722582/tasks/74b88c6a-c9f1-4833-b8cc-59e7790e9a6f`;
        const data = {
            inputParameters: {
                originUrl: 'https://www.espressozone.com/espresso-machines/semi-automatic-espresso-machines'
            }
        };

        const response = await this.http.get(url, {
            headers: {
                Authorization: 'Bearer b0b9a861-8ecc-4bfc-bd4b-09b81c463d84:d7d402cb-826c-47a5-bece-e3e5e008faa2',
                'Content-Type': 'application/json'
            },
            data: data
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}

}

export interface reqQuery {
  page?: number
  type?: string
  location?: string
}
