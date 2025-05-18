import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import s from "./layout.module.scss"
import {  Outlet } from "react-router"


const Layout = () => {
    return (
        <div className={s.layout__wrapper}>
        <Header />
        <main className={s.layoutContent}>
            <Outlet />
        </main>
        <Footer/>
    </div>
    )
}

export default Layout
