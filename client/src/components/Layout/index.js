import React from 'react'
import HeaderBottom from '../../pages/Header/bottom'
import HeaderTop from '../../pages/Header/top'
import Footer from '../Footer'

function Layout(props) {
    return (
        <div >
            <header id="header">
                <HeaderTop />
                <HeaderBottom />
            </header>

            <div>
            { props.children}
            </div>

            <Footer />
        </div>
    )
}

export default Layout
