import "./beast.css";

const Beast = ({ beast }) => (
  <article>
    <header>
      <h2>{beast.title}</h2>
    </header>
    <main>
      <figure>
        <img src={beast.image_url} width="200px" alt={beast.keyword} />
      </figure>
      <p>{beast.description}</p>
    </main>
  </article>
);

export default Beast;
