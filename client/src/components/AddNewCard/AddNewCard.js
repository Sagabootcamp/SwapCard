import React, {Component} from "react";
import Webcam from 'react-webcam';

import Modal from "react-modal";
// import Capture from "../Webcam/Capture";
import WebcamCapture from "../WebcamCapture"
import "./AddNewCard.css"

class AddNewCard extends Component {
    state = {
        // selectWebcam: undefined,
        front:"",
        back: ""
    }
    setRef = (webcam) => {
        this.webcam = webcam;
      }
    // selectWebcam = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         selectWebcam: true
    //     })
    // }

    captureFront = (e) => {
        e.preventDefault();
        const imageFront = this.webcam.getScreenshot();
        this.setState({
          front: imageFront,
        })
      };

    captureBack = (e) => {
        e.preventDefault();        
        const imageBack = this.webcam.getScreenshot();
        this.setState({
            back: imageBack,
        })
    }; 
  

    render() {
        return(
            <Modal
                isOpen={!!this.props.selectAddNewCard}
                onRequestClose={this.props.unselectAddNewCard}
            >
                <div>
                    <h2>Take picture of front and back, input card details</h2>
                    <hr />
                    <form>
                        <div className="row">
                            <div className="col-lg-2">
                                <input type="text" className="form-group"  placeholder="Store name" required/>
                            </div>
                            <div className="col-lg-2">
                                <input type="text" className="form-group"  placeholder="Price" required/>
                            </div>
                            <div className="col-lg-2">
                                <input type="text" className="form-group"  placeholder="Exp date" required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <Webcam
                                    audio={false}
                                    height={350}
                                    ref={this.setRef}
                                    screenshotFormat="image/jpeg"
                                    width={350}
                                />
                            </div>

                            <div className="cardImage col-lg-3">
                                <button onClick={this.captureFront}>Capture front of Card</button>
                                <br />
                                <img src={this.state.front} alt=""/>
                            </div>

                            <div className="cardImage col-lg-3">
                                <button onClick={this.captureBack}>Capture back of Card</button>
                                <br />
                                <img src={this.state.back} alt=""/>
                            </div>
                        </div>
                
                        {this.state.front && this.state.back ? (
                            <button type="submit">Submit</button>
                        ): <p>Please capture both front and back of card</p>}
                        <button onClick={this.props.unselectAddNewCard}>Cancel</button>
                    </form>
                </div>
                <WebcamCapture selectWebcam={this.state.selectWebcam} front={this.state.front} />
            </Modal>
        )
    }
}

export default AddNewCard;