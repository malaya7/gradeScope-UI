import React from 'react';

import Button from '@material-ui/core/Button';
import API_URLS from '../../config/config';

export default function SelectedListItem(props) {

    const handleClick = async event => {
        const data = await handleSend();
        // console.log(data)
        if(!data) {
            alert("No Data available!")
            return;
        }
        const aname = props.courseInfo.Name;
        const cname = props.cname;

        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        const items = data.map(e => ({
            date: e.timestamp || 'NOTFOUND',
            minScore: e.min || 'NOTFOUND',
            maxScore: e.max || 'NOTFOUND',
            mean: e.mean || 'NOTFOUND',
            median: e.median || 'NOTFOUND',
            deviation: e.deviation || 'NOTFOUND',
            TotalSubmissions: e.data.length || 'NOTFOUND',
            coureId: e.coureId || 'NOTFOUND',
            assignmentID: e.assignmentID || 'NOTFOUND',
        }));
        const header = Object.keys(items[0]);

        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');

        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = `${cname}-${aname}.csv`;
        hiddenElement.click();
    };

    const handleSend = async () => {
        const info = props.courseInfo.Link;
        const url = `${API_URLS.base}/show/${info}`;

        const res = await fetch(url);
        if (res.status !== 200) {
            alert("Server Error, Please Try Again later!");
            return;
        }
        const d = await res.json();
        return d;
    }
    return (
        <Button size="large" color="primary" onClick={handleClick}>Stats</Button>
    );
}