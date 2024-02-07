## Ebook Price App

### Description

The Ebook Price App allows the user to find info about ebook based on a list of authors/titles. The application uses the iTunes Search API to retrieve information about ebooks and the NBP API to fetch currency exchange rates.

### Features

- Searching for the information about ebook with its exchange rate and price converted to PLN based on a list of authors/titles.
- Saving the retrieved data in a database along with information about the exchange rate and the table number from which the rate comes.
- Ability to share the combined data through a custom API.
- Retrieve data from database through web page.

### User Guide

1. Running the application:
   - Clone the repository of the application.
   - Install the required dependencies: `npm install`.
   - Start the application: `npm run dev`.

2. Searching for ebook price:
   - Enter a list of authors/titles.
   - Click the "Submit" button.
   - Data about ebooks will be displayed on the screen.

3. Saving data:
   - The data will be automatically saved to the database along with information about the exchange rate and the table number.

### Input Data

- List of authors/titles of ebooks.

### Output Data

The output data will be organized as follows:
```
[
  {
    "name": "Agatha Christie",
    "title": "The Lying Game",
    "curr": "USD",
    "price": 16.99,
    "date": "2022-09-08",
    "fromNBP": {
      "rate": 3.1288,
      "pricePLN": 53.158312,
      "tableNo": "51/A/NBP/2012"
    }
  },
  {
    "name": "Agatha Christie",
    "title": "Murder on the Orient Express",
    "curr": "USD",
    "price": 2.99,
    "date": "2020-04-30",
    "fromNBP": {
      "rate": 3.1288,
      "pricePLN": 9.355112,
      "tableNo": "51/A/NBP/2012"
    }
  }
]

```
### Database

Database was created using SQLite for local data storage.

![ERD Diagram](documentation/diagram_erd.PNG)
### Sequence Diagram

![Sequence Diagram](documentation/sequence_diagram.PNG)

### Technologies

- Vue.js/Nuxt.js with Tailwind.CSS for building the user interface.
- Node.js/Express.js for backend handling.
- SQLite for data storage.

### Author

Author: Mateusz Maroń