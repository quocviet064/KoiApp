import { Provider } from "react-redux"
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Footer from "./components/layout/footer/Footer"
import Navbar from "./components/layout/header/Navbar"
import ToasterProvider from "./components/providers/Toaster"
import LoginModal from "./components/ui/modals/LoginModal"
import SignupModal from "./components/ui/modals/SignupModal"
import store, { persistor } from "./lib/redux/store"
import Blog from "./pages/Blog/Blog"
import { ViewBlog } from "./pages/Blog/ViewBlog"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import PasswordForgot from "./pages/Password-forgot"
import PasswordReset from "./pages/Password-reset"
import ProfileSetting from "./pages/Setting/Profile"
import UserProfilePage from "./pages/UserProfile"
import SuccessPage from "./pages/Verification/SuccessPage"

function App() {
  const location = useLocation()
  const excludeLayoutPaths = [
    "/password-forgot",
    "/password-reset",
    "/verification/success",
    "/404"
  ]
  const shouldExcludeLayout = excludeLayoutPaths.includes(location.pathname)

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToasterProvider />
          <LoginModal />
          <SignupModal />
          {!shouldExcludeLayout && <Navbar />}
          <div className={shouldExcludeLayout ? "no-layout" : "with-layout"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/password-forgot" element={<PasswordForgot />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/verification/success" element={<SuccessPage />} />
              <Route path="/profile/:name" element={<UserProfilePage />} />
              <Route path="/setting/profile" element={<ProfileSetting />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/read" element={<ViewBlog />} />
              <Route path="/404" element={<NotFound />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {!shouldExcludeLayout && <Footer />}
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
