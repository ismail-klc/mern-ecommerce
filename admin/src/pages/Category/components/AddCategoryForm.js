import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, TextField } from '@material-ui/core';
import CategorySelect from './CategorySelect';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../actions';
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

export default function AddCategoryForm(props) {
  const [name, setName] = React.useState('')
  const [parent, setParent] = React.useState('')
  const [image, setImage] = React.useState('')
  const dispatch = useDispatch()
  const classes = useStyles();

  const handleSubmit = () => {

    if (name === "") {
      alert('Category name is required');
      return;
    }

    const form = new FormData()
    form.append('name', name)
    form.append('parentId', parent)
    form.append('categoryImage', image)
    props.handleClose()

    dispatch(addCategory(form));
    setName('');
    setParent('');
    setImage('')
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add a New Category"}</DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              value={name}
              margin="normal"
              required
              fullWidth
              label="Category Name"
              autoFocus
            />
            <CategorySelect
              name="Parent Category"
              parent={parent}
              onChange={(e) => setParent(e.target.value)}
            />
            <Box marginTop={2}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                onChange={(e) => setImage(e.target.files[0])}
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
