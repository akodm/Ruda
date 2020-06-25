import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

export default function MainPartnerItem(props) {
    const classes = useStyles();

    return (
        <div className="Main-new-bottomItemDiv">
            <Avatar alt="Cindy Baker" style={{boxShadow:"0px 1px 0.5px 0.5px gray"}} src={props.src} className={classes.large} />
            <span className="Main-new-bottomItemTitle">{props.title}</span>
            <span className="Main-new-bottomItemSpan">{props.span}</span>
        </div>
    );
}