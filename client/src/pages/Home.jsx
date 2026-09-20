import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import App from '../App';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAdminAccess = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div>
      {/* User Menu Bar (if authenticated) */}
      {isAuthenticated && (
        <div style={{
          background: '#f8fafc',
          padding: '12px 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px',
          borderBottom: '1px solid #e2e8f0',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '14px', color: '#64748b' }}>
            Welcome, <strong>{user?.username}</strong>
          </span>
          {user?.role === 'admin' && (
            <button
              onClick={handleAdminAccess}
              style={{
                padding: '8px 16px',
                background: '#ff7e5f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <i className="fa fa-chart-line"></i> Admin Dashboard
            </button>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: 'white',
              color: '#ff7e5f',
              border: '1px solid #ff7e5f',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* SuperShop Frontend */}
      <SuperShopHome />
    </div>
  );
}

// Your original SuperShop component
function SuperShopHome() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('all');
  const [showToast, setShowToast] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(5);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(5 * 3600);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCountdown = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddToCart = (e) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setCartCount((prev) => prev + 1);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
      alert(`Thanks for subscribing! ${input.value} has been added to our list.`);
      input.value = '';
    }
  };

  const newArrivals = [
    {
      id: 1,
      cat: 'fashion',
      name: 'Air Comfort Sneakers',
      price: '$89.99',
      oldPrice: null,
      rating: '4.6',
      reviews: 378,
      icon: 'fa-shoe-prints',
      iconColor: '#ff6b6b',
      bgColor: '#1a0a0a',
      badge: 'New',
    },
    {
      id: 2,
      cat: 'electronics',
      name: 'TabPro Ultra 12"',
      price: '$749.00',
      oldPrice: null,
      rating: '4.2',
      reviews: 211,
      icon: 'fa-tablet-alt',
      iconColor: '#4d96ff',
      bgColor: '#0d0d1a',
      badge: null,
    },
    {
      id: 3,
      cat: 'home',
      name: 'Premium Espresso Machine',
      price: '$349.00',
      oldPrice: '$449.00',
      rating: '5.0',
      reviews: 93,
      icon: 'fa-coffee',
      iconColor: '#6bcb77',
      bgColor: '#0a1a0a',
      badge: null,
    },
    {
      id: 4,
      cat: 'fashion',
      name: 'Luxury Sunglasses UV400',
      price: '$129.00',
      oldPrice: '$189.00',
      rating: '4.5',
      reviews: 145,
      icon: 'fa-glasses',
      iconColor: '#c77dff',
      bgColor: '#1a0a1a',
      badge: null,
    },
  ];

  const filteredArrivals = activeTab === 'all'
    ? newArrivals
    : newArrivals.filter((item) => item.cat === activeTab);

  return (
    <div className="App">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar__inner">
          <span><i className="fa fa-phone"></i> +1 (800) 555-SHOP</span>
          <span><i className="fa fa-envelope"></i> support@supershop.com</span>
          <span className="topbar__right">
            <i className="fa fa-truck"></i> Free shipping on orders over $49
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="header" id="header">
        <div className="container header__inner">
          <a href="/" className="logo">
            <span className="logo__icon"><i className="fa fa-shopping-bag"></i></span>
            <span>Super<strong>Shop</strong></span>
          </a>

          <div className="search-bar">
            <select className="search-bar__cat" defaultValue="All Categories">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Garden</option>
              <option>Sports</option>
              <option>Beauty</option>
            </select>
            <input type="text" placeholder="Search for products, brands and more…" />
            <button><i className="fa fa-search"></i></button>
          </div>

          <div className="header__actions">
            <a href="#wishlist" className="action-btn" title="Wishlist">
              <i className="fa fa-heart"></i>
              <span className="badge">3</span>
            </a>
            <a href="#cart" className="action-btn" title="Cart">
              <i className="fa fa-shopping-cart"></i>
              <span className="badge">{cartCount}</span>
            </a>
            {isAuthenticated ? (
              <a href="#account" className="action-btn user-btn" title="Account">
                <i className="fa fa-user"></i>
                <span>Account</span>
              </a>
            ) : (
              <a href="/login" className="action-btn user-btn" title="Login">
                <i className="fa fa-sign-in-alt"></i>
                <span>Sign In</span>
              </a>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <i className={isMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
          </button>
        </div>

        {/* NAV */}
        <nav className="navbar" id="navbar">
          <div className="container navbar__inner">
            <div className="dept-dropdown">
              <button className="dept-btn"><i className="fa fa-th-large"></i> All Departments</button>
              <ul className="dept-menu">
                <li><a href="#"><i className="fa fa-mobile-alt"></i> Electronics</a></li>
                <li><a href="#"><i className="fa fa-tshirt"></i> Fashion</a></li>
                <li><a href="#"><i className="fa fa-home"></i> Home & Garden</a></li>
                <li><a href="#"><i className="fa fa-futbol"></i> Sports & Outdoor</a></li>
                <li><a href="#"><i className="fa fa-spa"></i> Beauty & Health</a></li>
                <li><a href="#"><i className="fa fa-baby"></i> Kids & Toys</a></li>
                <li><a href="#"><i className="fa fa-utensils"></i> Food & Grocery</a></li>
                <li><a href="#"><i className="fa fa-car"></i> Automotive</a></li>
              </ul>
            </div>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#deals">Deals</a></li>
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#brands">Brands</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* HERO SLIDER */}
      <section className="hero">
        <div className="hero__slides">
          <div
            className={`hero__slide ${currentSlide === 0 ? 'active' : ''}`}
            style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}
          >
            <div className="hero__content">
              <span className="hero__tag">New Season Sale</span>
              <h1>Up to <span>60% Off</span><br/>Electronics</h1>
              <p>Smartphones, Laptops, Tablets & more — limited time deals you can't miss.</p>
              <div className="hero__btns">
                <a href="#deals" className="btn btn--primary">Shop Now</a>
                <a href="#deals" className="btn btn--outline">View Deals</a>
              </div>
            </div>
            <div className="hero__image">
              <div className="hero__img-placeholder electronics-img">
                <i className="fa fa-laptop" style={{ fontSize: '140px', color: 'rgba(255,255,255,0.15)' }}></i>
              </div>
            </div>
          </div>

          <div
            className={`hero__slide ${currentSlide === 1 ? 'active' : ''}`}
            style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}
          >
            <div className="hero__content">
              <span className="hero__tag">Fashion Week</span>
              <h1>Style That<br/><span>Speaks Louder</span></h1>
              <p>Discover the latest trends in men's, women's & kids' fashion.</p>
              <div className="hero__btns">
                <a href="#new" className="btn btn--primary">Explore Collection</a>
                <a href="#new" className="btn btn--outline">View Lookbook</a>
              </div>
            </div>
            <div className="hero__image">
              <div className="hero__img-placeholder fashion-img">
                <i className="fa fa-tshirt" style={{ fontSize: '140px', color: 'rgba(255,255,255,0.15)' }}></i>
              </div>
            </div>
          </div>

          <div
            className={`hero__slide ${currentSlide === 2 ? 'active' : ''}`}
            style={{ background: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)' }}
          >
            <div className="hero__content">
              <span className="hero__tag">Home Essentials</span>
              <h1>Transform<br/><span>Your Space</span></h1>
              <p>Premium furniture, décor & appliances for every room in your home.</p>
              <div className="hero__btns">
                <a href="#new" className="btn btn--primary">Shop Home</a>
                <a href="#new" className="btn btn--outline">Get Inspired</a>
              </div>
            </div>
            <div className="hero__image">
              <div className="hero__img-placeholder home-img">
                <i className="fa fa-couch" style={{ fontSize: '140px', color: 'rgba(255,255,255,0.15)' }}></i>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hero__arrow hero__arrow--prev"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <button
          className="hero__arrow hero__arrow--next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
        >
          <i className="fa fa-chevron-right"></i>
        </button>

        <div className="hero__dots">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              className={`dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            ></span>
          ))}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust">
        <div className="container trust__grid">
          <div className="trust__item">
            <i className="fa fa-shipping-fast"></i>
            <div>
              <h4>Free Shipping</h4>
              <p>On all orders over $49</p>
            </div>
          </div>
          <div className="trust__item">
            <i className="fa fa-undo-alt"></i>
            <div>
              <h4>30-Day Returns</h4>
              <p>Hassle-free return policy</p>
            </div>
          </div>
          <div className="trust__item">
            <i className="fa fa-lock"></i>
            <div>
              <h4>Secure Payment</h4>
              <p>256-bit SSL encryption</p>
            </div>
          </div>
          <div className="trust__item">
            <i className="fa fa-headset"></i>
            <div>
              <h4>24/7 Support</h4>
              <p>Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <a href="#" className="see-all">View All <i className="fa fa-arrow-right"></i></a>
          </div>
          <div className="categories__grid">
            {[
              { icon: 'fa-mobile-alt', name: 'Electronics', count: '2,400+', color: '#ff6b6b' },
              { icon: 'fa-tshirt', name: 'Fashion', count: '5,100+', color: '#ffd93d' },
              { icon: 'fa-home', name: 'Home & Garden', count: '3,200+', color: '#6bcb77' },
              { icon: 'fa-futbol', name: 'Sports', count: '1,800+', color: '#4d96ff' },
              { icon: 'fa-spa', name: 'Beauty', count: '900+', color: '#c77dff' },
              { icon: 'fa-baby', name: 'Kids & Toys', count: '1,200+', color: '#ff9f1c' },
              { icon: 'fa-utensils', name: 'Food & Grocery', count: '4,000+', color: '#2ec4b6' },
              { icon: 'fa-car', name: 'Automotive', count: '700+', color: '#e63946' },
            ].map((cat, idx) => (
              <div key={idx} className="cat-card" style={{ '--cat-color': cat.color }}>
                <div className="cat-card__icon"><i className={`fa ${cat.icon}`}></i></div>
                <h3>{cat.name}</h3>
                <p>{cat.count} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS OF THE DAY */}
      <section className="deals section" id="deals">
        <div className="container">
          <div className="section-header">
            <h2>
              <i className="fa fa-bolt" style={{ color: '#ffd93d', marginRight: '8px' }}></i>
              Deals of the Day
              <span className="countdown" id="countdown">
                Ends in: <span>{formatCountdown(timeLeft)}</span>
              </span>
            </h2>
            <a href="#" className="see-all">See All <i className="fa fa-arrow-right"></i></a>
          </div>

          <div className="products__grid">
            {[
              { badge: '-45%', name: 'ProMax X15 Smartphone', price: '$549.99', oldPrice: '$999.99', rating: '4.5', reviews: 1230, icon: 'fa-mobile-alt', color: '#4d96ff', bg: '#1a1a2e' },
              { badge: 'New', name: 'UltraBook Pro 16"', price: '$1,299.00', oldPrice: '$1,799.00', rating: '5.0', reviews: 856, icon: 'fa-laptop', color: '#6bcb77', bg: '#0d0d0d' },
              { badge: '-30%', name: 'SoundPro Wireless Headphones', price: '$139.99', oldPrice: '$199.99', rating: '4.0', reviews: 432, icon: 'fa-headphones-alt', color: '#c77dff', bg: '#1a0a2e' },
              { badge: 'Hot', name: 'SmartWatch Series 9', price: '$299.00', oldPrice: '$399.00', rating: '4.7', reviews: 2100, icon: 'fa-clock', color: '#ffd93d', bg: '#0a1a0a' },
            ].map((prod, idx) => (
              <div key={idx} className="product-card">
                <div className={`product-card__badge ${prod.badge.includes('%') ? 'sale' : prod.badge.toLowerCase()}`}>{prod.badge}</div>
                <div className="product-card__wishlist"><i className="fa fa-heart"></i></div>
                <div className="product-card__img" style={{ background: prod.bg }}>
                  <i className={`fa ${prod.icon}`} style={{ fontSize: '80px', color: prod.color }}></i>
                </div>
                <div className="product-card__info">
                  <span className="product-card__cat">Electronics</span>
                  <h3>{prod.name}</h3>
                  <div className="product-card__rating">
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-alt"></i>
                    <span>({prod.rating}) · {prod.reviews} reviews</span>
                  </div>
                  <div className="product-card__price">
                    <span className="price-new">{prod.price}</span>
                    <span className="price-old">{prod.oldPrice}</span>
                  </div>
                  <button className="btn btn--primary btn--sm" onClick={handleAddToCart}>
                    <i className="fa fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="promo-banners section">
        <div className="container promo-banners__grid">
          <div className="promo-card" style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}>
            <div className="promo-card__content">
              <span>Limited Offer</span>
              <h2>Fashion Sale<br/><strong>Up to 50% Off</strong></h2>
              <a href="#new" className="btn btn--white">Shop Fashion</a>
            </div>
            <div className="promo-card__icon"><i className="fa fa-tshirt"></i></div>
          </div>
          <div className="promo-card" style={{ background: 'linear-gradient(135deg, #0d2e1a, #1a5c34)' }}>
            <div className="promo-card__content">
              <span>Weekend Deal</span>
              <h2>Home & Garden<br/><strong>Buy 2 Get 1 Free</strong></h2>
              <a href="#new" className="btn btn--white">Shop Home</a>
            </div>
            <div className="promo-card__icon"><i className="fa fa-home"></i></div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="new-arrivals section" id="new">
        <div className="container">
          <div className="section-header">
            <h2>✨ New Arrivals</h2>
            <div className="tab-filters">
              {['all', 'fashion', 'electronics', 'home'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <a href="#" className="see-all">See All <i className="fa fa-arrow-right"></i></a>
          </div>

          <div className="products__grid" id="newArrivalsGrid">
            {filteredArrivals.map((product) => (
              <div key={product.id} className="product-card" data-cat={product.cat}>
                {product.badge && <div className="product-card__badge new">{product.badge}</div>}
                <div className="product-card__wishlist"><i className="fa fa-heart"></i></div>
                <div className="product-card__img" style={{ background: product.bgColor }}>
                  <i className={`fa ${product.icon}`} style={{ fontSize: '80px', color: product.iconColor }}></i>
                </div>
                <div className="product-card__info">
                  <span className="product-card__cat">{product.cat}</span>
                  <h3>{product.name}</h3>
                  <div className="product-card__rating">
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-alt"></i>
                    <span>({product.rating}) · {product.reviews} reviews</span>
                  </div>
                  <div className="product-card__price">
                    <span className="price-new">{product.price}</span>
                    {product.oldPrice && <span className="price-old">{product.oldPrice}</span>}
                  </div>
                  <button className="btn btn--primary btn--sm" onClick={handleAddToCart}>
                    <i className="fa fa-shopping-cart"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands section" id="brands">
        <div className="container">
          <div className="section-header">
            <h2>Our Top Brands</h2>
          </div>
          <div className="brands__strip">
            <div className="brand-logo"><i className="fab fa-apple"></i> Apple</div>
            <div className="brand-logo"><i className="fab fa-android"></i> Samsung</div>
            <div className="brand-logo"><span>SONY</span></div>
            <div className="brand-logo"><span>Nike</span></div>
            <div className="brand-logo"><span>adidas</span></div>
            <div className="brand-logo"><span>LG</span></div>
            <div className="brand-logo"><span>Dyson</span></div>
            <div className="brand-logo"><span>Philips</span></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header center">
            <h2>What Our Customers Say</h2>
            <p>Trusted by over 2 million happy shoppers worldwide</p>
          </div>
          <div className="testimonials__grid">
            {[
              { name: 'Jessica Davis', text: '"Absolutely love shopping at SuperShop! Fast delivery, amazing prices and the quality of products is outstanding. Will definitely buy again."', avatar: 'JD', bg: '#4d96ff' },
              { name: 'Michael Kim', text: '"Customer service is top-notch. Had an issue with my order and they resolved it within hours. Best online shopping experience I\'ve ever had."', avatar: 'MK', bg: '#6bcb77' },
              { name: 'Sarah Robinson', text: '"The product range is incredible. I found everything I needed in one place — from electronics to groceries. SuperShop truly is a one-stop shop!"', avatar: 'SR', bg: '#c77dff' },
            ].map((test, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-card__stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p>{test.text}</p>
                <div className="testimonial-card__author">
                  <div className="avatar" style={{ background: test.bg }}>{test.avatar}</div>
                  <div>
                    <strong>{test.name}</strong>
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="container newsletter__inner">
          <div className="newsletter__text">
            <h2>Get Exclusive Deals in Your Inbox</h2>
            <p>Subscribe and be the first to know about flash sales & new arrivals.</p>
          </div>
          <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email address…" required />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a href="#" className="logo">
              <span className="logo__icon"><i className="fa fa-shopping-bag"></i></span>
              <span>Super<strong>Shop</strong></span>
            </a>
            <p>Your ultimate one-stop shopping destination for electronics, fashion, home goods, and so much more. Quality products, unbeatable prices.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press & Media</a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track My Order</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li><i className="fa fa-map-marker-alt"></i> 123 Shop Street, New York, NY 10001</li>
              <li><i className="fa fa-phone"></i> +1 (800) 555-SHOP</li>
              <li><i className="fa fa-envelope"></i> support@supershop.com</li>
              <li><i className="fa fa-clock"></i> Mon – Sat: 9am – 6pm EST</li>
            </ul>
            <div className="app-badges">
              <a href="#" className="app-badge"><i className="fab fa-apple"></i> App Store</a>
              <a href="#" className="app-badge"><i className="fab fa-google-play"></i> Google Play</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p>© 2026 SuperShop Inc. All rights reserved.</p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-apple-pay"></i>
              <i className="fab fa-google-pay"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <i className="fa fa-check-circle"></i> Added to cart successfully!
      </div>

      {/* BACK TO TOP */}
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        id="backToTop"
        onClick={scrollToTop}
      >
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );
}
