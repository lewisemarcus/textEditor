import { openDB } from "idb"

const initdb = async () =>
    openDB("jate", 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains("jate")) {
                console.log("jate database already exists")
                return
            }
            db.createObjectStore("jate", { keyPath: "id", autoIncrement: true })
            console.log("jate database created")
        },
    })

// Done: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log("Post to the database")

    //connect to jateDb
    const jateDb = await openDB("jate", 1)

    //specify privileges to db
    const transaction = jateDb.transaction("jate", "readwrite")

    //open location of where to store input
    const store = transaction.objectStore("jate")

    //Create a request variable which updates the content added from the user to the db
    const request = store.put({ id: 1, value: content })

    const result = await request

    console.log("🚀 - data saved to the database", result.value)
}

// Done: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log("GET from database")

    const jateDb = await openDB("jate", 1)

    //Instead of readwrite, allow readonly privilege
    const transaction = jateDb.transaction("jate", "readonly")

    const store = transaction.objectStore("jate")

    //getAll returns all data from store
    const request = store.get(1)

    const result = await request

    console.log("result.value", result)
    return result?.value
}

initdb()
