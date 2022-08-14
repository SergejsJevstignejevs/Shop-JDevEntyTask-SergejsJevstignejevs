import React from "react";
import { ApolloProvider } from "@apollo/client/react";

import apolloClient from "../../services/client/Client";
import { fetchQueryData,
         CATEGORY_NAMES,
         PRODUCTS_BY_CATEGORY,
         AVAILABLE_CURRENCIES } from "../../services/queries/Queries";

import AppHeader from "../appHeader/AppHeader";
import AppTitle from "../appTitle/AppTitle";
import ProductListingPage from "../productListingPage/ProductListingPage";
import CurrencySwitcher from "../currencySwitcher/CurrencySwitcher";
import MiniCart from "../miniCart/MiniCart";
import CartPage from "../cartPage/CartPage";
import ProductDetailsPage from "../productDetailsPage/ProductDetailsPage";

import './App.css';

const LOCAL_STORAGE_NAME = "locally-stored-shop";

export default class App extends React.Component {

  state = {

    pageLoaded: false,
    categoryNames: {},
    selectedCategory: "all",
    selectedCategoryProducts: [],
    allCategoryProducts: [],
    availableCurrencies: [],
    selectedCurrency: {label: "USD", symbol: "$"},
    openCurrencySwitcher: false,
    openMiniCart: false,
    productsInCart: [],
    productsInCartCount: 0,
    totalCost: 0,
    openCartPage: false,
    openProductListingPage: true,
    selectedProductId: "",
    openProductDetailsPage: false

  }

  async componentDidMount() {

    const currentLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

    if(currentLocalStorage === undefined || currentLocalStorage === null){ 

      const { selectedCategory } = this.state;

      const categoryNames = await fetchQueryData(CATEGORY_NAMES);
      const selectedCategoryProducts = await fetchQueryData(PRODUCTS_BY_CATEGORY, {title: selectedCategory});
      const allCategoryProducts = await fetchQueryData(PRODUCTS_BY_CATEGORY, {title: "all"});
      const availableCurrencies = await fetchQueryData(AVAILABLE_CURRENCIES);

      this.setState({

        categoryNames: categoryNames.categories,
        selectedCategoryProducts: selectedCategoryProducts.category.products,
        allCategoryProducts: allCategoryProducts.category.products,
        availableCurrencies: availableCurrencies.currencies,
        pageLoaded: true,

      });

      this.setToLocalStorage();

    }
    else {

      this.setState({

        pageLoaded: currentLocalStorage.pageLoaded,
        categoryNames: currentLocalStorage.categoryNames,
        selectedCategory: currentLocalStorage.selectedCategory,
        selectedCategoryProducts: currentLocalStorage.selectedCategoryProducts,
        allCategoryProducts: currentLocalStorage.allCategoryProducts,
        availableCurrencies: currentLocalStorage.availableCurrencies,
        selectedCurrency: currentLocalStorage.selectedCurrency,
        openCurrencySwitcher: currentLocalStorage.openCurrencySwitcher,
        openMiniCart: currentLocalStorage.openMiniCart,
        productsInCart: currentLocalStorage.productsInCart,
        productsInCartCount: currentLocalStorage.productsInCartCount,
        totalCost: currentLocalStorage.totalCost,
        openCartPage: currentLocalStorage.openCartPage,
        openProductListingPage: currentLocalStorage.openProductListingPage,
        selectedProductId: currentLocalStorage.selectedProductId,
        openProductDetailsPage: currentLocalStorage.openProductDetailsPage

      })

    }
    
  }

  async componentDidUpdate(prevProps, prevState){

    const { selectedCategory, productsInCartCount, selectedCurrency } = this.state;

    if(prevState.selectedCategory !== selectedCategory){

      const selectedCategoryProducts = await fetchQueryData(PRODUCTS_BY_CATEGORY, {title: selectedCategory});
      this.setState({

        selectedCategoryProducts: selectedCategoryProducts.category.products

      });

    }

    if(prevState.productsInCartCount !== productsInCartCount 
      || prevState.selectedCurrency.label !== selectedCurrency.label) {

      this.onTotalCostChange();

    }

    if(prevState.selectedCurrency.label !== selectedCurrency.label) {

      this.setState(({productsInCart, allCategoryProducts}) => {

        const updatedProductsInCart = productsInCart.map(item => {

          const neededProduct = allCategoryProducts.filter(elem => elem.id === item.id)[0];
          const updatedPrice = neededProduct.prices.filter(cur => cur.currency.label === selectedCurrency.label)[0];
          
          return ({

            ...item,
            price: updatedPrice

          });

        });

        return ({

          productsInCart: updatedProductsInCart

        });

      });

      this.onTotalCostChange();

    };

    this.setToLocalStorage();

  }

