import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';

import Grid from '@material-ui/core/Grid';

import API_URLS from '../../config/config';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function SelectedListItem(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        handleClick(index);
    };
    const handleClick = async (i) => {
        const courseId = props.data[i].link;
        const url = `${API_URLS.base}${courseId}/assignments`;
        const res = await fetch(url);
        if (res.status !== 200) {
            alert("Failed to fetch Assignments!")
        } else {
            const hwArray = await res.json();
            props.updateHW(hwArray);
        }

    }
    /* console.log(props)
    console.log(selectedIndex) */
    return (
        <div className={classes.root}>
            <List component="nav"  aria-label="main mailbox folders">
                <Grid container wrap="nowrap" spacing={3} >
                    {
                        props.data.map((e, i) =>
                            (<React.Fragment key={i}>
                                <ListItem 
                                    button
                                    selected={selectedIndex === i}
                                    onClick={(event) => handleListItemClick(event, i)}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={e.name} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>)
                        )
                    }
                </Grid>
            </List>
        </div>
    );
}