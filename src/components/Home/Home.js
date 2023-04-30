import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main>
      <section className="lead-space">
        <h1>Welcome to our website</h1>
        <p>
          Here you can find all the information you need about our services.
        </p>
      </section>
      <section className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          vitae ligula sit amet ipsum posuere tristique ac eget ex. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          Curae; Proin quis metus fermentum, bibendum mi id, dignissim orci.
          Praesent pharetra, elit non vehicula blandit, dolor lorem sodales
          dolor, vel cursus purus turpis vel velit. Duis vel risus nec enim
          posuere pharetra. Vestibulum ac nibh ipsum.{" "}
        </p>
        <p>
          Donec et nisi commodo, auctor risus ac, convallis ante. Sed commodo
          libero id mauris ultricies, in sagittis felis finibus. Praesent vel
          eros commodo, rutrum libero vitae, tristique lacus. Sed ac quam nibh.
          Vestibulum in luctus purus, id suscipit odio. Vestibulum eget
          venenatis ex. Pellentesque molestie euismod tellus, ac commodo massa
          interdum a. Proin quis elit ligula. Etiam commodo ullamcorper metus,
          sit amet fringilla metus tincidunt vel.
        </p>
      </section>
    </main>
  );
};

export default Home;
