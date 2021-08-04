import React from 'react'

const Sidebar = ({user}) => {
    return (
        <div className="sidebar">
            {!user && <div className="card sidebar-intro">
                <h2><span className="highlighted-text">Nerdlog</span> is an awesome community of all kind of Nerds</h2>
                <h4 className="muted-text">we are are a community where Nerds share, and stay up-to-date with their thing.</h4>
                <button className="btn">create new account</button>
            </div>}
            <div className="card sidebar-categories">
                <h1>Categories</h1>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
                <div className="category">random</div>
            </div>
        </div>
    )
}

export default Sidebar
