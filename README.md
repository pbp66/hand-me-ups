# Hand-Me-Ups

## Description

This is a full stack MERN ecommerce application. The purpose of the site is to provide a place for users to buy and sell clothing.

User Story:

```
AS A shopper interested in used/vintage clothing,
I WANT an e-commerce website
SO THAT I can buy, sell, browse, and save clothing items that I'm interested in.
```

Acceptance Criteria:

```
GIVEN an e-commerce website

WHEN I visit the site
THEN a search bar, featured items, recommended items, account icon, logo/brand, shopping cart, and navbar appear on screen

WHEN I click on sign-up
THEN an account is created allowing me to sell clothes

WHEN I click on a listing
THEN a page loads with the listing details (price, tags, description, item title, etc), product images, seller username/account link, seller rating, favorite seller button, save item button, and add to cart button.

WHEN I favorite a seller
THEN the seller is added to my followed seller list.

WHEN I view my recommended items
THEN a list of items is shown containing listings from followed sellers, saved items, and other items with similar tags

WHEN I click on the shopping cart icon
THEN I am taken to a shopping cart page displaying the contents of the shopping cart and a button to checkout

WHEN I click on the checkout button
THEN I fill out a form for shipping address, billing address, and credit card information

WHEN I submit the checkout form
THEN my order is placed and the product listing is marked as purchased

AS A USER i want to be able to browse clothing that interests me...
AS A USER i want to be able to sell clothes at a price of my choice...
```

## Table of Contents

- [Hand-Me-Ups](#hand-me-ups)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation

The user can clone the code from the GitHub repo. Once the code is cloned and opened in a code editor the user should install all npm packages by running 
```
npm i
```
The user can seed the database running
```
npm run seed
```
To invoke the application the user can run 

```
npm start
```
If the user wants to run in a dev environment so the server refreshes after changes are made the user should run
```
npm run develop
```

## Usage

Once the user enters the site they can browse all the listings. Before they can interact with most of the site they will need to either login or signup. This can be done by clicking on the Login or Signup buttons in the navbar. Once logged in users can add their own listings, add listings to their cart, favorite a listing, and make an order.

![Discover]()
![Cart]()
![Saved Items]()
![My Listings]()

## Credits

- [Apollo](https://www.apollographql.com/docs/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Stripe](https://stripe.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [React](https://reactjs.org/docs/getting-started.html)

## License

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=brightgreen)

MIT

Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## How to Contribute

Before contributing, be sure to read the GitHub [Code of Conduct](https://github.com/github/docs/blob/main/CODE_OF_CONDUCT.md). If you have an issue, search all open issues to see if one matches the description of your issue. If not, proceed to create one providing details on the issue, errors, OS, options provided, installed node packages, etc. Issues are not assigned to anyone by the repository team. To select an issue to work on, open a pull request and generate a new branch labeled as the issue. Add your name as a contributor to the issue in question. When you make the desired changes and fixes, push all changes to your branch on the repository and submit. The repository team will review the changes. If acceptable, we will merge the changes to main and we will notify you of a successful merge or any necessary changes before a merge can take place.

## Tests

No Tests Provided

## Questions

Repo owner: [pbp66](https://github.com/pbp66).
For any questions, you may contact pbp66 via email: pbp66.coding@gmail.com. Please format your email using the following template:

-   Subject: Repository - Question/Issue
-   Body: Summarize the issue with a brief description for the first paragraph. Additional paragraphs can be used for a long description, if needed. Include any errors when using this project
-   Signature: Please leave an email address so that any updates are sent get back to you.
