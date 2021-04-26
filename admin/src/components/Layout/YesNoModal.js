import React from 'react'
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

function YesNoModal(props) {
    return (
        <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { props.content }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.btnNo} color="primary">
                        No
                    </Button>
                    <Button onClick={props.btnYes} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
    )
}

export default YesNoModal
