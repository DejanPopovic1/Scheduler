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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar} from 'recharts';
import CountUp from 'react-countup';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class SchedulerTool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getData = this.getData.bind(this);
       // debugger;
    }

    afterStateUpdate = () => {
        var test = this.state;
        debugger;
    }

    async componentDidMount() {
        var response = await this.GetAllSuperUserInformation();
        // var test = response.requiredResourcesPerDay;
        // debugger;
        var xAxis = this.GetRenderedDates();
        function MakeDataSource(value, index, array) {
            return {"name": xAxis[index], "value": response[index]};
        };
        var initialStateGraph = Array(12).fill();
        initialStateGraph = initialStateGraph.map(MakeDataSource);
debugger;
       // var updatedRequiredResourcesPerDay = requiredResourcesPerDay.map();
        // function updateResource(value, index, array) {
        //     //var elementRawDate = new Date();
        //     var elementRawDate = new Date(new Date().getTime() + index * 86400000);
        //     //var elementStringDate = elementRawDate.getDate() + " " + (elementRawDate.getMonth() + 1);
        //     //return elementStringDate;
        //     var result = elementRawDate.getDate() + "/" + elementRawDate.getMonth();
        //     return result;
        // };
        this.setState({numberOfSchedulingUsers: response.numberOfSchedulingUsers, 
            totalKmTravelledForTheNextDay: response.totalKmTravelledForTheNextDay, 
            totalHoursTravelledForTheNextDay: response.totalHoursTravelledForTheNextDay, 
            requiredResourcesPerDay: initialStateGraph}, //requiredResourcesPerDay
            this.afterStateUpdate);
        // this.setState({totalKmTravelledForTheNextDay: response.totalKmTravelledForTheNextDay});
        // this.setState({totalHoursTravelledForTheNextDay: response.totalHoursTravelledForTheNextDay});
        // this.setState({requiredResourcesPerDay : response.requiredResourcesPerDay});
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
            //debugger;
            return result;
    }

    GetRenderedDates = () => {
        // var renderedDatesArray = Array(12).fill(new Date());
        // function ForwardDate(value, index, array) {
        //     var forwardDate = new Date(value.getFullYear(), value.getMonth() + index , value.getDate());
        //     return monthNames[forwardDate.getMonth()] + " " + forwardDate.getFullYear();
        // };
        // renderedDatesArray = renderedDatesArray.map(ForwardDate);
        // return renderedDatesArray;
        var renderedDatesArray = Array(12).fill();
        function ForwardDate(value, index, array) {
            //var elementRawDate = new Date();
            var elementRawDate = new Date(new Date().getTime() + index * 86400000);
            //var elementStringDate = elementRawDate.getDate() + " " + (elementRawDate.getMonth() + 1);
            //return elementStringDate;
            var result = elementRawDate.getDate() + "/" + elementRawDate.getMonth();
            return result;
        };
        renderedDatesArray = renderedDatesArray.map(ForwardDate);

        return renderedDatesArray;
    }

    getInitialState = () => {

        var xAxis = this.GetRenderedDates();
        function MakeDataSource(value, index, array) {
            return {"name": xAxis[index], "value": 1};
        };
        var initialStateGraph = Array(12).fill();
        initialStateGraph = initialStateGraph.map(MakeDataSource);
        debugger;
        return {
            numberOfSchedulingUsers: 0,
            totalKmTravelledForTheNextDay: 0,
            totalHoursTravelledForTheNextDay: 0,
            requiredResourcesPerDay: initialStateGraph,
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

    closeModal = () => {
        this.setState({ isScheduleModalVisible: false });
    }

    render() {
        var dataPoints = this.state.requiredResourcesPerDay;

        var xAxis = this.GetRenderedDates();
        debugger;
        // function MakeDataSource(value, index, array) {
        //     return {date: xAxis[index], uv: dataPoints[index].numberOfResources};
        // };
        //var dataSource = Array(12).fill();/////////////////////////////uncomment
        //dataSource = dataSource.map(MakeDataSource);
        
        //dataSource = [{date: "blah", uv: 5 }, {date: "blahhh", uv: 7 }, {date: "blahhhss", uv: 4 }, {date: "blahhhss", uv: 5 }, {date: "blahhhss", uv: 5 }];
    //     var dataSource = [
    //     {"name": xAxis[0], "value": this.state.requiredResourcesPerDay[0] }, 
    //     {"name": xAxis[1], "value": this.state.requiredResourcesPerDay[1] }, 
    //     {"name": xAxis[2], "value": this.state.requiredResourcesPerDay[2] }, 
    //     {"name": xAxis[3], "value": this.state.requiredResourcesPerDay[3] }, 
    //     {"name": xAxis[4], "value": this.state.requiredResourcesPerDay[4] }, 
    //     {"name": xAxis[5], "value": this.state.requiredResourcesPerDay[5] }, 
    //     {"name": xAxis[6], "value": this.state.requiredResourcesPerDay[6] }, 
    //     {"name": xAxis[7], "value": this.state.requiredResourcesPerDay[7] }, 
    //     {"name": xAxis[8], "value": this.state.requiredResourcesPerDay[8] }, 
    //     {"name": xAxis[9], "value": this.state.requiredResourcesPerDay[9] }, 
    //     {"name": xAxis[10], "value": this.state.requiredResourcesPerDay[10] }, 
    //     {"name": xAxis[11], "value": this.state.requiredResourcesPerDay[11] }
    // ];
    
    // var dataSource = [
    //     {"name": xAxis[0], "value": 1 }, 
    //     {"name": xAxis[1], "value": 5 }, 
    //     {"name": xAxis[2], "value": 5 }, 
    //     {"name": xAxis[3], "value": 5 }, 
    //     {"name": xAxis[4], "value": 2 }, 
    //     {"name": xAxis[5], "value": 4 }, 
    //     {"name": xAxis[6], "value": 3 }, 
    //     {"name": xAxis[7], "value": 7 }, 
    //     {"name": xAxis[8], "value": 6 }, 
    //     {"name": xAxis[9], "value": 8 }, 
    //     {"name": xAxis[10], "value": 8 }, 
    //     {"name": xAxis[11], "value": 4 }
    // ];

    var test = this.state.requiredResourcesPerDay;
    debugger;
    var dataSource = this.state.requiredResourcesPerDay;


        //var data = dataSource;
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
                        {/* <row>
                            <AreaChart
                                width={800}
                                height={400}
                                data={dataSource}
                                //data={this.state.graphDataPoints}
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
                                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                        </row> */}

                        <row>
                            <BarChart width={730} height={250} data={dataSource}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </row>






                        {/* <XAxis dataKey="date" /> */}
                        {/* dataKey="uv"  */}
                        <Row>
                            <p><button className="btn btn-primary btn-block" onClick={this.addPickupPoint}>Add central logistics location</button></p>
                        </Row>
                    </Container>
                </div>
                <Modal show={this.state.isScheduleModalVisible} contentClassName="custom-modal-style">
                    <h1 className="text-center">Add Central Logistics Hub</h1>
                    <h4 className="text-center"><i>Click on the map to select a central logistic hub</i></h4>
                    <div>Note: The pin provided will 'snap' to the nearest road in the map</div>
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