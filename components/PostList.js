import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div className="post-list">
      {!posts && <div>No posts!</div>}
        {posts &&
          posts.map((post) => {
            return (
              <Link href={{ pathname: `/projects/${post.slug}` }}>
                <div key={post.slug} className="post-container">
                  <p className="post-date">{post.frontmatter.date}</p>
                  <br/>
                  <p className="post-title">{post.frontmatter.title}</p>
                  <p className="post-description">{post.frontmatter.description || "" }</p>
                </div>
              </Link>
            )
          })}
    <style jsx>{`
      .post-list{
        list-style-type: none;
        text-align:left;
        margin:6vh 6vh 6vh 6vh;
        font-family: 'Overpass Mono', monospace;
        display:flex;
        flex-direction:column;
        align-items:center;
        // justify-content:center;
      }
      .post-container{
        width:70%;
        font-size:1rem;
        box-shadow:1px 2px 3px 1px;
        margin:2vh;
        // margin:
       transition: scale .2s ease-in-out;
      }
      .post-container:hover, .post-container:active{
        transform:scale(1.01);
        // border:2px solid;
      }
      .post-date{
        margin:2vh 2vh 0vh 2vh ;
        padding-bottom:0;
        color:#7e7f7e;
      }
      .post-title{
        font-weight:bold;
        margin:0vh 2vh 2vh 2vh ;
        padding-top:0;

      }
      .post-description{
         margin:0vh 2vh 2vh 2vh ;
        padding-top:0;
        color:#323332;
      }
      `}</style>
    </div>
  )
}

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
  })(require.context('@root/posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
