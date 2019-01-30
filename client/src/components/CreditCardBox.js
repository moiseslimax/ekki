import React, { Component } from 'react'
import { Button,message } from 'antd';
import axios from 'axios';
import ModalCreateCredit from './ModalCreateCredit'
import ModalCreditCard from './ModalCreditCard';

export default class CreditCardBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: false,
            cardDebt: 0
        }
    }

    componentDidMount = () => {
        // console.log(sessionStorage.getItem("userid"))
        axios.get(`http://test.moisesmlima.com:3020/api/user/creditcard/${sessionStorage.getItem("userid")}`, )
        .then(res => {
          if (!res.data.length == 0) {
              console.log(res.data[0].debt.$numberDecimal)
              this.setState({card: res.data, cardDebt:res.data[0].debt });
          }
        })
    }

    handleDeleteCard = (e) => {
        e.preventDefault();
        
        // console.log(sessionStorage.getItem("userid"));
        axios.delete(`http://test.moisesmlima.com:3020/api/user/deletecreditcard/`, {data: {userid: sessionStorage.getItem("userid")}})
        .then(res => {
          message.success('Cartão de crédito excluido com sucesso!');
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
      
    return (
      <div>
        {this.state.card == false 
        ? <div>
              <h4>Você ainda não tem cartão de crédito</h4>  
              <ModalCreateCredit />
          </div>
        : <div>
            <h4>Sua gasto com cartão de crédito é de:</h4>
            <p><strong style={{fontSize: 50}}>{Number(this.state.cardDebt).toFixed(2)}</strong>  R$</p>
            <div>
              <Button type="danger" ghost onClick={(e)=> {this.handleDeleteCard(e)}}>Excluir cartão de crédito</Button>
              {/* <ModalCreditCard card={this.state.card} /> */}
            </div>
          </div>
        }
      </div>
    )
  }
}
