import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);"
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
      tx.executeSql(
        "select * from menuitems",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (tx, error) => {
          console.error(error);
        }
      );
    });
  });
}

export async function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO menuitems (id,title,price,category) VALUES ${menuItems
          .map((value) => "(?,?,?,?)")
          .join(",")}`,
        menuItems.flatMap((value) => [
          value.id,
          value.title,
          value.price,
          value.category,
        ]),
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log("Insert success");
            resolve();
          } else {
            reject();
          }
        }
      );
    });
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menuitems WHERE category IN (${activeCategories
          .map((e) => `'${e}'`)
          .join(",")}) AND title LIKE '%${query}%';`,
        [],
        (tx, results) => {
          resolve(results.rows._array);
        },
        (tx, error) => {
          console.error(error);
        }
      );
    });
  });
}
