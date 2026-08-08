import "./ShopBanner.css";

function ShopBanner({ banner }) {
  return <section className="shop-banner" style={{ backgroundImage: `url(${banner})` }} aria-label="Shop Mangoes" role="img" />;
}

export default ShopBanner;
