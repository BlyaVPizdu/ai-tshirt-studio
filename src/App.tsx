import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import CreatePage from "./pages/CreatPage/CreatePage"
import ProductPage from "./pages/ProductPage/ProductPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
       <Route
        path="/product/:id"
        element={<ProductPage />}
      />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  )
}

export default App
