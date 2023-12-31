import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS menuitems 
          (id INTEGER PRIMARY KEY, 
            name TEXT NOT NULL, 
            price NUMERIC NOT NULL, 
            description TEXT NOT NULL, 
            image TEXT NOT NULL, 
            category TEXT NOT NULL);`
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM menuitems`, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          `INSERT INTO menuitems (id, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            item.id,
            item.name,
            item.price,
            item.description,
            item.image,
            item.category,
          ],
          (tx, results) => {
            return results;
          },
          (_, error) => {
            console.log("Error inserting:", error);
          }
        );
      });
    });
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM menuitems WHERE ${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM menuitems WHERE (name like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(" or ")})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
}

export async function removeDatabase() {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql("DROP TABLE IF EXISTS menuitems");
        },
        reject,
        resolve
      );
    } catch (error) {
      console.error("Error Reseting database", error);
      reject(error);
    }
  });
}