import Layout from '@components/Layout'
import PostList from '@components/PostList.js'
import matter from 'gray-matter'

const Index = ({posts, title, description, ...props }) => {
  return (
 <div>
   <h1>Projects</h1>
       <PostList posts={posts} />

 </div>)
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

