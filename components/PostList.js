import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <div className="post-list">
      {!posts && <div>No posts!</div>}
        {posts &&
          posts.map((post) => {
            return (
              <Link href={{ pathname: `/projects/${post.slug}` }} passHref>
              <a className="post-container">
                <div key={post.slug}>
                  <p className="post-date">{post.frontmatter.date}</p>
                  <p className="post-title">{post.frontmatter.title}</p>
                  <p className="post-description">{post.frontmatter.description || "" }</p>
                </div>
              </a>
              </Link>
            )
          })}
    <style jsx>{`
      //Clear stlye of anchor tags
      a:link, a:visited, a:hover, a:active {
        color:black;
        text-decoration: none;
      }
      .post-list{
        text-decoration: none;
        list-style-type: none;
        text-align:left;
        margin:8vh 6vh 6vh 6vh;
        font-family: 'Overpass Mono', monospace;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .post-container{
        width:100%;
        font-size:3vw;
        box-shadow:1px 2px 3px 1px;
        margin:2vh;
        transition: scale .2s ease-in-out;
      }
      .post-container:hover, .post-container:active{
        transform:scale(1.01);
      }
      .post-date{
        margin:0.7vh 1vh 1vh 2vh;
        padding:0;
        color:#7e7f7e;
      }
      .post-title{
        font-weight:bold;
        margin:0;
        margin-left: 2vh ;
        padding:0;

      }
      .post-description{
        margin:1vh 2vh 2vh 2vh ;
        padding:0;
        color:#323332;

      }

      @media (min-width:650px){
        .post-list{
           // margin:6vh 6vh 6vh 6vh;
        }
        .post-container{
          width:75%;
          font-size:1rem;
        }
        .post-date{
          margin:2vh 2vh 3vh 2vh ;
          // padding-bottom:;
        }
        .post-title{
          margin:0vh 2vh 2vh 2vh ;
          padding-top:0;
        }
        .post-description{
          margin-bottom:2vh;
        }
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
