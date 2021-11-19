//import React from 'react';

//function SchedulerTool() {
//    debugger;
//    return (
//        <div>
//            <h1>
//                Scheduler Tool
//            </h1>
//        </div>
//    );
//}

//export default SchedulerTool;

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

//Required Libraries for this component - remove all else
import Container from 'react-bootstrap/Container';
import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

class SchedulerTool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getData = this.getData.bind(this);
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
        this.setState({ date: document.getElementById("datePicker").value });
    }

    onChangeTime = () => {
        this.setState({ time: document.getElementById("timePicker").value });
    }

    onChangeScheduleName = () => {
        this.setState({ scheduleName: document.getElementById("scheduleName").value });
    }

    //https://www.ag-grid.com/react-data-grid/infinite-scrolling/
    grid_onReady = async (x) => {
        //Test token authorization by passing a garbage token
        //To test, uncomment the line below and the next debugger
        //localStorage.setItem('token', JSON.stringify("GarbageToken"));
        var response = await fetch("schedule/getList", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") }
        })
            .then((resp) => resp.json())
            .then((data) => data);
        this.gridApi = x.api;
        //debugger;

        var dataSource = {
            getRows: async function (x) {
                var response = await fetch("schedule/getList", {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") }
                })
                    .then((resp) => resp.json())
                    .then((data) => (data));
                //await x.successCallback(rowsThisPage, 50);
                await x.successCallback(response, Object.keys(response).length);
            }
        };
        this.gridApi.setDatasource(dataSource);
    }

    getInitialState = () => {
        var defaultDate = new Date();
        var defaultDateString = this.formatDate(defaultDate);
        return {
            getRowNodeId: function (item) {
                return item.id;
            },
            //Form Data
            columnDefs: [{ headerName: "Scheduled Item", width: 250, field: "scheduleName" }, { headerName: "Scheduled Date & Time", width: 250, field: "pickupDate", valueFormatter: DateTimeFormat }, { headerName: "Scheduled Location Latitude", width: 250, field: "location.lat" }, { headerName: "Scheduled Location Longitude", width: 250, field: "location.lon" }, { headerName: "", width: 130, cellRenderer: "scheduleListActionRenderer" }],
            date: defaultDateString,
            time: "00:00",
            scheduleName: "",
            //Control Information
            isScheduleModalVisible: false,
            //Child Data Passed Back
            lat: 0,
            lng: 0,
            //getRowNodeId: function (item) {
            //    var test = item.id;
            //    debugger;
            //    return item.id;
            //},
            frameworkComponents: {
                scheduleListActionRenderer: class ScheduleListActionRenderer extends Component {
                    constructor(props) {
                        super(props);
                        this.deleteCell_OnClick = this.delete_OnClick.bind(this);
                    }

                    delete_OnClick = async (e) => {
                        e.preventDefault();
                        const clickedId = this.props.data.id;
                        await fetch("schedule/deleteItem", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") },
                            body: JSON.stringify(clickedId)
                        })
                        window.location.reload(false);
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
        var response = await fetch("schedule/getList", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") }
        })
            .then((resp) => resp.json())
            .then((data) => data);
        return response;
    }

    //This needs to be refactored out
    handleAddSchedule = async () => {
        //======================================
        //var test = "1";
        //var test2 = await fetch("schedule/deleteItem", {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    body: JSON.stringify(test)
        //})
        //    .then((resp) => resp.json())
        //    .then((data) => data);
        ////======================================
        const southAfricanTimeZoneOffset = 2;
        var inputDate = new Date(this.state.date);
        var inputTime = this.state.time;
        var year = inputDate.getFullYear();
        var month = inputDate.getMonth();
        var date = inputDate.getDate();
        var hour = parseInt(inputTime.substring(0, 2)) + southAfricanTimeZoneOffset;
        var minute = inputTime.substring(3, 5);
        //var dateTime = new Date(year, month);
        var inputDateTime = new Date(year, month, date, hour, minute);
        //inputDateTime = new Date(2000, 2, 2, 3, 3);
        //convertTZ(inputDateTime, "Africa/Pretoria";
        var test1 = this.state.lat;
        var test2 = this.state.lon;
        var postData = { pickupDate: inputDateTime, scheduleName: this.state.scheduleName, location: { lat: this.state.lat, lon: this.state.lng }, Id: 3 };
        var response = await fetch("schedule/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") },
            body: JSON.stringify(postData)
        })
        window.location.reload(false);
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
    }

    render() {
        var numberOfSchedulingUsers = 4;
        var kmTotalTravelledNextDay = 20000;
        var hoursTotalTravelledNextDay = 342;
        return (
            <div>
                <div className="container mt-3 mb-3">
                    <h1>Scheduler Tool</h1>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Number of scheduling users</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <div style={{ display: "inline-block" }}>
                                    <h1>
                                        <CountUp duration={0.5} end={ numberOfSchedulingUsers }/>
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Total Km travelled for the next day</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <div style={{ display: "inline-block" }}>
                                    <h1>
                                        <CountUp duration={0.5} end={kmTotalTravelledNextDay} delay={0.5} />
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Total Hours travelled for the next day</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <div style={{ display: "inline-block" }}>
                                    <h1>
                                        <CountUp duration={0.5} end={hoursTotalTravelledNextDay} delay={1}/>
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                        <row>
                            <AreaChart
                                width={800}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                        </row>
                        <Row>
                            <p><button className="btn btn-primary btn-block" onClick={this.addPickupPoint}>Add central logistics location</button></p>
                        </Row>
                    </Container>
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
            </div>
        );
    }

    grid_onColumnResized() {
        if (!this.gridApi) return;
        this.gridApi.resetRowHeights();
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

export function DateTimeFormat(params) {
    var date = new Date(Date.parse(params.value));
    var fullYear = date.getFullYear();
    var fullMonth = date.getMonth() + 1;
    var fullDay = date.getDate();
    var fullHour = date.getHours();
    var fullMinute = date.getMinutes();
    var fullSecond = date.getSeconds();

    if (fullYear < 10) {
        fullYear = "0" + fullYear;
    };
    if (fullMonth < 10) {
        fullMonth = "0" + fullMonth;
    };
    if (fullDay < 10) {
        fullDay = "0" + fullDay;
    };
    if (fullHour < 10) {
        fullHour = "0" + fullHour;
    };
    if (fullMinute < 10) {
        fullMinute = "0" + fullMinute;
    };
    if (fullSecond < 10) {
        fullSecond = "0" + fullSecond;
    };


    var newDate = fullYear + "-" + fullMonth + "-" + fullDay + " " + fullHour + ":" + fullMinute + ":" + fullSecond;
    if (params.value == null)
        return '';
    else
        return newDate;
}

export default SchedulerTool;