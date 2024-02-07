/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose()

function connectToDB() {
  const db = new sqlite3.Database('database.db')

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTableIfNotExists(db)
        .then(() => {
          console.log('Successfully created tables')
          resolve(db)
        })
        .catch((err) => {
          console.error('Error creating tables:', err)
          reject(err)
        })
    })
  })
}

function createTableIfNotExists(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS ebooks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          title TEXT,
          curr TEXT,
          price REAL,
          date TEXT
        )`,
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log('Table ebooks created successfully')
            resolve()
          }
        }
      )

      db.run(
        `CREATE TABLE IF NOT EXISTS NBP_rates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          rate REAL,
          pricePLN REAL,
          tableNo TEXT,
          ebook_id INTEGER,
          FOREIGN KEY (ebook_id) REFERENCES ebooks(id)
        )`,
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log('Table NBP_rates created successfully')
            resolve()
          }
        }
      )
    })
  })
}

function insertData(db, data) {
  return new Promise((resolve, reject) => {
    const stEbooks = db.prepare(
      `INSERT INTO ebooks (name, title, curr, price, date) VALUES (?, ?, ?, ?, ?)`
    )
    const stNBPRates = db.prepare(
      `INSERT INTO NBP_rates (rate, pricePLN, tableNo, ebook_id) VALUES (?, ?, ?, ?)`
    )
    const promises = []

    data.forEach((item) => {
      promises.push(
        insertEbook(stEbooks, item).then((ebookId) => {
          const { rate, pricePLN, tableNo } = item.fromNBP
          return insertNBP(stNBPRates, rate, pricePLN, tableNo, ebookId)
        })
      )
    })

    Promise.all(promises)
      .then(() => {
        stEbooks.finalize()
        stNBPRates.finalize()
        resolve()
      })
      .catch((err) => {
        stEbooks.finalize()
        stNBPRates.finalize()
        reject(err)
      })
  })
}

function insertEbook(stEbooks, item) {
  return new Promise((resolve, reject) => {
    stEbooks.run(
      item.name,
      item.title,
      item.curr,
      item.price,
      item.date,
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      }
    )
  })
}

function insertNBP(stNBPRates, rate, pricePLN, tableNo, ebookId) {
  return new Promise((resolve, reject) => {
    stNBPRates.run(rate, pricePLN, tableNo, ebookId, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function selectAllEbooks(db) {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT ebooks.*, NBP_rates.rate, NBP_rates.pricePLN, NBP_rates.tableNo
        FROM ebooks
        LEFT JOIN NBP_rates ON ebooks.id = NBP_rates.ebook_id
      `
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
module.exports = { connectToDB, insertData, selectAllEbooks }
