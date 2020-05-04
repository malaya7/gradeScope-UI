import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { LineChart, ColumnChart } from 'react-chartkick';
import 'chart.js'

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
    const [graph, setgraph] = React.useState(null);

  
    const handleClick = (event) => {
        handleSend();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSend = async (e) => {
        const info = props.courseInfo.Link;
        const url = `${API_URLS.base}/show/${info}`;
        //const ids = info.split('/');

        const res = await fetch(url, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (res.status !== 200) {
            alert("Server Error, Please Try Again later!");
            return;
        }
        const d = await res.json()
        console.log(d)
        setgraph(API_URLS.buildGraph(d))
    }
    //console.log(props);
    console.log(graph)
    return (
        <div>
            <Button aria-describedby={id} size="small" variant="text" color="secondary" onClick={handleClick}>
                Show
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
           /*      style={{
                    height: '900px',
                    width: '750px'
                }} */
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                {graph ? <ColumnChart width="600px" height="500px" data={graph} download={true} /> :
                    <React.Fragment>
                        <Box m={2} p={1}>
                            <div>Hello </div>
                        </Box>
                    </React.Fragment>
                }
            </Popover>
        </div>
    );
}