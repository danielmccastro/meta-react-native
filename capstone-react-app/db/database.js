import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

const getMenuFromApi = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.log(error);
  }
};

const createAndShowMenu = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS menu (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL, 
          price NUMERIC NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          category TEXT NOT NULL
        )`,
        [],
        (_, result) => {
          tx.executeSql("SELECT * FROM menu", [], (_, { rows: { _array } }) => {
            resolve(_array);
          });
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const insertDish = async (name, price, description, image, category) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO menu (name, price, description, image, category) values (?,?,?,?,?)",
          [name, price, description, image, category]
        );
      },
      reject,
      resolve
    );
  });
};

const checkMenu = async () => {
  const databaseMenu = await createAndShowMenu();
  if (databaseMenu?.length) return databaseMenu;
  const menuApi = await getMenuFromApi();

  const dishesFromApi = menuApi.map((item) => ({
    ...item,
    image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
  }));
  for (const item of dishesFromApi) {
    await insertDish(
      item.name,
      item.price,
      item.description,
      item.image,
      item.category
    );
  }
  return dishesFromApi;
};

const removeDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql("DROP TABLE IF EXISTS menu");
        },
        reject,
        resolve
      );
    } catch (error) {
      console.error("Error Reseting database", error);
      reject(error);
    }
  });
};

export { getMenuFromApi, createAndShowMenu, insertDish, checkMenu, removeDatabase };
