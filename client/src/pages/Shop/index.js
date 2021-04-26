import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout'
import Category from '../Category'
import HeaderBottom from '../Header/bottom'
import HeaderTop from '../Header/top'
import Product from '../Product'

function Shop() {
    const [products, setProducts] = useState([])
    const category = useSelector(state => state.category)
    const { slug } = useParams()
    const product = useSelector(state => state.product)
    const [categoryId, setCategoryId] = useState(null)
    const [price, setPrice] = useState(0)

    let ids = []
    const getIds = (catId) => {
        if (!catId.children) {
            return
        }

        catId.children.map(c => {
            let a = category.categories.find(x => x._id === c)
            console.log(c);
            ids.push(c)
            getIds(a)
        })
    }

    useEffect(() => {

        console.log(product, category, slug);
        if (slug) {
            let catId = category.categories.find(a => a.slug === slug)
            console.log(catId);
            setCategoryId(catId)

            if (catId) {
                if (catId.children.length === 0) {
                    setProducts(product.products.filter(a => a.category === catId._id))
                }
                else {
                    getIds(catId)
                    setProducts(product.products.filter(a => ids.includes(a.category)))
                }
            }

        }

    }, [slug, product, category])

    return (
        <Layout>
            <section id="advertisement">
                <div className="container">
                    <img src="images/shop/advertisement.jpg" alt="" />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 padding-right">
                            <div className="features_items">
                                <h2 className="title text-center">{categoryId && categoryId.name}</h2>

                                {products ? products.map((p, index) => (
                                    <Product
                                        id={p._id}
                                        key={index}
                                        image={p.productPictures[0].img}
                                        price={p.price}
                                        name={p.name}
                                        slug={p.slug}
                                    />
                                )) : "No product in this category"}
                                {
                                    products.length === 0 ? null :
                                        <div className="col-md-12">
                                            <ul className="pagination">
                                                <li className="active"><a href="">1</a></li>
                                                <li><a href="">2</a></li>
                                                <li><a href="">3</a></li>
                                                <li><a href="">&raquo;</a></li>
                                            </ul>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Shop
