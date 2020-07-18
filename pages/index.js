import Layout from '@components/Layout'
import PostList from '@components/PostList'
import matter from 'gray-matter'
import Link from 'next/link'

const Index = ({ title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet"/> 
      <div className="hero-image">
        <div className="hero-adjacent-flexbox"></div>
        <div className="hero">
          <div className="hero-text">
            <h1>Hi there, </h1><br/> <h1>I'm Neil</h1>
          </div>
          <Link href="/projects">
            <button  className="projects-button">See my work</button>
          </Link>
        </div>
        <div className="hero-adjacent-flexbox"></div>
      </div>

      <style jsx>{`
        .hero-image{
          height:100vh;
          background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('hero.jpg');
          background-position: center;
          // background-repeat: no-repeat;
          // background-size: cover;
          position: relative;
          display:flex;
          justify-content:space-around;
        }

        .hero-adjacent-flexbox{
          height:100%;
          width:10vw;
        }
        .hero{
          text-align: center;

          font-family: 'Montserrat', sans-serif;
          margin:0 auto;
          color:white;
          line-height:2.5rem;
        }
        .hero-text {
          font-size:4vw;
          margin-top:10%;
          padding-top:50%;
        }

        button {
          // Reset the terrible default button styles
            padding: 0;
            border: none;
            font: inherit;
            color: inherit;
            background-color: transparent;
            cursor: pointer;
        }
        .projects-button{
          background-color:blue;
          border-radius:10px;
          font-size:1.8vw;
          width:17vw;
          margin:auto;
          margin-top:3rem;
          padding-top:0.2rem
          padding-bottom:0.2rem
          transition: all .2s ease-in-out;
        }
        .projects-button:hover{
          transform:scale(1.1);
        }

        @media (max-width:600px){
          .hero-text{
            font-size:10vw;
            top:40%;
            color:white;
          }

          // // For when i put the about part in
          // .hero-image{
          //   height:80vh
          // }

          .projects-button{
          font-size:4vw;
          font-family:monospace;
          width:40vw;
          text-align: center;
       
        }
        @media (max-width:400px){
   
          .projects-button{
          font-size:5vw;
          font-family:monospace;
          width:40vw;
          text-align: center;
          color:white;
          margin-top:30%;
        }

          }
        }
        `}</style>
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
