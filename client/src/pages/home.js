import React, { Component } from 'react'
import { Row, Col, message, Button  } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import ModalContact from '../components/ModalContact'
import CreditCardBox from '../components/CreditCardBox'


 export default class Home extends Component {
        constructor(props) {
          super(props);
          this.state = {
            data: '',
            visible: false,
            loading: false,
            balance: '',
            creditcard: []
          };
        }


      componentDidMount = () => {
        // console.log(sessionStorage.getItem("userid"));
        axios.get(`http://test.moisesmlima.com:3020/api/user/userdata/${sessionStorage.getItem("userid")}`)
            .then(res => {
              this.setState({data: res.data, balance: res.data.balance, creditcard: res.data.creditcard})
            })
      
      }      

      handleDeleteContact =(e, email) => {
        e.preventDefault();
        
        // console.log(sessionStorage.getItem("userid"));
        axios.delete(`http://test.moisesmlima.com:3020/api/user/deletecontact/${email}`, {data: {userid: sessionStorage.getItem("userid")}})
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

      handlePayCard = () => {
        axios.post(`http://test.moisesmlima.com:3020/api/trasfer/paycard/`,  {userid: sessionStorage.getItem("userid")})
        .then(res => {
          console.log(res)
          if (res.data.error) {
            switch (res.data.error) {
              case 'Saldo menor que divida!':
              message.warning(res.data.error);
                break;
              case 'Sem divida de cartão de crédito!':
              message.warning(res.data.error);
                break;
            }
          } else {
            message.success('Cartão de crédito pago com sucesso!');
            setTimeout( () => {      
              this.setState({
                visible: false,
              });
              window.location.reload()          
            }  , 1500 );
          }
          
        })
      }

  render() {
    // const { getFieldDecorator } = this.props.form;
  
  
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
          title: 'Action', dataIndex: 'delete', key: 'x', render: (text, record) => <div><a href="" onClick={(e) => {this.handleDeleteContact(e, record.email)}}>Delete</a></div>,
        },
      ];
      console.log();
      return (
        <div>
            <h1>Dados Bancarios</h1>
            <Row style={{marginBottom: 50}}>
              <Col span={12}>
                <div style={{textAlign: "center"}}>
                    <h2>Saldo</h2>
                    <h4>Sua saldo disponivel é de:</h4>
                    <p><strong style={{fontSize: 50}}>{Number(this.state.balance).toFixed(2)}</strong> R$</p>
                    {this.state.creditcard.length == 0 
                    ? ''
                    : <Button type="primary" ghost onClick={()=> {this.handlePayCard()}}>Pagar cartão de crédito</Button>}
                </div>
              </Col>
              <Col span={12}>
              <div style={{textAlign: "center"}}>
                    <h2>Cartão de crédito</h2>
                    <CreditCardBox />
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
