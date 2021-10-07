// <reference path="../jquery.validate-vsdoc.js" />


import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormGroup, Modal } from "react-bootstrap";
import './Schedule.css';
import { Row, Col, Button } from 'reactstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { Component, useEffect } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MainMap from './MainMap';
import './styles.css';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        //If the line below is not included, then getData wont bind to the state variables
        //Bind creates a new function that will force the this inside the function to be the parameter passed to bind().
        this.getData = this.getData.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
//
    componentDidUpdate = () => {
        var test = "test";
        var test2 = this.state.scheduledItemsArray;

    }

    componentDidMount = () => {
        this.fetchAndSetState();
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    rowClicked = () => {
        let selectedRows = this.gridApi.getSelectedRows();
    }

    onMatterGridCellFocused = () => {

    }

    onChangeDate = () => {
        var tst = document.getElementById("datePicker").value;
        debugger;
        this.setState({ date: document.getElementById("datePicker").value });
    }

    onChangeTime = () => {
         this.setState({ time: document.getElementById("timePicker").value });
    }

    onChangeScheduleName = () => {
        this.setState({ scheduleName: document.getElementById("scheduleName").value });
    }

    getInitialState = () => {
        var defaultDate = new Date();
        var defaultDateString = this.formatDate(defaultDate);
        return {
            //Form Data
            fetchedData: { Summary1: "hi1", Summary2: "hi2", Summary3: "hi3" },
            date: defaultDateString,
            time: "00:00",
            scheduleName: "",
            scheduledItemsArray: [
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Michaelz" },
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to John" },
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Mary" },
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Zed" },
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Craig" }
            ],
            //Control Information
            isScheduleModalVisible: false,
            //Child Data Passed Back
            lat: 0,
            lng: 0,
        };
    }

    getData(lati, lngi) {
        // do not forget to bind getData in constructor

        this.setState({ lat: lati });
        this.setState({ lng: lngi });
        console.log(this.state.lat, this.state.lng);

    }

    addPickupPoint = () => {
        this.setState({ isScheduleModalVisible: true });


        // var map = new google.maps.Map(document.getElementById("map"), {
        //   center: {lat: -34.397, lng: 150.644},
        //   zoom: 8
        // });
    }

    handleAddSchedule = async () => {
        //const {format} = require('date-fns');
        //var dateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
        //var test = this.state;
        var inputDate = new Date(this.state.date);
        var inputTime = this.state.time;
        //var date = this.state.date;
        //var time = this.state.time;
        var year = inputDate.getFullYear();
        var month = inputDate.getMonth();
        var date = inputDate.getDate();
        var hour = inputTime.substring(0,2);
        var minute = inputTime.substring(3, 5);
        //var dateTime = new Date(year, month);
        var inputDateTime = new Date(year, month, date, hour, minute);
        debugger;
        debugger;
        var postData = {pickupDate: inputDateTime, scheduleName: 1, location: 1};
        var response = await fetch("schedule/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        .then((resp) => resp.json())
            .then((data) => data);




    }

    addToItemArray = () => {
        var scheduledDate = new Date();
        scheduledDate = document.getElementById("datePicker").value;
        var scheduledItem = document.getElementById("scheduleName").value;
        var scheduledLat = this.state.lat;
        var scheduledLng = this.state.lng;
        var newObject = { scheduledDate, scheduledLat, scheduledLng, scheduledItem };


        ////this.setState({ scheduleName: document.getElementById("scheduleName").value });
        var joinedObjList = this.state.scheduledItemsArray.concat(newObject);
        this.setState({ scheduledItemsArray: joinedObjList }, function () {
            this.postData();
        });


        // var myObj = {scheduledItem: document.getElementById("scheduleName").value};
        // var joined = this.state.scheduledItemsArray.concat(newObject);
        // this.setState({scheduledItemsArray : joined});

        //this.postData();
    }

    closeModal = () => {
        this.setState({ isScheduleModalVisible: false });


        // var map = new google.maps.Map(document.getElementById("map"), {
        //   center: {lat: -34.397, lng: 150.644},
        //   zoom: 8
        // });
    }

    render() {
        return (
            <div>
                <div className="container mt-3 mb-3">
                    <h1>Schedule a Pickup</h1>
                    <form>
                        <Form.Group>
                            <Form.Label>Pickup Date</Form.Label>
                            <Form.Control
                                id="datePicker"
                                type="date"
                                onChange={this.onChangeDate}
                                value={this.state.date}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pickup Time</Form.Label>
                            <Form.Control
                                id="timePicker"
                                type="time"
                                onChange={this.onChangeTime}
                                value={this.state.time}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Schedule Name</Form.Label>
                            <Form.Control
                                id="scheduleName"
                                type="input"
                                onChange={this.onChangeScheduleName}
                                value={this.state.scheduleName}
                            />
                        </Form.Group>
                    </form>
                    <div className="row">
                        <div className="col-sm-3">
                            <p><button className="btn btn-primary btn-block" onClick={this.addPickupPoint}>Add Pickup Point</button></p>
                             {/* <p><button className="btn btn-secondary btn-block" onClick={this.addToItemArray}>Add Schedule</button></p>  */}
                            <p><button className="btn btn-secondary btn-block" onClick={this.handleAddSchedule}>Add Schedule</button></p>
                            <p><button className="btn btn-secondary btn-block">Edit Shedule</button></p>
                            <p><button className="btn btn-secondary btn-block">Delete Shedule</button></p>
                        </div>
                    </div>
                    <Row>
                        <Col sm="12">
                            <div className="ag-theme-alpine"
                                style={{
                                    boxSizing: "border-box",
                                    height: "475px",
                                    width: "100%"
                                }}>
                                <AgGridReact
                                    style={{ width: "100px" }}
                                    //containerStyle={{height: "200px"}}
                                    rowData={this.state.scheduledItemsArray}>
                                    <AgGridColumn field="scheduledDate" width={300}></AgGridColumn>
                                    <AgGridColumn field="scheduledItem" width={300}></AgGridColumn>
                                    <AgGridColumn field="scheduledLat" width={300}></AgGridColumn>
                                    <AgGridColumn field="scheduledLng" width={300}></AgGridColumn>


                                </AgGridReact>
                            </div>
                        </Col>
                    </Row>
                    {this.state.fetchedData.Summary1}
                </div>


                <Modal show={this.state.isScheduleModalVisible} contentClassName="custom-modal-style">
                    <h1 className="text-center">Add Pickup Point</h1>
                    <h4 className="text-center"><i>Click on the map to select a pickup point</i></h4>


                    <div>
                        <Button className='m-1 btn' color="primary" onClick={this.closeModal}>Confirm Pickup Point</Button>
                        <Button className='m-1 btn-primary' color="primary" onClick={this.closeModal}>Cancel</Button>
                        <MainMap sendData={this.getData}></MainMap>
                    </div>
                </Modal>





                {/* <ModalBoxRenderer
            isOpen={this.state.viewModalVisible}
          // onClose={this.onCloseViewCalculationModal}
           className="modal-lg"
           modalCancelButtonText="Close"
           showSavedButton="Save"
           modalTitle="Calculation"
          // onClickSaveChanges={this.onCloseViewCalculationModal.bind(this)}
          // onClickCancelChanges={this.onCloseViewCalculationModal.bind(this)}>
        
           //{this.showCalculationModal()}
           >
        </ModalBoxRenderer> */}
            </div>
        );
    }

    async fetchAndSetState() {
        const response = await fetch('my');
        const data = await response.text();
        //const data = await response.json();
        //var testing = data;
        //var obj = JSON.parse(data);
        //var testing2 = testing.parse(data);
        this.setState({ fetchedData: { Summary1: data } });

    }

    postDataTest() {
        fetch("schedule/getlist", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ description: "Some text here" })
            body: '{"myvar" : "testsss", "myvartwo": "testtsssssss" }'
        });
    }

    postData = () => {
        fetch("schedule/postSchedule", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ description: "Some text here" })
            body: JSON.stringify(this.state.scheduledItemsArray)
            //body: '{"myvar" : "testsss", "myvartwo": "testtsssssss" }'
        });
    }
}

export default Schedule;