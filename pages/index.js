import Layout from '@components/Layout'
import PostList from '@components/PostList'
import matter from 'gray-matter'

const Index = ({ title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1 className="title">Welcome to my blog!</h1>
      <p className="description">
        {description}
      </p>
      <main>

      </main>
    </Layout>)
}

export default Index



export async function getStaticProps() {
  const configData = await import(`@root/siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
