# Shop-JDevEntyTask-SergejsJevstignejevs
Scandiweb Junior Developer test assignment/Entry React developer TEST

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
shop-v2
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Main problems:

Major:
    
    1. Due to screening out unnecessary prices at the initial step before sending them to the ProductCard component, there appeared a problem that in MiniCart after changing price it doesn't change. 
        So I needed to iterate every product in the cart and change their price after currency change. 
        And to manifest this I saved products of 'all' category, due to this, if there will be a lot of products this will take a large amount of space(as well as it feels kinda hardcoded). 
        Tried to get prices through Query selecting with product id, however it breaks programm because of the asynchronous approach of getting data from query.
        (It can be solved, but I don't have enough knowledge now)(As well as this wouldn't have happened if I haven't removed all but needed price from product).
    2. In the function onAddingProductToCart() there is excessive checking.
    
Minor:
    
    1. CartPage doesn't close after refresh, but can be closed by clicking on the "View Bag" button again.
    2. Styling of attributes list items is sloppy(Only the first of the items have 80px width).
    
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
shop-v1
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. In the "data_and_query" folder is 'data.json' that I got from the provided endpoint, as well as the schema that I used to get this data.
2. In "shop" folder locates the fulfilled task(what I was able to do)
    - In 'App.js' file everything that is commented, is an implementation of localStorage, however due to circular structure it can not be used
    - I couldn't implement selection of attributes of the product, because of initial idea of storing only ids of products,
      as well as later using .module.css for implementing cart items on a larger scale.
3. So, because there is no localStorage, when clicking on the button "View bag" you can get out of it(bag) using the same button as when entering it.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
