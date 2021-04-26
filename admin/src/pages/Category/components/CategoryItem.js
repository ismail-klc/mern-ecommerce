import React, { useEffect } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Avatar, Button, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

function CategoryItem(props) {
    const [open, setOpen] = React.useState(false);
    const [haveChild, setHaveChild] = React.useState(props.category.children && props.category.children.length)
    const category = useSelector(state => state.category)
    const [children, setChildren] = React.useState([])

    useEffect(() => {
        let newChildren = []
        props.category.children.map((cat, index) => {
            const child = category.categories.find(c => c._id === cat)
            newChildren.push(child)
        })
        setChildren(newChildren)
    }, [])

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <ListItem button >
                <ListItemIcon >
                    <Avatar alt="Remy Sharp" src={"http://localhost:3000" + props.category.categoryImage} />
                </ListItemIcon>
                <ListItemText primary={`${props.category.name} ${props.category.children.length}`} />
                {haveChild ? (open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />) : null}
                &nbsp; &nbsp; <Button variant="contained" color="primary">Edit</Button>
            </ListItem>

            { haveChild ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding style={{ paddingLeft: '2rem' }}>
                        {children.map((child, index) => (
                            <CategoryItem key={index} category={child} />
                        ))}
                    </List>
                </Collapse> : null}

        </>
    )
}

export default CategoryItem
