import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux';
import { Box, Paper } from '@material-ui/core';
import CategorySelect from '../Category/components/CategorySelect';
import AddProductForm from './components/AddProductForm'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
    },
    filterBar: {
        paddingBottom: theme.spacing(2),
        width: '80%',
        marginLeft: '10%'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '100%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function Product() {
    const classes = useStyles();
    const product = useSelector(state => state.product)
    const category = useSelector(state => state.category)
    const [search, setSearch] = React.useState('')
    const [products, setProducts] = React.useState([])
    const [openAddModal, setOpenAddModal] = React.useState(false)

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

        if (search === "") {
            setProducts([...product.products])
        }
        else {
            let catId = category.categories.find(a => a._id === search)
            if (catId.children.length === 0) {
                setProducts(product.products.filter(a => a.category === search))
            }
            else {
                getIds(catId)
            setProducts(product.products.filter(a => ids.includes(a.category) ))
            }   
        }
    }, [search, product.products])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <Layout>
            <Paper className={classes.filterBar}>
                <CategorySelect
                    parent={search}
                    onChange={handleSearch}
                    name="Filter By Category" />
                <Button
                    onClick={() => setOpenAddModal(true)}
                    style={{ float: 'right', marginTop: '1.2rem', marginRight: '1rem' }}
                    variant="contained"
                    color="primary" >
                    Add Product
                </Button>
                <AddProductForm
                    open={openAddModal}
                    handleClose={() => setOpenAddModal(false)}
                />
                
            </Paper>
            <Box width="90%" marginLeft='auto' marginTop='1rem' fontSize="1.2rem">
                {products.length} adet sonuç gösteriliyor
            </Box>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    height="100"
                                    className={classes.cardMedia}
                                    image={`http://localhost:3000/public/${product.productPictures[0].img}`}
                                    title={product.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography>
                                        {`Stock: ${product.quantity}`}
                                    </Typography>
                                    <Typography>
                                        {`${product.price}€`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View
                                    </Button>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    )
}

export default Product
