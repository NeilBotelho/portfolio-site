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
        margin:4vh 4vw 4vh 4vw;
        padding:6vh;
        background-color:white;
        text-align:center;
      }
      .title{
        text-align:center;
        font-family: monospace, sans-serif;
        font-weight:normal;
        font-size:3vw;
      }
      .subtitle{
        font-size:1.5vw;
        font-family:monospace;
        color:#7e7f7e;
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

