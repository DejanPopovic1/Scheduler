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



    grid_onReady = async (params) => {
        //if (!params) return;
        //this.api = params;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;






        const updateData = (data) => {
            var dataSource = {
                rowCount: null,
                getRows: function (params) {
                    console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                    setTimeout(function () {
                        var rowsThisPage = data.slice(params.startRow, params.endRow);
                        var lastRow = -1;
                        if (data.length <= params.endRow) {
                            lastRow = data.length;
                        }
                        params.successCallback(rowsThisPage, lastRow);
                    }, 500);
                },
            };
            params.api.setDatasource(dataSource);
        };


        var response = await fetch("schedule/getList", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((resp) => resp.json())
            .then((data) => data);
        debugger;

        //fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        //    .then((resp) => resp.json())
        //    .then((data) => updateData(data));











        //this.initDataSource();
        //params.api.sizeColumnsToFit();
    }

    initDataSource = async () => {
        var dataSource = {
            rowCount: null,
            getRows: async function (params) {
                var response = await this.fetchSchedule();
                var rowsThisPage = response;
                await params.successCallback(rowsThisPage, 10);
            }
        };
        this.gridApi.setDatasource(dataSource);




        //var returnedData = await this.fetchSchedule();
        //debugger;
    }

    getInitialState = () => {
        var defaultDate = new Date();
        var defaultDateString = this.formatDate(defaultDate);
        return {
            //Form Data
            columnDefs: [{ headerName: "Scheduled Item", width: 250, field: "scheduleName" }, { headerName: "Scheduled Date", width: 250, field: "x" }, { headerName: "Scheduled Time", width: 250, field: "x" }, { headerName: "Scheduled Location", width: 250, field: "x" }, { headerName: "", width: 130, cellRenderer: "scheduleListActionRenderer"}],

            //columnDefs: [
            //    {
            //        headerName: 'ID',
            //        maxWidth: 100,
            //        valueGetter: 'node.id',
            //        cellRenderer: 'loadingRenderer',
            //    },
            //    {
            //        field: 'scheduleName',
            //        minWidth: 150,
            //    },
            //    { field: 'age' },
            //    {
            //        field: 'scheduleName',
            //        minWidth: 150,
            //    },
            //    { field: 'year' },
            //    {
            //        field: 'date',
            //        minWidth: 150,
            //    },
            //    {
            //        field: 'sport',
            //        minWidth: 150,
            //    },
            //    { field: 'gold' },
            //    { field: 'silver' },
            //    { field: 'bronze' },
            //    { field: 'total' },
            //],


            fetchedData: { Summary1: "hi1", Summary2: "hi2", Summary3: "hi3" },
            date: defaultDateString,
            time: "00:00",
            scheduleName: "",
            scheduledItemsArray: [
                { scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Michaelz" },
                //{ scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to John" },
                //{ scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Mary" },
                //{ scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Zed" },
                //{ scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Craig" }
            ],
            //Control Information
            isScheduleModalVisible: false,
            //Child Data Passed Back
            lat: 0,
            lng: 0,
            frameworkComponents: {
                scheduleListActionRenderer: class ScheduleListActionRenderer extends Component {
                    constructor(props) {
                        super(props);
                    }

                    delete_OnClick = (e) => {
                        //e.preventDefault();
                        //const data = this.props.data;
                        //reportService.sendMilestoneReport([data.id]).then(() => {
                        //    NotificationManager.info('Milestone Report Sent', 'Info');
                        //});
                    }

                    render() {
                        const data = this.props.data;
                        return (
                            <>
                                <Button className="mr-2" outline color="primary" id="buttonSize" size="sm" onClick={this.delete_OnClick}>Delete</Button>
                            </>
                        );
                    }
                }
            },



            //defaultColDef: {
            //    flex: 1,
            //    resizable: true,
            //    minWidth: 100,
            //},
            //components: {
            //    loadingRenderer: function (params) {
            //        if (params.value !== undefined) {
            //            return params.value;
            //        } else {
            //            return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            //        }
            //    },
            //},
            //rowBuffer: 0,
            //rowSelection: 'multiple',
            //rowModelType: 'infinite',
            //paginationPageSize: 100,
            //cacheOverflowSize: 2,
            //maxConcurrentDatasourceRequests: 1,
            //infiniteInitialRowCount: 1000,
            //maxBlocksInCache: 10,









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

    fetchSchedule = async () => {
        debugger;
        var response = await fetch("schedule/getList", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((resp) => resp.json())
            .then((data) => data);
        debugger;
        return response;
    }

    //This needs to be refactored out
    handleAddSchedule = async () => {
        const southAfricanTimeZoneOffset = 2;
        var inputDate = new Date(this.state.date);
        var inputTime = this.state.time;
        var year = inputDate.getFullYear();
        var month = inputDate.getMonth();
        var date = inputDate.getDate();
        var hour = parseInt(inputTime.substring(0,2)) + southAfricanTimeZoneOffset;
        var minute = inputTime.substring(3, 5);
        //var dateTime = new Date(year, month);
        var inputDateTime = new Date(year, month, date, hour, minute);
        //convertTZ(inputDateTime, "Africa/Pretoria";
        debugger;
        var test1 = this.state.lat;
        var test2 = this.state.lon;
        debugger;
        var postData = { pickupDate: inputDateTime, scheduleName: this.state.scheduleName, location: { lat: this.state.lat, lon: this.state.lng } };
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
                                    columnDefs={this.state.columnDefs}
                                    //containerStyle={{ height: "200px" }}
                                    rowData={this.state.scheduledItemsArray}
                                    frameworkComponents={this.state.frameworkComponents}
                                    onGridReady={this.grid_onReady}





                                />
                                {/*columnDefs={this.state.columnDefs}*/}
                                {/*defaultColDef={this.state.defaultColDef}*/}
                                {/*components={this.state.components}*/}
                                {/*rowBuffer={this.state.rowBuffer}*/}
                                {/*rowSelection={this.state.rowSelection}*/}
                                {/*rowModelType={this.state.rowModelType}*/}
                                {/*paginationPageSize={this.state.paginationPageSize}*/}
                                {/*cacheOverflowSize={this.state.cacheOverflowSize}*/}
                                {/*maxConcurrentDatasourceRequests={*/}
                                {/*    this.state.maxConcurrentDatasourceRequests*/}
                                {/*}*/}
                                {/*infiniteInitialRowCount={this.state.infiniteInitialRowCount}*/}
                                {/*maxBlocksInCache={this.state.maxBlocksInCache}*/}
                                {/*onGridReady={this.onGridReady}*/}




                                {/*</AgGridReact>*/}
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
        debugger;
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