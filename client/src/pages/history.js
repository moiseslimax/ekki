import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Table } from 'antd';
import axios from 'axios';

export default class History extends Component {
        constructor(props) {
          super(props);
          this.state = {
            data: [{
              
            }]
          };
        }
  
  componentDidMount = () => {
    // console.log(sessionStorage.getItem("userid"));
    axios.get(`http://localhost:5000/api/user/history/${sessionStorage.getItem("userid")}`)
        .then(res => {
          this.setState({data: res.data.response})
          console.log(res.data.response)
        })
  
  }  
    render() {
        const columns = [
            { title: 'Destinatário', dataIndex: 'sentto', key: 'name' },
            { title: 'Valor', dataIndex: 'amount', key: 'value' },
            { title: 'Data da Trasferencia', dataIndex: 'date', key: 'date' },
          ];
          
          console.log()
        return (
            <div>
                
            <Row>
              <Col span={24}>
                <h1>Historico</h1>
                <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />

                </div>
              </Col>
            </Row>
          
          </div>
        )
      }
}
