import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MultiStepForm from "./components/MultiStepForm"
import AdminDashboard from "./components/AdminDashboard"
import Navigation from "./components/Navigation"
import { StudentProvider } from "./contexts/StudentContext"

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<MultiStepForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  )
}

export default App
