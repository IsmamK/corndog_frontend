import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';

const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Fetch categories sorted by priority in ascending order
        const categoriesResponse = await fetch('/api/show_categories/?ordering=priority');
        const categoriesData = await categoriesResponse.json();
        
        // Fetch subcategories sorted by priority in ascending order
        const subcategoriesResponse = await fetch('/api/show_subcategories/?ordering=priority');
        const subcategoriesData = await subcategoriesResponse.json();
        
        // Fetch all products
        const productsResponse = await fetch('/api/products/');
        const productsData = await productsResponse.json();

        // Filter active categories
        const activeCategories = categoriesData.filter(category => category.is_active);

        // Structure menu data
        const menuData = activeCategories.map(category => {
          const categorySubcategories = subcategoriesData.filter(subcategory => subcategory.parent_category === category.id && subcategory.is_active);
          const categoryProducts = productsData.filter(product => categorySubcategories.some(subcategory => subcategory.id === product.sub_category));
          return {
            ...category,
            subcategories: categorySubcategories,
            products: categoryProducts
          };
        });

        setMenuData(menuData);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div className="container mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold mb-8">Menu</h1>
      {menuData.map((category, index) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">{category.name}</h2>
          <hr className="my-4 border-t-2 border-gray-400" />
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="mb-4">
              <h3 className="text-xl font-medium mb-2">{subcategory.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.products.map((product) => (
                  (product.sub_category === subcategory.id) && (
                    <MenuItem
                      id={product.id}
                      name={product.title}
                      description={product.description}
                      price={product.price}
                      image={product.image}
                    />
                  )
                ))}
              </div>
              <hr className="my-4 border-t border-gray-300" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
