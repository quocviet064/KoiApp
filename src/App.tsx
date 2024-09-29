import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import ToasterProvider from "./components/providers/Toaster"
import Footer from "./components/layout/footer/Footer"
import Navbar from "./components/layout/header/Navbar"
import LoginModal from "./components/ui/modals/LoginModal"
import SignupModal from "./components/ui/modals/SignupModal"
import store from "./lib/redux/store"
import Blog from "./pages/Blog"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <ToasterProvider/>
        <LoginModal />
        <SignupModal />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={""} />
            <Route path="/elite-exclusive" element={""} />
            <Route path="/digimon" element={""} />
            <Route path="/one-piece" element={""} />
            <Route path="/login" element={"<Login />"} />
            <Route path="/register" element={"<Register />"} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
        <Footer />
      </Provider>
    </>
  )
}

export default App
