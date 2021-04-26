import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HeaderBottom() {
    const [search, setSearch] = React.useState('')
    const category = useSelector(state => state.category)

    return (
        <div className="header-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="mainmenu pull-left">
                            <ul className="nav navbar-nav collapse navbar-collapse">
                                {category.categories.map((c, index) => (
                                    c.parentId ? null :
                                        <li key={index} ><Link to={`/${c.slug}`} 
                                            >{c.name}</Link>
                                            { c.children.length > 0 ? 
                                            <ul role="menu" className="sub-menu">
                                             {
                                                  c.children.map((id, index) => {
                                                    let child = category.categories.find(a => a._id === id)
                                                    return (
                                                        <li key={index}><Link to={`/${child.slug}`}>{child.name} </Link></li>
                                                    )
                                                })
                                             }
                                        </ul> : null}
                                        </li>
                                        

                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="search_box pull-right">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom