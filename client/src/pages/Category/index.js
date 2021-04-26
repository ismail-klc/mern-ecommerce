import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Category() {
    const category = useSelector(state => state.category)

    return (
        <div>
            <h2>Category</h2>
            <div className="panel-group category-products" id="accordian">
                <div className="panel panel-default">
                    {category.categories.map((c, index) => (
                        c.parentId ? null :
                            <div key={index}>
                                <div className="panel-heading" >
                                    <h4 className="panel-title">
                                        <Link to={`/${c.slug}`}>
                                            {c.name}
                                        </Link>
                                        {
                                            c.children.length > 0 ?
                                                <a
                                                    data-toggle="collapse"
                                                    data-parent="#accordian"
                                                    href={`#${index}`}
                                                    className="badge pull-right">
                                                    <i className="fa fa-plus"></i></a> : null
                                        }

                                    </h4>
                                </div>
                                {
                                    c.children.length > 0 ?
                                        <div id={index} className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    {
                                                        c.children.map((id, index) => {
                                                            let child = category.categories.find(a => a._id === id)
                                                            return (
                                                                <li key={index}><Link to={`/${child.slug}`}>{child.name} </Link></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div> : null
                                }
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category