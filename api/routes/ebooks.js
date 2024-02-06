const { Router } = require('express')
const axios = require('axios')
const router = Router()
const {
  connectToDB,
  insertData,
  selectAllEbooks,
} = require('../../plugins/database.js')

router.post('/ebooks', async (req, res) => {
  const finalDataArray = []
  const iTunesDataArray = []
  const formItems = req.body

  console.log('Otrzymane dane:', formItems)

  let currencyDateRange = {}

  try {
    for (const item of formItems) {
      const iTunesData = await fetchDataFromiTunesAPI(item)
      if (iTunesData) {
        currencyDateRange = updatePriceDateRange(
          iTunesData.date,
          iTunesData.curr,
          currencyDateRange
        )
        iTunesDataArray.push(iTunesData)
      }
    }
    for (const currency in currencyDateRange) {
      for (const year of currencyDateRange[currency].years) {
        const NBPData = await fetchDataFromNBPAPI(year, currency)
        for (const data in iTunesDataArray) {
          if (iTunesDataArray[data].curr === currency) {
            const foundRate = NBPData.rates.find(
              (rate) => rate.effectiveDate === iTunesDataArray[data].date
            )
            if (foundRate) {
              const calculatedPrice = parseFloat(
                (iTunesDataArray[data].price * foundRate.ask).toFixed(6)
              )
              iTunesDataArray[data].fromNBP = {
                rate: foundRate.ask,
                pricePLN: calculatedPrice,
                tableNo: foundRate.no,
              }
              finalDataArray.push(iTunesDataArray[data])
              iTunesDataArray.splice(data, 1)
            }
          }
        }
      }
    }
    for (const data in iTunesDataArray) {
      iTunesDataArray[data].fromNBP = {
        rate: null,
        pricePLN: null,
        tableNo: null,
      }
      finalDataArray.push(iTunesDataArray[data])
    }

    saveToDb(finalDataArray)
    res.send(finalDataArray)
  } catch (error) {
    console.error('Wystąpił błąd:', error)
    res.status(500).send('Wystąpił błąd podczas przetwarzania danych')
  }
})
router.get('/ebooks', async (req, res) => {
  try {
    const data = await selectAllData()
    res.send(data)
  } catch (error) {
    console.error('Wystąpił błąd:', error)
    res.status(500).send('Wystąpił błąd podczas przetwarzania danych')
  }
})

module.exports = router

async function fetchDataFromiTunesAPI(item) {
  try {
    const term = item.title
    const limit = 1
    const entity = 'ebook'
    const attribute = 'titleTerm'

    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term,
        limit,
        entity,
        attribute,
      },
    })
    for (const element of response.data.results) {
      if (
        element.artistName.toLowerCase() === item.author.toLowerCase() &&
        element.trackName.toLowerCase() === item.title.toLowerCase()
      ) {
        const formattedDate = await formatDate(element.releaseDate)
        return {
          name: element.artistName,
          title: element.trackName,
          price: element.price,
          curr: element.currency,
          date: formattedDate,
        }
      }
    }
    return null
  } catch (error) {
    console.error('Wystąpił błąd:', error)
    return null
  }
}

async function fetchDataFromNBPAPI(year, currency) {
  try {
    const response = await axios.get(
      `http://api.nbp.pl/api/exchangerates/rates/c/${currency}/${year}-01-01/${year}-12-31/?format=json`
    )
    return response.data
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych:', error)
    return null
  }
}
function formatDate(dateString) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

function updatePriceDateRange(date, currency, currencyDateRange) {
  // Sprawdź, czy obiekt exchangeRates zawiera dane dla danej waluty
  const year = date.split('-')[0]
  if (!Object.prototype.hasOwnProperty.call(currencyDateRange, currency)) {
    // Jeśli obiekt nie zawiera danej waluty, przypisz podaną datę jako najmniejszą i największą datę dla tej waluty
    currencyDateRange[currency] = {
      years: [year],
    }
  } else if (!currencyDateRange[currency].years.includes(year)) {
    currencyDateRange[currency].years.push(year)
  }
  return currencyDateRange
}

function selectAllData() {
  // Zwracamy obietnicę, która zostanie rozwiązana po pomyślnym zakończeniu operacji
  return new Promise((resolve, reject) => {
    connectToDB()
      .then((db) => {
        selectAllEbooks(db)
          .then((rows) => {
            const transformedData = rows.map((row) => {
              return {
                name: row.name,
                title: row.title,
                curr: row.curr,
                price: row.price,
                date: row.date,
                fromNBP: {
                  rate: row.rate,
                  pricePLN: row.pricePLN,
                  tableNo: row.tableNo,
                },
              }
            })

            // Po przekształceniu wyników zapytania, rozwiązujemy obietnicę z przekształconymi danymi
            resolve(transformedData)
          })
          .catch((err) => {
            console.error('Error:', err)
            // Jeśli wystąpił błąd, odrzucamy obietnicę z błędem
            reject(err)
          })
          .finally(() => {
            // Zamknięcie połączenia z bazą danych po zakończeniu operacji
            db.close()
          })
      })
      .catch((err) => {
        console.error('Error connecting to database:', err)
        // Jeśli wystąpił błąd połączenia, odrzucamy obietnicę z błędem
        reject(err)
      })
  })
}
function saveToDb(data) {
  connectToDB()
    .then((db) => {
      insertData(db, data)
        .then(() => {
          console.log('Data inserted successfully.')
        })
        .catch((error) => {
          console.error('Error inserting data:', error)
        })
        .finally(() => {
          db.close()
        })
    })
    .catch((err) => {
      console.error('Error connecting to database:', err)
    })
}
