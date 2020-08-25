import React, { Component } from 'react';
import '../../../css/Hire.css';

import moment from 'moment';
import config from '../../../../client-configs';
import { storage } from "../../../../firebase";
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import TagChip from '../../../component/TagChip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import Popup from './HirePopup';

class Hire extends Component {
    constructor(props) {
        super(props);
        const { hireData } = this.props;
        this.state = {
            open : false,

            title : hireData.title || "",
            content : hireData.content || "",
            files : hireData.files || [],
            boardTag : hireData.boardTag || [],
            startDate : hireData.startDate || "",
            endDate : hireData.endDate || "",
            field : hireData.field || "",

            titleErr : false,
            startDateErr : false,
            endDateErr : false,

            imageLoad : false,
            imageView : false,
            preview : "",
        }
    }

    async addHire() {
        const { title, content, files, boardTag, startDate, endDate, field,
            titleErr, startDateErr, endDateErr
        } = this.state;
        const { userId, hireSet } = this.props;

        if(!title) { alert("제목을 입력해주세요."); }

        if(titleErr || startDateErr || endDateErr) {
            alert("잘못된 내용이 있습니다. 다시 확인해주세요.");
            return;
        }
        
        try {
            const result = await axios.post(`${config.app.s_url}/hireBoards/create`, {
                title,
                content,
                files,
                boardTag,
                startDate,
                endDate,
                field,
                userId,
            });
            if(result.data) {
                hireSet({ title, content, files, boardTag, startDate, endDate, field, userId })
            } else {
                alert("채용 공고 생성 도중 에러가 발생했습니다. 다시 시도해주세요.");
                return;
            }
            this.stateNull();
        } catch(err) {
            console.log("hire add / updat err : ");
        }
    }

    async updatHire() {
        const { title, content, files, boardTag, startDate, endDate, field,
            titleErr, startDateErr, endDateErr
        } = this.state;
        const { userId, hireSet } = this.props;
        if(!title) { alert("제목을 입력해주세요."); }
        if(titleErr || startDateErr || endDateErr) {
            alert("잘못된 내용이 있습니다. 다시 확인해주세요.");
            return;
        }
        try {
            const result = await axios.put(`${config.app.s_url}/hireBoards/update`, {
                title,
                content,
                files,
                boardTag,
                startDate,
                endDate,
                field,
                userId,
            });
            if(result.data) {
                hireSet({ title, content, files, boardTag, startDate, endDate, field, userId })
            } else {
                alert("채용 공고 수정 도중 에러가 발생했습니다. 다시 시도해주세요.");
                return;
            }
            this.stateNull();
            } catch(err) {
            console.log("hire add / updat err : ");
        }
    }

    async deletHire() {
        const confirm = window.confirm("채용 공고를 삭제하시겠습니까?");
        if(!confirm) return;
        const { userId, hireSet } = this.props;
        try {
            const result = await axios.delete(`${config.app.s_url}/hireBoards/delete?userId=${userId}`);
            if(result.data) {
                alert("채용 공고가 삭제되었습니다.");
                hireSet(null);
            } else {
                alert("채용 공고 삭제 도중 에러가 발생했습니다. 다시 시도해주세요.");
                return;
            }
        } catch(err) {
            console.log("delete hire err : ");
        }
    }

    // 생성 팝업 열기
    create() { this.setState({ open : { view : true, create : true } }); }

    // 스태이트 값 초기화
    stateNull() {
        this.setState({
            open : false,
            title : "",
            content : "",
            files : [],
            boardTag : [],
            startDate : "",
            endDate : "",
            field : "",
            titleErr : false,
            startDateErr : false,
            endDateErr : false,
        });
    }
    
    // 수정을 위한 공고 클릭 시
    clickHire(data) {
        this.setState({
            open : { view : true, create : false },
            title : data.title,
            content : data.content,
            files : data.files,
            boardTag : data.boardTag,
            startDate : data.startDate,
            endDate : data.endDate,
            field : data.field,
            titleErr : false,
            startDateErr : false,
            endDateErr : false,
        });
    }

    // 태그 관련
    tagConcat(data) { this.setState({ boardTag : this.state.boardTag.concat(data) }); }
    tagFilter(data) { this.setState({ boardTag : this.state.boardTag.filter(value => { return value !== data }) }); }

