import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import Layout from '@components/Layout'



export default function ProjectPost({ siteTitle, frontmatter, markdownBody }) {
  const parseHtml = htmlParser({
    isValidNode: node => node.type !== 'script',
    processingInstructions: [/* ... */]
  })
    return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@500&display=swap" rel="stylesheet"/> 
        
        <article>
          <div className="header">
            <h1 className="title">{frontmatter.title}</h1>
            <br/>
            <div  className="subtitle">  
              <p id="post-date">Posted: {frontmatter.date}</p>
              {frontmatter.projectUrl && 
                <p align="right" id="project-url">
                  <a href="hello.com">source code</a>
                </p>
              }
            </div>

          </div>
          <hr/>
          <div className="md-body">
         <ReactMarkdown source={markdownBody} 
            escapeHtml={false} 
            astPlugins={[parseHtml]} />
          </div>
        </article>
        <style jsx global>{`body{background-color:#dfe8dc;}`}</style>
        <style jsx>{`
          article{
            background-color:white;
            margin:4vw;
            padding:2vh;
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
            font-family: "Mulish";
            font-weight:bold;
            font-size:5.5vw;
          }
          
          .subtitle{
            font-size:0.6rem;
            text-align:left;
            margin-left:0;
            display:flex;
            justify-content:space-between;
          }
          #project-url{
            margin-right:0;
          }
          .md-body{
            width:100%;
            font-family:monospace;
            margin:2vh 2vh 0vh 2vh ;
            margin:auto;
            margin-top:2rem;
            text-align:left;
            font-size:1rem;
            line-height:1.8rem;
          }
        @media (min-width:650px){
          article{
            margin:8vh 10vw 8vh 10vw;
            padding:6vh;
          }
          .title{
            font-size:4vw;
          }
          .subtitle{
            margin-left:10%;
            font-size:1vw;
          }
          #project-url{
            margin-right:7rem;
          }
          .md-body{
            line-height:1.5rem;
            margin-top:4rem;
            font-size:0.9rem;
            width:80%;
          }
        }        @media (max-width:650px){
          article{
            margin:4vw;
            padding:2vh;
          }
          .title{
            font-family: "Mulish";
            font-weight:bold;
            font-size:5.5vw;
          }
          .subtitle{
            // font-family:sans-serif;
            margin-left:0;
            font-size:0.6rem;
          }
          #project-url{
            margin-right:0;
          }
          .md-body{
            line-height:1.8rem;
            margin-top:2rem;
            font-size:1rem;
            width:100%;
          }
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
