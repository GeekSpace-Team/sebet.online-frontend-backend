import React from 'react';

import {Button,Input,Select,DatePicker,Table, Badge, Menu, Dropdown, Space} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled,DownOutlined  } from '@ant-design/icons';

import './HereketTable.css';
const menu = (
    <Menu>
      <Menu.Item>Habar Ugrat</Menu.Item>
      <Menu.Item>Password üýtget</Menu.Item>
    </Menu>
  );

const HereketTable = props=>{

    const expandedRowRender = () => {
        const columns = [
            
          { title: 'Ip Address', dataIndex: 'ipaddress', key: 'ipaddress' },
          { title: 'Döredilen Wagty', dataIndex: 'createdAt', key: 'createdAt' },
          { title: 'Mac Address', dataIndex: 'macaddress', key: 'macaddress' },
          { title: 'Döreden', dataIndex: 'creator', key: 'creator' },
        //   {
        //     title: 'Status',
        //     key: 'state',
        //     render: () => (
        //       <span>
        //         <Badge status="success" />
        //         Finished
        //       </span>
        //     ),
        //   },
          {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
              <Space size="middle">
                <a>Duruz</a>
                <a>Öçür</a>
                <Dropdown overlay={menu}>
                  <a>
                    Goşmaça <DownOutlined />
                  </a>
                </Dropdown>
              </Space>
            ),
          },
        ];
    
        const data = [];
        for (let i = 0; i < 3; ++i) {
          data.push({
            key: i,
            createdAt: '2014-12-24 23:12:00',
            macaddress: '2514785268',
            ipaddress: '10.102.10.102',
            creator:"Wekil"
          });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };


      // uly TAble
      const columns = [
        { title: 'Ulanyjy Ady', dataIndex: 'name', key: 'name' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Giren Wagty', dataIndex: 'logintime', key: 'logintime' },
        { title: 'Ulgamdaky ýagdaýy', key: 'operation', render: () => <a>Online</a> },
      ];
    
      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          name: 'Wekil Ýazgulyýew',
          platform: 'iOS',
          logintime: '2021-02-28 14:12:00',
          status:"Doktor",
          createdAt: '2014-12-24 23:12:00',
        });
      }
    


    return (
        <div className='hereket-table'>
             <Table
                className="components-table-demo-nested "
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
                />
        </div>
    );
}; 

export default HereketTable;