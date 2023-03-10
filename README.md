# Shopping Cart

Shopping Cart created with `create-react-app`. Utilizes multiple routes and `react-router` and is built using the testing tools that come in the `create-react-app` package.

## Planning

### 2/26/23

First, you'll need to create a parent state. There are a few things the state will need.

- How many items are in the user's shopping cart
- The total cost of all of the items in a user's shopping cart
- A list of objects the user is purchasing. This includes the name of the object, how much it is, and how many of that object the user is buying.
- Consider having a state for inventory that contains the items that are being sold to users.

Using test driven development, the plan is to write tests first and then code the components to pass those tests. Thinking about just the home page and the user interaction, what tests would be needed?

Remember that you're not supposed to test `react-router` or `react` itself. Test that user interaction is working properly and that clicking buttons does what its supposed to do. Start with the navbar, which is supposed to do the following.

- Link to the shop page
- Link to the home page
- Link to the shopping cart
- Display the number of items in the cart
