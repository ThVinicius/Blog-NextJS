import { Dispatch, SetStateAction, useState } from 'react'

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from 'services/prismic'

type Post = {
  slug: string
  title: string
  cover: string
  description: string
  updatedAt: string
}

type SetPage = Dispatch<SetStateAction<number>>

export function usePosts(postsBlog: Post[], setCurrentPage: SetPage) {
  const [posts, setPosts] = useState(postsBlog || [])

  async function navigatePage(pageNumber: number) {
    const response = await reqPost(pageNumber)

    if (response.results.length === 0) {
      return
    }

    const getPosts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        description:
          post.data.description.find(
            (content: { type: string }) => content.type === 'paragraph'
          )?.text ?? '',
        cover: post.data.cover.url,
        updatedAt: new Date(
          post.last_publication_date as string
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    }) as Post[]

    setCurrentPage(pageNumber)
    setPosts(getPosts)
  }

  //Buscar novos posts
  async function reqPost(pageNumber: number) {
    const prismic = getPrismicClient()

    const response = await prismic.query(
      [Prismic.Predicates.at('document.type', 'post')],
      {
        orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 3,
        page: String(pageNumber)
      }
    )

    return response
  }

  return { posts, reqPost, navigatePage }
}
