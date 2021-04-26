import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField } from '@material-ui/core';
import CategorySelect from '../../Category/components/CategorySelect';
import { useDispatch } from 'react-redux';
import { addCategory, addProduct } from '../../../actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function AddProductForm(props) {
    const [name, setName] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [image, setImage] = React.useState([])
    const [price, setPrice] = React.useState(0)
    const [stock, setStock] = React.useState(0)
    const [description, setDescription] = React.useState("")

    const dispatch = useDispatch()
    const classes = useStyles();

    const handleProductPictures = (e) => {
        setImage([...image, e.target.files[0]]);
      };

    const handleSubmit = () => {

        if (name === "") {
            alert('Category name is required');
            return;
        }

        console.log(name,category,price,description,stock,image);

        const form = new FormData();
        form.append("name", name);
        form.append("quantity", stock);
        form.append("price", price);
        form.append("description", description);
        form.append("category", category);

        for (let pic of image) {
        form.append("productPictures", pic);
        }

        dispatch(addProduct(form)).then(() => props.handleClose())
    }

    return (
        <div>
            <Dialog
                maxWidth={'md'}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add a New Product"}</DialogTitle>
                <DialogContent>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                        fullWidth
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            value={name}
                            margin="normal"
                            required
                            fullWidth
                            label="Product Name"
                            autoFocus
                        />
                        <Box marginBottom={2}>
                            <CategorySelect
                                name="Category"
                                parent={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Box>

                        <Box marginBottom={2}>
                            <TextField
                            fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                label="Price"
                                variant="outlined" />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            fullWidth
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                label="Stock"
                                variant="outlined" />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                            fullWidth
                                rows={4}
                                multiline
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Description"
                                variant="outlined" />
                        </Box>

                        <Box marginTop={2}>
                            <input
                                accept="image/*"
                                multiple
                                className={classes.input}
                                id="contained-button-file"
                                onChange={handleProductPictures}
                                type="file"
                            />
                            <label htmlFor="contained-button-file" >
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button> <span>{image.length}</span>
                            </label>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Close
          </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
