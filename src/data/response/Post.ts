export type Post = {
  id: string
  title: string
  content: string
  postImage: string
  userId: string
  likes: number
  post_type: postType
  location: string
  totalComments: number
}

export enum postType {
  food = 'food',
  place = 'place'
}
