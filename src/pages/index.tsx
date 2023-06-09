import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import techsImage from '../../public/images/techs.svg'
import { getPrismicClient } from '../services/prismic'
import styles from '../styles/home.module.scss'

type Content = {
  title: string
  titleContent: string
  linkAction: string
  mobileTitle: string
  mobileContent: string
  mobileBanner: string
  webTitle: string
  webContent: string
  webBanner: string
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Th-Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
          </section>

          <Image
            src="/images/banner-da-web.jpg"
            alt="Conteúdos Th-Programador"
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <Image
            src={content.mobileBanner}
            alt="Conteúdos desenvolvimento de apps"
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <Image
            src={content.webBanner}
            alt="Conteúdos desenvolvimento de aplicacoes web"
          />

          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webContent}</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image quality={100} src={techsImage} alt="Tecnologias" />
          <h2>
            Muitos conteúdos de diferentes tecnologias para você praticar e
            aprender
          </h2>
          <span>
            E você vai perder a chance de evoluir de uma vez por todas?
          </span>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  const {
    title,
    sub_title,
    link_action,
    mobile,
    mobile_content,
    mobile_banner,
    title_web,
    web_content,
    web_banner
  } = response.results[0].data

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 60
  }
}
