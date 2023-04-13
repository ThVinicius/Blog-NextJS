import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

type Content = {
  title: string
  description: string
  banner: string
  github: string
  linkedin: string
}

interface ContentProps {
  content: Content
}

export default function Sobre({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Quem somos? | Th-Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>

            <a href={content.github}>
              <FaGithub size={40} />
            </a>

            <a href={content.linkedin}>
              <FaLinkedin size={40} />
            </a>
          </section>

          <Image
            src={content.banner}
            alt="Sobre Th-Programador"
            width={448}
            height={430.8}
          />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'about')
  ])

  const { title, description, banner, github, linkedin } =
    response.results[0].data

  const content = {
    title: RichText.asText(title),
    description: RichText.asText(description),
    banner: banner.url,
    github: github.url,
    linkedin: linkedin.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 60 * 24 * 30
  }
}
