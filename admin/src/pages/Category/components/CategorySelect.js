import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
}));

function CategorySelect(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const category = useSelector(state => state.category)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">{props.name}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={props.parent}
                onChange={props.onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {category.categories.map((cat, index) => (
                    <MenuItem value={`${cat._id}`} key={index}>
                        <em>{cat.name}</em>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default CategorySelect
