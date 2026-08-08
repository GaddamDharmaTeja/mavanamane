import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductCard.css";
function ProductCard({ product, onAdd, isSaved, onToggleWishlist }) { return <article className="product-card"><button className="wishlist" onClick={()=>onToggleWishlist(product)} aria-label={`${isSaved ? "Remove" : "Save"} ${product.name}`}>{isSaved?<FaHeart/>:<FaRegHeart/>}</button><Link to={`/products/${product.id}`}><img className="product-image" src={product.image} alt={product.name}/></Link><div className="product-content"><h3><Link to={`/products/${product.id}`}>{product.name} Mangoes</Link></h3><div className="rating">{[1,2,3,4,5].map(i=><FaStar key={i}/>)} <span>({product.reviews})</span></div><p className="price"><strong>₹{product.price}</strong> <span>/ {product.weight}</span></p><button className="cart-btn" onClick={()=>onAdd(product)}><FaShoppingCart/> Add to Cart</button></div></article> }
export default ProductCard;
