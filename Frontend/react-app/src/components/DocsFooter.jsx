import "../styles/DocsFooter.css";
import PreviousIcon from "../assets/previousarrow.svg";
import NextIcon from "../assets/nextarrow.svg";

function DocsFooter() {
    return (
        <>
            <div className="DocsFooterLeft">
                <div className="DocsFooterLeftText">
                    <img className="DocsFooterLeftTextImg" src={PreviousIcon}></img>Previous
                </div>
                <hr className="DocsFooterLefthr"></hr>
                <div className="DocsFooterLefttopic">abtoken</div>
            </div>
            <div className="DocsFooterRight">
                <div className="DocsFooterRightText">
                    Next<img className="DocsFooterRightTextImg"src={NextIcon}></img>
                </div>
                <hr className="DocsFooterRighthr"></hr>
                <div className="DocsFooterRighttopic">batoken</div>
            </div>
        </>
    );
}

export default DocsFooter;
