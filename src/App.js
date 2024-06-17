import { Routes, Route, useLocation } from "react-router-dom"
import "./App.css"
import Login from "pages/Login"
import Point from "pages/Point"
import WithdrawList from "pages/WithdrawList"
import StoreList from "pages/StoreList"
import MyPage from "pages/MyPage"
import Header from "components/Header"

const App = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Point />} />
        <Route path="/point" element={<Point />} />
        <Route path="/withdraw" element={<WithdrawList />} />
        <Route path="/store" element={<StoreList />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  )
}

export default App
