import { Box, Button, List, ListItem, ListItemIcon, ListSubheader, makeStyles } from '@material-ui/core';
import React,{useEffect} from 'react'
import Dashboard from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryForm from './components/AddCategoryForm';
import CategoryItem from './components/CategoryItem';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '70%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function Category() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [openAddModal, setOpenAddModal] = React.useState(false)

    const category = useSelector(state => state.category)

    useEffect(() => {
        
    }, [category.categories])

    return (
        <Dashboard>
            <Box marginBottom={3}>
                <Button
                    style={{marginLeft: '15%'}}
                    onClick={() => setOpenAddModal(true)}
                    variant="contained"
                    color="primary" >
                    Add New Category
            </Button>
                <AddCategoryForm
                    open={openAddModal}
                    handleClose={() => setOpenAddModal(false)}
                />
            </Box>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Categories
                    </ListSubheader>
                }
                className={classes.root}
            >
                {category.categories.map((cat, index) => (
                    cat.parentId ? null :
                        <CategoryItem
                            key={index}
                            category={cat}
                        />
                ))}
            </List>
        </Dashboard>
    )
}

export default Category
