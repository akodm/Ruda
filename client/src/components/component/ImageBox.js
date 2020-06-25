import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import '../css/ImageBox.css';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

export default function ImageBox(props) {

    // 이미지 업로드 할 시
    const onChangeImageValue = (event)=> {
        if(event.target.files[0]) {
            props.func({
                data : event.target.files[0],
                pre : URL.createObjectURL(event.target.files[0])
            })
        }
    }

    const classes = useStyles();
    return (
        <div className="ImageBox-main">
            <div className="ImageBox-imgSizeDiv">
                <Avatar alt="Cindy Baker" style={{boxShadow:"0px 1px 0.5px 0.5px gray"}} src={props.preview || ""} className={classes.large} />
            </div>
            <div className="ImageBox-fileDiv">
                <label htmlFor="avatafile">사진 {props.text}</label>
                <input accept="image/*" name="profileImg" onChange={onChangeImageValue} type="file" id="avatafile"></input>
            </div>
        </div>
    );
}