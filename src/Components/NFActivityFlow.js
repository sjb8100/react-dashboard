import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Button, Dropdown, Icon, message } from 'antd';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import moment from 'moment';
import { DatePicker } from 'antd';

import {queryActivityData} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFActivityFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
   
        this.state = { activityType: null }
      }

    handleTypeClick(e) {   
        this.setState({activityType: e.key})
    }
 
    queryClickAdd() {
        if (this.state.curDate == null)
        {
            message.error('Please input  date');
            return;
        }

        if (this.state.activityType == null)
        {
            message.error('Please input activityType or taskID');
            return;
        }

        queryActivityData(this.state.curDate, this.state.activityType);
    }


    onChange(date, dateString) {
        console.log(date, dateString);
        if (dateString != null && dateString != "")
        {
            this.setState({curDate: dateString})
        }
      }

  render() {

       // 数据源
    var totalActvityData;

    if (this.props.store.taskData)
    {
        totalActvityData = this.props.store.activityData;
    }

    console.log("totalActvityData", totalActvityData);

        // 定义度量
        const cols = {
            number: { alias: '今日增加or完成' },
            time: { alias: 'New User Today' }
        };

        const menuTypeList = (
            <Menu onClick={this.handleTypeClick.bind(this)}>
            {this.props.store.activityTypeList &&
                this.props.store.activityTypeList.map((key) => (  
                    <Menu.Item key={key}>Type {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>活动总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menuTypeList}>
                    <Button style={{ marginLeft: 8 }}>
                        活动TYPE {this.state.activityType} <Icon type="down" />
                    </Button>
                </Dropdown>

                
                <DatePicker  onChange={this.onChange.bind(this)}/>

   
            </Breadcrumb>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Button  type="primary" onClick={this.queryClickAdd.bind(this)}>查询参与流水</Button>
            </Breadcrumb>

            {console.log("totalActvityData", totalActvityData)}
            
            { totalActvityData && 
                <Chart height={400} data={totalActvityData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="number" />
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="time*number" size={2} />
                    <Geom type='point' position="time*number" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>
            }
                
          </Content>
    );
  }
}

export default NFActivityFlow;