import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Table } from 'antd';
export default class History extends Component {
    render() {
        const columns = [
            { title: 'Destinatário', dataIndex: 'name', key: 'name' },
            { title: 'Valor', dataIndex: 'value', key: 'value' },
            { title: 'Data da Trasferencia', dataIndex: 'date', key: 'date' },
            
          ];
          
          const data = [
            {
              key: 1, name: 'John Brown', value: 32, date: '18/12/2018',
            },
            {
              key: 2, name: 'Jim Green', value: 42, date: '18/12/2018',
            },
            {
              key: 3, name: 'Joe Black', value: 32, date: '18/12/2018', 
            },
          ];
          
        return (
            <div>
                
            <Row>
              <Col span={24}>
                <h1>Historico</h1>
                <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
     
                </div>
              </Col>
            </Row>
          
          </div>
        )
      }
}
