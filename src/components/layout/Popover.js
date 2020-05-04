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
    MuiPaper: {
        width: 300,
        height: 250,
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDateEND, setSelectedDateEND] = React.useState(new Date());
    const [freq, setFrq] = React.useState(1);

    const [graph, setgraph] = React.useState(null);
    const [bucket, setBucket] = React.useState(5);
    const [days, setDays] = React.useState(3);

    /* const handleDateChange = (date) => {
          setSelectedDate(date);
      };
   */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSend = async (e) => {
        const freqInt = parseInt(freq)
        if (freqInt < 1) {
            alert("frequency should be a postive number!");
            return;
        }
        if (bucket < 1) {
            alert("Graph Buckets should be postive number! Recomended value: 5");
            return;
        }
        const isFuture = new Date(selectedDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
        if (process.env.NODE_ENV === 'production' && !isFuture) {
            alert("Please Select start date and time in Future!");
            return;
        }
        const isAfterStart =  new Date(selectedDateEND) > new Date(selectedDate);
        if (!isAfterStart) {
            alert("Please Select End date After the Start date!");
            return;
        }
        if (freqInt > 99) {
            alert("Freq cannot be more than a 100");
            return;
        }
        const url = `${API_URLS.base}/scrape`;

        const info = props.courseInfo.Link;
        const ids = info.split('/');

        const sstime = new Date(selectedDate).toISOString();
        const etime = new Date(selectedDateEND).toISOString();
        const res = await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stime: sstime,
                etime,
                cId: ids[2],
                aId: ids[4],
                freq: freqInt,
            })
        });
        if (res.status !== 200) {
            const tx = await res.text();
            alert("Server Error!\n"+ tx);
        } else {
            alert("Request Accepted -_-!");
        }
        /*  const d = await res.json()
         console.log(d)
         setgraph(API_URLS.buildGraph(d)) */
    }
    //console.log(props)

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
                }}>
                <React.Fragment>
                    <Box m={2} p={1}>
                        <TextField
                            id="datetime-local"
                            label="Start "
                            type="datetime-local"
                            defaultValue={selectedDate}
                            className={classes.textField}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <Box m={2} p={1}>
                        <TextField
                            id="datetime-local"
                            label="End"
                            type="datetime-local"
                            defaultValue={selectedDateEND}
                            className={classes.textField}
                            onChange={(e) => setSelectedDateEND(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box >
                    <Box m={3} p={1}>
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
                    {/* <Box m={2} p={1}>
                    <TextField
                        id="standard-number"
                        label="Graph Buckets"
                        type="number"
                        defaultValue={bucket}
                        onChange={(e) => setBucket(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box> */}
                    <Box m={2} p={1}>
                        <Button onClick={handleSend} variant="contained" size="medium" color="primary">Send!</Button>
                    </Box>
                </React.Fragment>

            </Popover>
        </div>
    );
}