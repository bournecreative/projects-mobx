import React from "react";
import { useLocalStore, observer } from "mobx-react";

/*
Step 1. Import React createContext and set

Step 2. Create StoreProvider. This component is a wrapper for our application. Our children components are passed within it.
  2A. Set up store. This will be passed as a prop to our StoreContext.Provider

Step 3. To access the store passed within the Store Provider, you must use React.useContext

! use observer. Its straightforward. Wrap your Functional Component's function and you are down. DO NOT use useObserver. This is now deprecated and is clunky to use.
  */

const StoreContext = React.createContext([]);


const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    sweets: ["Scotchmallow"],
    get inventory() {
      return store.sweets.length
    }
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const CandyList = observer(() => {
  const store = React.useContext(StoreContext)
  return (
    <ul>
      {store.sweets.map((sweet) => (
        <li key={sweet}>{sweet}</li>
      ))}
    </ul>
  )
})

const CandyHeader = () => {
  const store = React.useContext(StoreContext)
  return (
    <>
      <h2>Sweets in stock: {store.inventory}</h2>
      <hr />
    </>
  )
}

const CandyStocker = observer(() => {
  const store = React.useContext(StoreContext)

  const [entry, setEntry] = React.useState("")
  return (
    <div>
      <CandyHeader />
      <input onChange={(e) => { setEntry(e.target.value) }} value={entry} type="text" placeholder="Add item to Store" />
      <button onClick={() => {
        setEntry('')
        store.sweets.push(entry)
      }}>Add Candy</button>
    </div>
  )
})

export const App = () => {
  return (
    <StoreProvider>
      <main>
        <CandyList></CandyList>
        <CandyStocker />
      </main>
    </StoreProvider>
  );
};