    // 이미지 추가하기 -> 배열로 제이슨 형식으로 추가 -> 필요한 값은 데이터
    addImage(event) {
        if(event.target.files[0]) {
            const { userEmail } = this.props;
            let image = event.target.files[0];
            this.setState({ imageLoad : true });
            const uploadTask = storage.ref(`/portfolio/${userEmail}/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                null, null, () => {
                    storage
                    .ref(`portfolio/${userEmail}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then(async url => {
                        console.log("image upload !!")
                        await this.setState({ files : 
                            this.state.files.concat({
                                data : url,
                                preview : URL.createObjectURL(image),
                                name : image.name,
                            }) 
                        }, () => this.setState({ imageLoad : false }));
                    })
                }
            )
        }
    }

    // 추가한 이미지 삭제하기
    deleteImage(event) {
        this.setState({
            files : this.state.files.filter(data => {
                return event !== data.preview
            })
        })
    }

    render() {
        const { loginState, hireData } = this.props;
        const { open, title, content, files, boardTag, startDate, endDate, field,
            titleErr, startDateErr, endDateErr, imageLoad, imageView, preview
        } = this.state;
        return (
            <div className="hire-main">
                <div className="hire-margin">
                    {/* 공고 생성 */}
                    { loginState && !hireData && <div className="hire-title" onClick={this.create.bind(this)}>채용 공고 생성</div> }

                    {/* 이미지 띄워 보기 */}
                    {
                        imageView && <div className="hire-img-box" onClick={() => this.setState({ imageView : false })}>
                            <div className="hire-img">
                                <img alt="img" className="hire-img-pre" src={preview}></img>
                            </div>
                        </div>
                    }

                    {/* 팝업 오픈 */}
                    {
                        open.view && <Popup 
                            open={open}
                            title={title}
                            content={content}
                            files={files}
                            boardTag={boardTag}
                            startDate={startDate}
                            endDate={endDate}
                            field={field}
                            component={this}
                            titleErr={titleErr} 
                            startDateErr={startDateErr} 
                            endDateErr={endDateErr} 
                            imageLoad={imageLoad}
                            textBtn={open.create ? "생성" : "수정"}
                            addHire={this.addHire.bind(this)}
                            updatHire={this.updatHire.bind(this)}
                            stateNull={this.stateNull.bind(this)}
                            tagConcat={this.tagConcat.bind(this)}
                            tagFilter={this.tagFilter.bind(this)}
                            addImage={this.addImage.bind(this)}
                            deleteImage={this.deleteImage.bind(this)}
                        />
                    }

                    {/* 공고문 보기 */}
                    <div className="hire-content">
                        {
                            hireData ? 
                            <div className="hire-box">
                                <div className="hire-box-title">
                                    <div>{hireData.title}</div>
                                    {
                                        loginState &&
                                        <div>
                                            <EditOutlinedIcon onClick={this.clickHire.bind(this, hireData)} style={{marginRight:"5px", cursor:"pointer"}} />
                                            <DeleteForeverOutlinedIcon onClick={this.deletHire.bind(this)} style={{cursor:"pointer"}} />
                                        </div>
                                    }
                                </div>
                                <div className="hire-box-date">공고 날짜:{" " + (hireData.startDate ? moment(hireData.startDate).format("YYYY-MM-DD") + " ~ " : "") + (hireData.endDate ? moment(hireData.endDate).format("YYYY-MM-DD") + "까지" : "상시")}</div>
                                <pre className="hire-box-content">{hireData.content || "입력된 내용이 없습니다."}</pre>
                                <div className="hire-box-field">채용분야:{" " + (hireData.field || "없음")}</div>
                                {
                                    hireData.boardTag && hireData.boardTag[0] &&
                                    <div className="hire-box-tag">태그:
                                        {
                                             hireData.boardTag.map((data,i) => {
                                                 return <TagChip name={data} key={i} />
                                             })
                                        }
                                    </div>
                                }
                                <div>
                                <div className="portfolio-idx-right">
                                    <div className="portfolio-idx-imageArr">
                                        {
                                            hireData.files && hireData.files.map((data,i) => {
                                                return <Avatar onClick={() => this.setState({ imageView : true, preview : data.data })} variant="rounded" key={i} alt="Remy Sharp" src={data.data} 
                                                    style={{
                                                        border:"1px solid rgba(156, 156, 156, 0.664)",
                                                        margin:"5px",height:"70px",width:"70px",cursor:"pointer"
                                                    }} 
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                                </div>
                            </div>
                            :
                            <div className="hire-center">
                                {
                                    loginState ? 
                                    <div className="hire-center-guide">
                                        채용 공고를 등록하여 구직자들에게 공개하세요! <br></br>
                                        좌측 상단에 채용공고 생성을 클릭하여 공고를 등록할 수 있습니다! <br></br>
                                        <span style={{color:"red"}}>최대 하나의 채용공고</span>만 생성 가능합니다!
                                    </div>
                                    :
                                    <div className="hire-center-guide">
                                        아직 등록된 공고가 없습니다.
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Hire;