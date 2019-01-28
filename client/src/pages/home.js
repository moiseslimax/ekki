import React, { Component } from 'react'
import { Row, Col,message  } from 'antd';
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

      handleDeleteContact =(e, email) => {
        e.preventDefault();
        
        // console.log(sessionStorage.getItem("userid"));
        axios.delete(`http://localhost:5000/api/user/deletecontact/${email}`, {data: {userid: sessionStorage.getItem("userid")}})
        .then(res => {
          message.success('Contato excluido com sucesso!');
          setTimeout( function(){ 
            window.location.reload();
          }  , 1500 );
        })
        .catch(err => {
          console.log(err)
          //erro ao excluir contato
        })

      }

  render() {
    // const { getFieldDecorator } = this.props.form;
  
    console.log(this.state.data);
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
          title: 'Action', dataIndex: 'delete', key: 'x', render: (text, record) => <div><a href="" onClick={(e) => {this.handleDeleteContact(e, record.email)}}>Delete</a></div>,
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
