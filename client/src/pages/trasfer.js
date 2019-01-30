import React, { Component } from 'react'
import { Steps, Button, message, Form, Icon, Input, InputNumber, Spin, notification } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";

const Step = Steps.Step;

const steps = [{
  title: 'Dados de Trasferencia',
  content: 'First-content',
}, {
  title: 'Verificação',
  content: 'Second-content',
}, {
  title: 'Finalizado',
  content: 'Last-content',
}];

class TrasferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      email: '',
      amount: ''
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleVerification = () => {
    let current = this.state.current + 1;
    this.setState({ current });
    axios.post(`http://localhost:5000/api/trasfer/validate-trasfer/`,  {userid: sessionStorage.getItem("userid"), email: this.state.email, amount: this.state.amount})
    .then(res => {
      console.log(res)
      if (res.data.error) {
        this.setState({email: '', amount: ''});
        notification.open({
          message: 'Erro na transação!',
          description: res.data.error,
          duration: 6.5
        });
        let current = this.state.current - 1;
        this.setState({ current });
      } else if (res.data.sucess || res.data.alert){
        if (res.data.alert) {
          notification.open({
            message: 'Aviso de transação!',
            description: res.data.alert,
            duration: 6.5
          })
        }
        //Trasfer post
        console.log('chegou');
        axios.post('http://localhost:5000/api/trasfer/normaltrasfer/',{userid: sessionStorage.getItem("userid"), sentto: this.state.email, amount: this.state.amount})
        .then(res => {
          console.log(res)
          let current = this.state.current + 1;
          this.setState({ current });
        });
      }

    })
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    // console.log(this.state.email)
  }
  onAmountChange = (event) => {
    this.setState({amount: event})
    // console.log(this.state.amount)
  }

  render() {
    const {
      getFieldDecorator, getFieldError, isFieldTouched,
    } = this.props.form;

     // Only show error after a field is touched.
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      const { current } = this.state;
      // console.log(current);
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
        {
           current < steps.length - 2
            && 
            <div style={{marginTop: 50, marginBottom: 50}}>
              <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Faça sua trasferencia!</h1>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
                
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                  >
                    {getFieldDecorator('cardname', {
                      rules: [{ required: true, message: 'Por favor digite o email' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', width: "100%" }}/>} onChange={this.onEmailChange}  placeholder="Email do destinatário" />
                    )}
                  </Form.Item>
                    <Form.Item
                      validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                    >
                      {getFieldDecorator('cardnumber', {
                        rules: [{ required: true, message: 'Por favor digite o Valor' }],
                      })(
                        <InputNumber  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')} prefix={<InputNumber type="lock" style={{ color: 'rgba(0,0,0,.25)', width: "50%" }}/>} onChange={this.onAmountChange}  placeholder="Valor da trasferencia" />
                      )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={() => this.handleVerification()} htmlType="submit" className="login-form-button">
                      Trasferir
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
           
        }
        {
          current === steps.length - 2
            && 
            <div style={{display: 'flex',  justifyContent:'center', verticalAlign:"middle", marginTop: 50, marginBottom: 50}}> 
                <h1>Estamos verificando sua trasferencia...</h1> 
                <br />
                <div> <Spin size="large" /></div>
            </div>
            
        }
        {
          current > 1
            && 
            <div style={{ textAlign: "center", justifyContent: "center"}}> 
              <h1 style={{display: "inline-block", fontSize: 50, marginTop: 60}}>Sua trasferencia foi realizada com sucesso!</h1>
              {/* <Link to="/"><Button type="primary" size="large">Voltar para Home!</Button></Link> */}
            </div>
        }
        </div>
        <div className="steps-action">
          {
            current === steps.length - 1
            && ''
          }
          {
            // current > 0
            // && (
            // // <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
            // //   Previous
            // // </Button>
            // )
          }
        </div>
      </div>
    );
  }
}


const Trasfer = Form.create({ name: 'trasfer_form' })(TrasferForm);

export default Trasfer;