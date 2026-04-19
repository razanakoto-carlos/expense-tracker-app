import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Expense from "./pages/Expense"
import Stat from "./pages/Stat"
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/stat" element={<Stat />} />
      </Routes>
    </Layout>
  )
}

export default App