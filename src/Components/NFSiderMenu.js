import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import {queryCurrentDailyNewUser, queryCurrentDailyAvtivelyUser, queryCurrentRetention} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class NFSiderMenu extends React.Component {

    state = {
        collapsed: false,
      };
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }

      @action
      handleClick = (e) => {
        //console.log('click ', e.key);
        
        window.store.setContentType(e.key);
        if (e.key == 1)
        {
          queryCurrentDailyNewUser();
        }
        if (e.key == 2)
        {
          queryCurrentDailyAvtivelyUser();
        }
        if (e.key == 3)
        {
          queryCurrentRetention();
        }
      }

  render() {
    return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu 
          onClick={this.handleClick} 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline"
          >

            <Menu.Item key="0">
              <Icon type="desktop" />
              <span>Data Overview</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Overview</span></span>}
            >
              <Menu.Item key="1">Daily New Users</Menu.Item>
              <Menu.Item key="2">Daily Active Users </Menu.Item>
              <Menu.Item key="3">Retention Ratio</Menu.Item>
              <Menu.Item key="4">Level Preview</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Economic</span></span>}
            >
              <Menu.Item key="11">Item statistics</Menu.Item>
              <Menu.Item key="12">Payment statistics</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="team" /><span>Production</span></span>}
            >
              <Menu.Item key="21">Task statistics</Menu.Item>
              <Menu.Item key="22">Blocking statistics</Menu.Item>
              <Menu.Item key="23">Round statistics</Menu.Item>
            </SubMenu>
            <Menu.Item key="900">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}

export default NFSiderMenu;