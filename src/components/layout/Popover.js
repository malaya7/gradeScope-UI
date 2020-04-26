import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import API_URLS from '../../config/config';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        width: 250,
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [days, setDays] = React.useState(3);
    const [freq, setFrq] = React.useState(1);

  /*   const handleDateChange = (date) => {
        setSelectedDate(date);
    }; */

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSend = async (e) => {
        if(days < 1 || freq < 1) {
            alert("Days and frequency should be a postive number!");
            return;
        }
        const isFuture = new Date(selectedDate).setHours(0,0,0,0) > new Date().setHours(0,0,0,0);
        if(!isFuture) {
            alert("Please Select date and time in Future!");
            return;
        }
        const url = `${API_URLS.base}/scrape`;

        const info = props.courseInfo.Link;
        const ids = info.split('/');

        const sstime = new Date(selectedDate).toISOString();
        const res = await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stime: sstime,
                forDays: days,
                cId: ids[2],
                aId: ids[4] ,
                freq,
            })
        });
        if(res.status !== 200) {
            alert("Server Error, Please Try Again later!");
        } else {
            alert("Request Accepted! -_-");
        }
        handleClose();

    }
    console.log(props);
    console.log(selectedDate);
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
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue={selectedDate}
                    className={classes.textField}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box m={2} p={1}>
                    <TextField
                        id="standard-number"
                        label="Number of Days"
                        type="number"
                        defaultValue={days}
                        onChange={(e) => setDays(e.target.value)}
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
                        defaultValue={freq}
                        onChange={(e) => setFrq(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box m={2} p={1}>
                    <Button onClick={handleSend} variant="contained" size="medium" color="primary">Send!</Button>
                </Box>
            </Popover>
        </div>
    );
}