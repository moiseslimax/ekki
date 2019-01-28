import React, { Component } from 'react'
import { Row, Col, Button,  Drawer, Form, Input, Select, DatePicker, Icon,  } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import ModalContact from '../components/ModalContact'

 export default class Home extends Component {
        constructor(props) {
          super(props);
          this.state = {
            data: '',
            visible: false,
            loading: false
          };
        }


      componentDidMount = () => {
        // console.log(sessionStorage.getItem("userid"));
        axios.get(`http://localhost:5000/api/user/userdata/${sessionStorage.getItem("userid")}`)
            .then(res => {
              this.setState({data: res.data})
            })
      
      }      

      handleDeleteContact =() => {
        
      }
  render() {
    // const { getFieldDecorator } = this.props.form;
  
    console.log(this.state.data);
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
          title: 'Action', dataIndex: '', key: 'x', render: () => <div><a href="" onClick={() => {}}>Delete</a> <a href="javascript:;">Edit</a></div>,
        },
      ];
      
      const data = [
        {
          key: 1, name: 'John Brown', email: 'teste@teste.com.br',
        },
        {
          key: 2, name: 'Jim Green', email: 'teste@teste.com.br',
        },
        {
          key: 3, name: 'Joe Black', email: 'teste@teste.com.br', 
        },
      ];

    return (
        <div>
            <h1>Dados Bancarios</h1>
        <Row style={{marginBottom: 50}}>
          <Col span={12}>
            <div style={{textAlign: "center"}}>
                <h2>Saldo</h2>
                {/* <h3 style={{fontSize: 50}}>{this.state.data.balance.numberDecimal}R$</h3> */}
            </div>
          </Col>
          <Col span={12}>
          <div style={{textAlign: "center"}}>
                <h2>Cartão de crédito</h2>
                <h3 style={{fontSize: 50}}>50.00R$</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
          <div>
            <h1>Contatos</h1>
            <ModalContact />
          </div>
            
            <div>
            <Table
                columns={columns}
                dataSource={this.state.data.contacts}
            />
            </div>
          </Col>
        </Row>
      
      </div>
    )
  }
}
