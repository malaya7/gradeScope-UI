import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover() {
    // const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} size="small" variant="text" color="secondary" onClick={handleClick}>
                Collect
      </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between" direction="col-reverse">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Start Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Start Time"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Box m={2} p={1}>
                <TextField
                    id="standard-number"
                    label="Number of Days"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </Box >
                <Box m={2} p={1}>
                    <TextField
                        id="standard-number"
                        label="frequency/Day"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box m={2} p={1}>
                    <Button variant="contained" size="medium" color="primary">Send!</Button>
                </Box>
            </Popover>
        </div>
    );
}