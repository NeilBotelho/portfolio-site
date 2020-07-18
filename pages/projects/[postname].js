import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'


import Layout from '@components/Layout'



export default function ProjectPost({ siteTitle, frontmatter, markdownBody }) {
  // if (!frontmatter) return <></>

    return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <article>
          <div className="header">
            <h1 className="title">{frontmatter.title}</h1>
            <br/>
            <div  className="date">  
              <p>Posted: {frontmatter.date}</p>
            </div>
          </div>
        <hr/>
          <div className="md-body">
            <ReactMarkdown source={markdownBody}/>
          </div>
        </article>
        <style jsx global>{`body{background-color:#dfe8dc;}`}</style>
        <style jsx>{`
          article{
            background-color:white;
            margin:4vh 4vw 4vh 4vw;
            padding:6vh;
            min-height:80vh;
            text-align:center;
          }
          .header{
            font-family:monospace, sans-serif;
          }
    hr{
      margin-top:10px;
      padding:1px;
      size:10px;
      color:black;
      background-color:black;
    }
          .title{
            font-size:4vw;
          }
          .date{
            font-size:1vw;
            text-align:left;
            margin-left:10%;
          }
          .md-body{
            width:80%;
            font-family:monospace, sans-serif;
            // display:none;
             margin:2vh 2vh 0vh 2vh ;
            margin:auto;
            margin-top:4vh;
            text-align:left;
          }

        `}</style>
      </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`@root/posts/${postname}.md`)
  const config = await import(`@root/siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const slugs = ((context) => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

      return slug
    })
    return data
  })(require.context('../../posts', true, /\.md$/))

  const paths = slugs.map((slug) => `/projects/${slug}`)

  return {
    paths,
    fallback: false,
  }
}
