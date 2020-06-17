import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import configs from '../../../../../../client-configs';
class RookieMainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChangeMain: true,
            inputvalue : "",
        
            profileIMG:"",

            tag : "",
            tags : [],
            tagListState : false,
            tagList : [],

            data : this.props.user,
        }
    }


      // 칩 추가를 위해 엔터 클릭 시
      onEnterTags(e) {
        if(e.key === "Enter") {
            if(this.state.tags.length > 9) {
                alert("태크는 최대 10개 까지만 가능합니다.");
                return;
            }
            const { tag } = this.state;
            this.setState({ tags : this.state.tags.concat(tag), tag : "" })
        }
    }

    //  태그 인풋 스태이트 변경하게 하는 함수
    async onChangeValueTag(e) {
        await this.setState({
            [e.target.name] : e.target.value
        });
        let searchResult = configs.app.tagList.filter(data => {
            return data.toLowerCase().match(this.state.tag.toLowerCase()) && this.state.tag && data;
        })
        // 값이 하나라도 있다면
        if(searchResult[0]) {
            this.handleClick();
            this.setState({ tagList : searchResult, tagListState : true });
        } else {
            this.setState({ tagListState : false });
        }
    }

    // 함수 호출 시 현재 팝업 상태 확인 후 띄워져 있다면, 이벤트 리스너를 지우고 팝업 내리기.
    handleClick = () => {
        if (!this.state.tagListState) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.setState({ tagListState : false });
        }
    }

    // ref 확인 후 클릭 한 곳이 ref 를 포함한 엘리먼트인 경우 리턴, 아닌 경우 함수 호출
    handleOutsideClick = (e) => {
        if (this.tagNode && this.tagNode.contains(e.target)) {
            return;
        }
        this.handleClick();
    }

    // 칩 삭제 할 시
    onTagsDelete(e) {
        this.setState({ tags : this.state.tags.filter(data => { return e !== data}) })
    }
    addTags() {
        this.setState({
            tags : this.state.tags.concat(this.state.inputvalue),
        })
    }
    changeValue(e) {
        this.setState({
            inputvalue : e.target.value,
        })
    }
    MainSave(){
        this.props.Mainchanges(true)
    }
   // 이미지 업로드 할 시
    onChangeImageValue = (event)=> {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
            this.setState({
                file : file,
                previewURL : reader.result,    
            })
        }
        reader.readAsDataURL(file);
    }
    render() {
        const {profileImg,tags,keywords,tag,traning,tagList,tagListState}=this.setState;

        const {user} = this.props;
        const usertags = user.userTags;
        const usertag = usertags.map(function(str,i){
            return <div className="chip-margin" key={i}>
                <Chip label={"#"+str} size="small" color="primary" variant="outlined" />
            </div>;
        });
        
        return (
            <div>
                <div className="RookieMain-title">
                    <span className="RookieMain-title-text">저는 이런 사람이에요</span>
                    <span className="RookieMain-relayout" onClick={this.MainSave.bind(this)}>[저장]</span>
                </div>
                <div className="RookieMain-user">
                        <div className="userInfo-imgSizeDiv">
                            <img width="100" className="userInfo-img" src={user.userImageUrl} alt="IMG"></img>
                        </div>
                        <div className="RookieMain-fileDiv">
                            <label htmlFor="avatafile">사진 업로드</label>
                            <input accept="image/*" name="profileImg" value={profileImg ? profileImg : ""} onChange={this.onChangeImageValue.bind(this)} type="file" id="avatafile"></input>
                        </div>
                    <span className="RookieMain-user-name">{user.userName}</span>
                    <span>나를 소개해보세요!</span>
                    <div className="RookieMain-user-text">
                        <input onChange={(e) => console.log(e.target.value)} type="text" value={user.userIntro}></input><button>등록</button>
                    </div>
                    
                </div>
                <div className="line"></div>
                <div className="RookieMain-user-tag-content">
                        <div className="userInfo-margin">
                            <div className="userInfo-comentDiv">
                                <span className="userInfo-coment">태그 검색</span>
                            </div>
                            <input placeholder="검색 또는 리스트에서 선택하여 주세요. 최대 10개까지 가능합니다." type="text" value={tag} name="tag" onKeyPress={this.onEnterTags.bind(this)} onChange={this.onChangeValueTag.bind(this)} className="userInfo-tagInput"></input>
                            { tagListState && <div className="userInfo-tagList" ref={tagNode => { this.tagNode = tagNode }}>
                                {
                                    tagList && tagList.map((data,i) => {
                                        return <div key={i} className="tag-list-div" onClick={() => this.setState({ tags : this.state.tags.concat(data), tagListState : false, tag : "" })}>
                                            {data}
                                        </div>
                                    })
                                }
                            </div>}
                            <div className="userInfo-comentDiv">
                                <span className="userInfo-coment">선택한 태그</span>
                            </div>
                            <div className="userInfo-tagBox">
                                <div className="userInfo-tagMargin">
                                {usertag}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default RookieMainForm;