import React from 'react'
import { Form, Modal } from "react-bootstrap";
import './Schedule.css';
import { Row, Col, Button } from 'reactstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MainMap from './MainMap';
import './styles.css';

//Required Libraries for this component - remove all else
import Container from 'react-bootstrap/Container';
import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CountUp from 'react-countup';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class SchedulerTool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        debugger;
    }

    afterStateUpdate = () => {
        var test = this.state;
        debugger;
    }

    async componentDidMount() {
        var response = await this.GetAllSuperUserInformation();
        var test = response.graphDataPoints;
        debugger;
        this.setState({numberOfSchedulingUsers: response.numberOfSchedulingUsers});
        this.setState({totalKmTravelledForTheNextDay: response.totalKmTravelledForTheNextDay});
        this.setState({totalHoursTravelledForTheNextDay: response.totalHoursTravelledForTheNextDay});
        this.setState({graphDataPoints : response.graphDataPoints});
    }

    AddChangeCentralHub = async() => {
        var testData = {
            lat: this.state.lat,
            lon: this.state.lng
        }
        var response = await fetch("schedulerTool/ChangeCentralLocation", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token")  },
             body: JSON.stringify(testData)
        })
    }

    GetAllSuperUserInformation = async() => {
        var result = await fetch("schedulerTool/getInfo", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token")  }
        })
            .then((resp) => resp.json())
            .then((data) => data);
            debugger;
            return result;
    }

    GetRenderedDates = () => {
        var renderedDatesArray = Array(12).fill(new Date());
        function ForwardDate(value, index, array) {
            var forwardDate = new Date(value.getFullYear(), value.getMonth() + index , value.getDate());
            return monthNames[forwardDate.getMonth()] + " " + forwardDate.getFullYear();
        };
        renderedDatesArray = renderedDatesArray.map(ForwardDate);
        return renderedDatesArray;
    }

    getInitialState = () => {
        var xAxis = this.GetRenderedDates();
        function MakeDataSource(value, index, array) {
            return {date: xAxis[index], uv: 0};
        };
        var initialStateGraph = Array(12).fill();
        initialStateGraph = initialStateGraph.map(MakeDataSource);
        return {
            numberOfSchedulingUsers: 0,
            totalKmTravelledForTheNextDay: 0,
            totalHoursTravelledForTheNextDay: 0,
            graphDataPoints: initialStateGraph,
            lat: 0,
            lng: 0,
        };
    }

    getData(lati, lngi) {
        this.setState({ lat: lati });
        this.setState({ lng: lngi });
        console.log(this.state.lat, this.state.lng);
    }

    addPickupPoint = () => {
        this.setState({ isScheduleModalVisible: true });
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

    handleAddSchedule = async () => {
        const southAfricanTimeZoneOffset = 2;
        var inputDate = new Date(this.state.date);
        var inputTime = this.state.time;
        var year = inputDate.getFullYear();
        var month = inputDate.getMonth();
        var date = inputDate.getDate();
        var hour = parseInt(inputTime.substring(0, 2)) + southAfricanTimeZoneOffset;
        var minute = inputTime.substring(3, 5);
        var inputDateTime = new Date(year, month, date, hour, minute);
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
        var joinedObjList = this.state.scheduledItemsArray.concat(newObject);
        this.setState({ scheduledItemsArray: joinedObjList }, function () {
            this.postData();
        });
    }

    closeModal = () => {
        this.setState({ isScheduleModalVisible: false });
    }

    render() {
        var dataPoints = this.state.graphDataPoints;
        var xAxis = this.GetRenderedDates();
        function MakeDataSource(value, index, array) {
            return {date: xAxis[index], uv: dataPoints[index].numberOfResources};
        };
        var dataSource = Array(12).fill();
        dataSource = dataSource.map(MakeDataSource);
        var data = dataSource;
        var numberOfSchedulingUsers = this.state.numberOfSchedulingUsers;
        var kmTotalTravelledNextDay = this.state.totalKmTravelledForTheNextDay;
        var hoursTotalTravelledNextDay = this.state.totalHoursTravelledForTheNextDay;
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
                                //data={this.state.graphDataPoints}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
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
                    <h1 className="text-center">Add Central Logistics Hub</h1>
                    <h4 className="text-center"><i>Click on the map to select a central logistic hub</i></h4>
                    <div>
                        <Button className='m-1 btn' color="primary" onClick={this.AddChangeCentralHub}>Set Logistics Hub Location</Button>
                        <Button className='m-1 btn-primary' color="primary" onClick={this.closeModal}>Cancel</Button>
                        <MainMap sendData={this.getData}></MainMap>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default SchedulerTool;