  setToLocalStorage = () => {

    const localStorageItems = {

      pageLoaded: this.state.pageLoaded,
      categoryNames: this.state.categoryNames,
      selectedCategory: this.state.selectedCategory,
      selectedCategoryProducts: this.state.selectedCategoryProducts,
      allCategoryProducts: this.state.allCategoryProducts,
      availableCurrencies: this.state.availableCurrencies,
      selectedCurrency: this.state.selectedCurrency,
      openCurrencySwitcher: this.state.openCurrencySwitcher,
      openMiniCart: this.state.openMiniCart,
      productsInCart: this.state.productsInCart,
      productsInCartCount: this.state.productsInCartCount,
      totalCost: this.state.totalCost,
      openCartPage: this.state.openCartPage,
      openProductListingPage: this.state.openProductListingPage,
      selectedProductId: this.state.selectedProductId,
      openProductDetailsPage: this.state.openProductDetailsPage

    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localStorageItems));

  }
  
  onSelectedCategoryChange = (categoryName) => {

    this.setState({

      selectedCategory: categoryName

    });

  }

  onCurrencySwitcherOpening = () => {

    this.setState(({openCurrencySwitcher}) => ({

      openCurrencySwitcher: !openCurrencySwitcher

    }));

  }

  onSelectedCurrencyChange = (currency) => {

    this.setState({

      selectedCurrency: {
        label: currency.label,
        symbol: currency.symbol
      }

    });

  }

  onMiniCartOpening = () => {

    this.setState(({openMiniCart}) => ({

      openMiniCart: !openMiniCart

    }));

    const {openMiniCart} = this.state;
    
    if(!openMiniCart) document.body.style.overflow = "hidden";
    if(openMiniCart) document.body.style.overflow = "unset";

  }

  onAddingProductToCart = (product, selectedAttributes) => {

    const {id, name, brand, price, gallery, fullAttributes} = product;
  
    this.setState(({productsInCart, productsInCartCount}) => {

      const productIndexInCart = productsInCart.findIndex(item => JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes));

      if(productIndexInCart >= 0) {

        const identicalProducts = JSON.stringify(productsInCart[productIndexInCart].selectedAttributes) === JSON.stringify(selectedAttributes);
        
        if(selectedAttributes.length === 0 || identicalProducts){
  
          const updatedProductsInCart = productsInCart.map(item => {
  
            if(JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)) {
  
              return {
  
                ...item,
                count: item.count + 1
  
              }
  
            }
  
            return item;
  
          })
  
          return ({
  
            productsInCart: updatedProductsInCart,
            productsInCartCount: productsInCartCount + 1
  
          });
  
        }
        
        if(!identicalProducts) {
  
          const newProduct = {
  
            id: id,
            name: name,
            brand: brand,
            price: price,
            gallery: gallery,
            count: 1,
            selectedAttributes: selectedAttributes,
            fullAttributes: fullAttributes
    
          }
    
          return ({
    
            productsInCart: [...productsInCart, newProduct],
            productsInCartCount: productsInCartCount + 1
    
          });
  
        }
  
      }
      else {

        const newProduct = {
  
          id: id,
          name: name,
          brand: brand,
          price: price,
          gallery: gallery,
          count: 1,
          selectedAttributes: selectedAttributes,
          fullAttributes: fullAttributes
  
        }
  
        return ({
  
          productsInCart: [...productsInCart, newProduct],
          productsInCartCount: productsInCartCount + 1
  
        });
  
      }

    });

  }

  onDeletingProductFromCart = (id, selectedAttributes) => {

    this.setState(({productsInCart, productsInCartCount}) => {

      const updatedProductsInCart = productsInCart.map(item => {

        if(item.id === id){

          const identicalProducts = JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes);
          
          if(identicalProducts) {

            return {

              ...item,
              count: item.count - 1

            }
          
          }

        }

        return item;

      });

      return ({

        productsInCart: updatedProductsInCart.filter(elem => elem.count > 0),
        productsInCartCount: productsInCartCount - 1

      });

    });

  }

  onTotalCostChange = () => {

    this.setState(({productsInCart}) => {

      let total = 0;
      productsInCart.forEach(item => {

        total = parseFloat(parseFloat(total) + parseFloat(item.count * item.price.amount)).toFixed(2);

      })

      return ({

        totalCost: total

      });

    });

  }

  onCartPageOpening = () => {

    const { openProductDetailsPage } = this.state;

    if(!openProductDetailsPage) {

      this.setState(({openCartPage, openProductListingPage}) => ({

        openCartPage: !openCartPage,
        openProductListingPage: !openProductListingPage,
        openProductDetailsPage: false
  
      }))

    }
    else {

      this.setState(({openCartPage}) => ({

        openCartPage: !openCartPage,
        openProductListingPage: false,
        openProductDetailsPage: false
  
      }))

    }

  }

  onProductDetailsPageOpening = (id) => {

    this.setState(({openProductDetailsPage, openProductListingPage}) => ({

      selectedProductId: id,
      openProductDetailsPage: !openProductDetailsPage,
      openProductListingPage: !openProductListingPage,
      openCartPage: false

    }))

  }

  render(){

    const { pageLoaded, 
            categoryNames, 
            selectedCategory, 
            selectedCategoryProducts,
            availableCurrencies,
            openCurrencySwitcher,
            selectedCurrency,
            openMiniCart,
            productsInCart,
            productsInCartCount,
            totalCost,
            openCartPage,
            openProductListingPage,
            openProductDetailsPage,
            selectedProductId } = this.state;

    const currencySwitcher = 
          openCurrencySwitcher ? 
            <CurrencySwitcher
              availableCurrencies={availableCurrencies}
              onCurrencySwitcherOpening={this.onCurrencySwitcherOpening}
              onSelectedCurrencyChange={this.onSelectedCurrencyChange}/> 
            : null;
    
    const selectedCategoryProductsWithSelectedCurrency = selectedCategoryProducts.map(item => {

      const neededCurrencyIndex = item.prices.findIndex(elem => {
        
        return elem.currency.label === selectedCurrency.label;

      });

      return ({

        ...item, prices: item.prices[neededCurrencyIndex]

      });

    });
    
    const miniCart = 
          openMiniCart ? 
            <MiniCart
              productsInCart={productsInCart}
              productsInCartCount={productsInCartCount}
              onAddingProductToCart={this.onAddingProductToCart}
              onDeletingProductFromCart={this.onDeletingProductFromCart}
              totalCost={totalCost}
              selectedCurrency={selectedCurrency}
              onCartPageOpening={this.onCartPageOpening}/>
            : null;

    const shadowClass = miniCart ? " shadow" : '';

    return (
      <ApolloProvider client={apolloClient}>
        <div className={`App`}>
          {pageLoaded ?
              <>
                <AppHeader 
                  categoryNames={categoryNames}
                  selectedCategory={selectedCategory}
                  onSelectedCategoryChange={this.onSelectedCategoryChange}
                  openCurrencySwitcher={openCurrencySwitcher}
                  onCurrencySwitcherOpening={this.onCurrencySwitcherOpening}
                  openMiniCart={openMiniCart}
                  onMiniCartOpening={this.onMiniCartOpening}
                  productsInCartCount={productsInCartCount}/>
                <div 
                    className={`App__content ${shadowClass}`} 
                    onClick={() => {
                        
                        document.body.style.overflow = "unset";
                        this.setState({openMiniCart: false})
                     
                      }
                    }>
                  {!openProductDetailsPage ?
                    <AppTitle
                      selectedCategory={openCartPage ? "Cart" : selectedCategory}/>
                    :
                    null
                  }
                  {openProductListingPage ? 
                    <ProductListingPage
                      selectedCategoryProductsWithSelectedCurrency={selectedCategoryProductsWithSelectedCurrency}
                      onAddingProductToCart={this.onAddingProductToCart}
                      onProductDetailsPageOpening={this.onProductDetailsPageOpening}/>
                    :
                    openCartPage ?
                      <CartPage
                        productsInCart={productsInCart}
                        onAddingProductToCart={this.onAddingProductToCart}
                        onDeletingProductFromCart={this.onDeletingProductFromCart}
                        productsInCartCount={productsInCartCount}
                        totalCost={totalCost}
                        selectedCurrency={selectedCurrency}/>
                    :
                    openProductDetailsPage ?
                      <ProductDetailsPage
                        onProductDetailsPageOpening={this.onProductDetailsPageOpening}
                        selectedCurrency={selectedCurrency}
                        selectedProductId={selectedProductId}
                        large={true}
                        onAddingProductToCart={this.onAddingProductToCart}
                        />
                    :
                    null
                  }   
                </div>
                {currencySwitcher}
                {miniCart}
              </>
              : null
          }
        </div>
      </ApolloProvider>
    );

  }

}