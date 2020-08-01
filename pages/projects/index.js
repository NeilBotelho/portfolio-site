import Layout from '@components/Layout'
import PostList from '@components/PostList.js'
import matter from 'gray-matter'

const Index = ({posts, title, description, ...props }) => {
  return (
  <Layout pageTitle="Projects">
  <div className="content">
    <div className="title">
      <h1>Projects </h1>
      <p className="subtitle">... and other cool things</p>
    </div>  
    <PostList posts={posts} />
  </div>
    <style jsx global>{`
      body{
        background-color:#dfe8dc;
      }
    `}</style>
    <style jsx>{`
      .content{
        min-height:90vh;
        margin:4vh 6vw 0vh 6vw;
        background-color:white;
        text-align:center;
      }
      .title{
        text-align:center;
        padding-top:5vw;
        font-family: monospace, sans-serif;
        font-weight:normal;
        font-size:5vw;
      }
      .subtitle{
        font-size:3.5vw;
        font-family:monospace;
        color:#7e7f7e;
      }
      @media (min-width:650px){
        .content{
          margin:4vh 6vw 4vh 6vw;
          padding:6vh;
          padding-top:0;
        }
        .title{
          font-size:3vw;
          margin-top:4vh;

        }
        .subtitle{
          font-size:1rem;
        }
      }
    `}</style>
    </Layout>
    )
}

export default Index






export async function getStaticProps() {
  const configData = await import(`@root/siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../../posts', true, /\.md$/))
  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

