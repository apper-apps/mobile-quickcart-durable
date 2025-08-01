import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productService } from "@/services/api/productService";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import RecommendationCarousel from "@/components/organisms/RecommendationCarousel";
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [products, categoriesData] = await Promise.all([
        productService.getFeatured(),
        productService.getCategories()
      ]);
      
      setFeaturedProducts(products);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load home page data");
      console.error("Home page error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Hero Section Skeleton */}
          <div className="h-64 bg-gray-200 rounded-2xl mb-12"></div>
          
          {/* Categories Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          
          {/* Products Skeleton */}
          <Loading type="products" count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Error message={error} onRetry={loadHomeData} />
      </div>
    );
  }

  return (
<div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="primary" className="mb-4">
                🚀 New Arrivals Daily
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                Shop Smart,
                <span className="gradient-text block">Shop Fast</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Discover amazing products at unbeatable prices. Free shipping on orders over $50.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon="ShoppingBag"
                  onClick={() => document.getElementById("featured-products").scrollIntoView({ behavior: "smooth" })}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon="Gift"
                >
                  View Deals
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <ApperIcon name="ShoppingCart" className="w-32 h-32 text-primary/60" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-accent to-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold">50% OFF</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Flash Sale Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-accent to-red-500 rounded-2xl p-6 text-white lg:col-span-2"
          >
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                ⚡ Flash Sale
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Up to 70% Off
              </h3>
              <p className="text-white/90 mb-4 text-lg">
                Limited time offer on electronics & gadgets
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  className="bg-white text-accent hover:bg-gray-100"
                  icon="Zap"
                >
                  Shop Flash Sale
                </Button>
                <div className="flex items-center gap-2 text-white/90">
                  <ApperIcon name="Clock" size={16} />
                  <span className="text-sm font-medium">Ends in 2 days</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <ApperIcon name="Percent" className="w-8 h-8" />
            </div>
          </motion.div>

          {/* First Order Discount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white"
          >
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
              🎉 New Customer
            </Badge>
            <h3 className="text-xl font-bold mb-2">25% OFF</h3>
            <p className="text-white/90 mb-4 text-sm">
              Your first order with code
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <code className="text-white font-mono font-bold tracking-wider">
                WELCOME25
              </code>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-gray-100 w-full"
              icon="ShoppingBag"
            >
              Start Shopping
            </Button>
          </motion.div>

          {/* Free Shipping Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-success to-green-600 rounded-2xl p-6 text-white"
          >
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
              🚚 Free Delivery
            </Badge>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-white/90 mb-4 text-sm">
              On orders over $50 with code
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <code className="text-white font-mono font-bold tracking-wider">
                FREESHIP
              </code>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-success hover:bg-gray-100 w-full"
              icon="Truck"
            >
              Shop Now
            </Button>
          </motion.div>

          {/* Weekend Deal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white lg:col-span-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                  🎯 Weekend Special
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Buy 2 Get 1 Free</h3>
                <p className="text-white/90 mb-4">
                  On selected home & garden items this weekend only
                </p>
                <Button
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  icon="Gift"
                >
                  Browse Deals
                </Button>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <ApperIcon name="Gift" className="w-10 h-10" />
                </div>
                <p className="text-xs text-white/80">Valid until Sunday</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-200">
                      <ApperIcon name={category.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.count} items
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

{/* Featured Products */}
      <section id="featured-products" className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/category/all">
              <Button variant="outline" icon="ArrowRight" iconPosition="right">
                View All
              </Button>
            </Link>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            loading={false}
            error={null}
            onRetry={loadHomeData}
          />
        </motion.div>
      </section>

      {/* Personalized Recommendations */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RecommendationCarousel 
              title="Recommended for You"
              className="mb-0"
            />
          </motion.div>
        </div>
      </section>
      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive offers, new product alerts, and shopping tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/20"
              />
              <Button variant="secondary" icon="Mail">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;