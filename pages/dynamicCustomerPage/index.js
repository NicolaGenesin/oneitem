import Head from 'next/head'
import Link from 'next/link'
import { useAppContext, updateContext } from '../../context/state';

export default function Home() {

  console.log(useAppContext())
  updateContext({ test:'ok'})
  console.log(useAppContext())

  const product = {
    id: 1,
    name: "Teapot",
    price: 1.226,
    image: "https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg",
    description: "Cast iron teapot let your drink water be healthy. TOWA cast iron teapot can improve the water quality by releasing iron ions and absorbing chloride ions in water. So the water after boiled by our cast iron teapot can be more sweeter and softer, which is suitable for all kinds of tea making or other drinks making."
  }

  return (
    <div className="container">
      <Head>
        <title>One Item Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Handmade TOWA Pot
        </h1>

        <li>
          <Link href="/editor">
            <a>About Us</a>
          </Link>
        </li>

        <p className="description">
          brought to you by <a href="https://nextjs.org">Marco Schiorlin</a>
        </p>
        
        <div className="grid">
          <div className="product">
            <h2 className="product__title">{product.name}</h2>
            <p className="product__description">{product.description}</p>
            <img src={product.image} alt="" className="product__image"/>
            <div className="product__price-button-container">
              <div className="product__price">${product.price.toFixed(2)}</div>
              <button 
                className="snipcart-add-item product__button"
                data-item-id={product.id}
                data-item-name={product.name}
                data-item-price={product.price}
                data-item-url={"TODO"}
                data-item-image={product.image}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://nicolagenesin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          By 1911 Industries
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        .product {
          display: grid;
          width: 100%;
        
          display: grid;
          grid-template-areas: 
          "title        title         image"
          "description  description  image"
          "button       button       image"
          ".            .            image";
          grid-template-columns: 1fr 1fr 3fr;
          margin-bottom: 100px;
          grid-column-gap: 100px;
        
          &:nth-of-type(odd) {
            grid-template-areas: 
            "image title        title"
            "image description  description"
            "image button       button"
            "image .            .";
            grid-template-columns: 3fr 1fr 1fr;
        
            // @include mobile {
            //   grid-template-areas: 
            //   "image        image      "
            //   "title         title     "
            //   "description  description"
            //   "button       button     ";
            //   grid-template-columns: 1fr 1fr;
          
            //   img {
            //     height: 300px;
            //     width: 100%;
            //     margin-bottom: 30px;
            //   }
            // }
          }
        
          &__title {  
            margin: 0;
            grid-area: title;
            font-size: 32px;
            font-weight: bold;
          }
        
          &__description { 
            grid-area: description;
            line-height: 1.75rem;
            min-height: 175px;
            // @include mobile {
            //   min-height: 0px;
            // }
          }
        
          &__price { 
            grid-area: price;
            font-size: 28px;
            font-weight: bold;
          }
        
          &__image { 
            grid-area: image;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
            box-shadow: 0px 18.025px 43.775px rgba(0, 0, 0, 0.25);
          }
        
          &__price-button-container {
            display: flex;
            grid-area: button;
          }
        
          &__button {
            margin-left: 30px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            padding: 6px;
            padding-left: 20px;
            padding-right: 20px;
            border: none;
            background-color: #00ff00;
            color: white;
            position: relative;
        
            &:hover {
              transition: 0.2s all;
              &:before {
                transform: scale(1.15, 1.4);
              }
            }
        
            &:before {
              content: ' ';
              position: absolute;
              background-color: #00ff00;
              top: 0;
              left: 0;
              border-radius: 4px;
              width: 100%;
              height: 100%;
              opacity: 0.4;
              z-index: -1;
              transform: scale(1);
              transition: all 0.3s cubic-bezier(0.16, 0.8, 0.66, 1.54);
            }
          }
        
          // @include mobile {
          //   grid-template-areas: 
          //   "image        image      "
          //   "title         title     "
          //   "description  description"
          //   "button       button     ";
          //   grid-template-columns: 1fr 1fr;
        
          //   img {
          //     height: 300px;
          //     width: 100%;
          //     margin-bottom: 30px;
          //   }
          // }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
