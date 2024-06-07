import "./css/home.css";
import { useNavigate } from "react-router-dom";
import image from './img/handsome-smiling-hipster-man-posing-studio.jpg'

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }
    return (
        <div> 
            <div className="home-body">
                <section className="welcome">
                <div  className="welcome-texts">
                    <h1 className="large-text">Discover the Latest Fashion Trends</h1>
                    <p className="small-text">Explore our curated collection of stylish clothing and accessories.</p>
                    <button className="shop-now" onClick={handleClick}>Shop Now</button>
                </div>
                <div>
                    <img className="img1"  src={image}></img>
                </div>
                </section>

                <section className="about">
                    <div className="image-div">
                         <img className="img2"  src={image}></img> 
                    </div>
                    <div className="about-details">
                        <label htmlFor="about" className="about-label">About Us</label>
                        <h1 className="about-header">Crafting Quality Clothing Since 1990</h1>
                        <p className="about-text">At Acme Clothing, 
                            we believe in creating timeless fashion that empowers our customers 
                            to express their unique style.
                             Our mission is to provide high-quality, 
                            ethically-sourced clothing that makes you feel confident and comfortable.
                        </p>
                    </div>
                </section>

             <footer className="footer">
                <div>
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>Our Team</p>
                    <p>Careers</p>
                    <p>News</p>
                </div>
                <div>
                <h3>Products</h3>
                    <p> Men</p>
                    <p>Women</p>
                    <p>Kids</p>
                    <p>Accessories</p>
                </div>
                <div>
                <h3>Resources</h3>
                    <p>Blog</p>
                    <p>Community</p>
                    <p>Support</p>
                    <p>FAQs</p>
                </div>
                <div>
                <h3>Legal</h3>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Cookies</p>
                    <p>Cookies</p>
                </div>
                <div>
                <h3>Contact</h3>
                    <p>Support</p>
                    <p>Sales</p>
                    <p>Press</p>
                    <p>Partnership</p>
                </div>
             </footer>
            </div>
        </div>
    )
}

export default Home;