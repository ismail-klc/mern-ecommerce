import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Dashboard from '../../components/Layout/Layout'
import View from './components/View'

function Home() {
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    
    return (
        <Dashboard>
            <Grid
                container
                spacing={3}>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <View
                        name="Categories"
                        value={category.categories.length}
                    />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <View
                        name="Products"
                        value={product.products.length}
                    />
                </Grid>

            </Grid>

        </Dashboard>
    )
}

export default Home
