import "./Home.css";
import "./ModernHome.css";
import heroImage from "../../assets/backgroundimages/mainhero.png";
import Header from "../header/Header";
import HeroCard from "../heroCard/HeroCard";
import Reviews from "../reviews/Reviews";
import WhyChoose from "../whyChoose/WhyChoose";
import Footer from "../footer/FooterDynamic";
import MangoVarieties from "../../pages/MangoVarieties";
import { useShop } from "../../context/ShopContext";
import { getContent } from "../../services/productService";


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiShoppingBag } from "react-icons/fi";



function Home() {
  const navigate = useNavigate();
  const { cart } = useShop();
  const [hero,setHero]=useState(null);
  useEffect(()=>{getContent("home").then(item=>setHero(item.value)).catch(()=>{});},[]);
  const content={eyebrow:"From our orchard to your table",title:"Fresh mangoes,",highlight:"thoughtfully grown.",description:"Naturally ripened mangoes harvested at their peak and delivered with care.",...hero};

  return (
    <>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h4><FiCheckCircle/> {content.eyebrow}</h4>

              <h1>
                {content.title} <span>{content.highlight}</span>
              </h1>

              <p>
                {content.description}
              </p>

              <div className="hero-buttons">
                <button
                      className="shop-btn"
                      onClick={() => navigate("/shop")}
                  >
                      Shop mangoes <FiArrowRight/>
                  </button>

                  <button
                      className="explore-btn"
                      onClick={() => navigate("/mangoes")}
                  >
                      Explore varieties
                  </button>

              </div>
              <div className="hero-trust"><span><b>100%</b> naturally ripened</span><span><b>Farm direct</b> delivery</span></div>
            </div>
            <aside className="hero-float-card"><FiShoppingBag/><span><b>{cart.length}</b> varieties in your cart</span><button onClick={()=>navigate("/cart")}>View cart <FiArrowRight/></button></aside>
          </div>
        </div>
      </section>

      {/* Hero Card Section */}
      <HeroCard />
      <Reviews />
      <WhyChoose />
      <MangoVarieties />
      <Footer />
    </>
  );
}

export default Home;
