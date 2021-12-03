import React from 'react'
import { Form, Modal } from "react-bootstrap";
import './Schedule.css';
import { Row, Col, Button } from 'reactstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MainMap from './MainMap';
import './styles.css';

import Container from 'react-bootstrap/Container';
import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar} from 'recharts';
import CountUp from 'react-countup';
import MaterialTable from "material-table";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class SchedulerTool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getData = this.getData.bind(this);
    }

    afterStateUpdate = () => {
        var test = this.state;
        debugger;
    }

    async componentDidMount() {
        var response = await this.GetAllSuperUserInformation();
        var xAxis = this.GetRenderedDates();
        function MakeDataSource(value, index, array) {
            return {"name": xAxis[index], "value": response.requiredResourcesPerDay[index]};
        };
        var initialStateGraph = Array(12).fill();
        initialStateGraph = initialStateGraph.map(MakeDataSource);
        this.setState({numberOfSchedulingUsers: response.numberOfSchedulingUsers, 
            totalKmTravelledForTheNextDay: response.totalKmTravelledForTheNextDay, 
            totalMinutesTravelledForTheNextDay: response.totalMinutesTravelledForTheNextDay, 
            requiredResourcesPerDay: initialStateGraph,
            bookingAssignmentsFirstDay: response.bookingAssignments},
            this.afterStateUpdate);
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
            var r = result.bookingAssignments;
            debugger;
            return result;
    }

    GetRenderedDates = () => {
        var renderedDatesArray = Array(12).fill();
        function ForwardDate(value, index, array) {
            var elementRawDate = new Date(new Date().getTime() + index * 86400000);
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
            totalMinutesTravelledForTheNextDay: 0,
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
    var test = this.state.requiredResourcesPerDay;
    debugger;
    var dataSource = this.state.requiredResourcesPerDay;
        var numberOfSchedulingUsers = this.state.numberOfSchedulingUsers;
        var kmTotalTravelledNextDay = this.state.totalKmTravelledForTheNextDay;
        var hoursTotalTravelledNextDay = this.state.totalMinutesTravelledForTheNextDay;
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
                                    <Form.Label>Remaining hours of travel for the day</Form.Label>
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
                        <Row>
                            <Col>
                            Required vehicle resources for the upcoming days:
                            <BarChart width={730} height={250} data={dataSource}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                        <MaterialTable
                        icons={tableIcons}
                            columns={[
                                { title: "Logistic Resource Number", field: "resourceNumber" },
                                { title: "Start Time", field: "startTime" },
                                { title: "End Time", field: "endTime"},
                            ]}
                                data={this.state.bookingAssignmentsFirstDay}
                            title="Resource Assignments For Tomorrow"
                        />
                        </Col>
                        </Row>
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