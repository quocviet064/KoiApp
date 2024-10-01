import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"

import Footer from "./components/layout/footer/Footer"
import Navbar from "./components/layout/header/Navbar"
import ToasterProvider from "./components/providers/Toaster"
import LoginModal from "./components/ui/modals/LoginModal"
import SignupModal from "./components/ui/modals/SignupModal"
import store from "./lib/redux/store"
import Blog from "./pages/Blog"
import Home from "./pages/Home"
import PasswordForgot from "./pages/Password-forgot"
import PasswordReset from "./pages/Password-reset"

function App() {

  const location = useLocation();
  const excludeLayoutPaths = ["/Password-forgot", "/Password-reset"];
  const shouldExcludeLayout = excludeLayoutPaths.includes(location.pathname);


  return (
    <>
      <Provider store={store}>
        <ToasterProvider />
        <LoginModal />
        <SignupModal />
        {!shouldExcludeLayout && <Navbar />}
        <div className={shouldExcludeLayout ? "no-layout" : "with-layout"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Password-forgot" element={<PasswordForgot />} />
            <Route path="/Password-reset" element={<PasswordReset />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
        {!shouldExcludeLayout && <Footer />}
      </Provider>
    </>
  )
}

export default App
