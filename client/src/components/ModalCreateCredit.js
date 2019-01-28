import React from 'react';
import { Modal, Button,  Form, Icon, Input, message } from 'antd';
import axios from 'axios';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      visible: false,
      name: '',
      number: '',
      date: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    console.log(this.state.email)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // console.log(e.value);
    axios.post(`http://localhost:5000/api/user/addcreditcard`, { 
    title: this.state.name, 
    number: this.state.number,
    expiryDate: this.state.date , 
    userid: sessionStorage.getItem("userid")})
    .then(res => {
      console.log(res.data)
     if (res.data.error) {
        switch(res.data.error) {
          case 'Você precisa digitar o Titulo do cartão':
            message.warning(res.data.error);
                break;
          case 'Cartão deve ter um numero':
            message.warning(res.data.error);
                break; 
          case 'Cartão precisa ter uma data de expiração':
            message.warning(res.data.error);
                break; 
        }
     } else {
      message.success('Cartão de crédito adicionado com sucesso!');
          setTimeout( () => {      
            this.setState({
              visible: false,
            });
            window.location.reload()          
          }  , 1500 );
          
      }
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
    console.log(this.state.name)
  }
  onNumberChange = (event) => {
    this.setState({number: event.target.value})
    console.log(this.state.number)
  }
  onDateChange = (event) => {
    this.setState({date: event.target.value})
    console.log(this.state.date)
  }
  
  render() {
    const {
      getFieldDecorator, getFieldError, isFieldTouched,
    } = this.props.form;

     // Only show error after a field is touched.
     const userNameError = isFieldTouched('userName') && getFieldError('userName');
     const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Button type="primary" shape="round" icon="idcard" size="large" onClick={this.showModal}>
        Faça seu cartão de crédito</Button>
            <Modal
              title="Adicionar cartão de crédito"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText='Adicionar'
            >
            <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('cardname', {
                rules: [{ required: true, message: 'Por favor digite o nome do cartão' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', width: "100%" }}/>} onChange={this.onNameChange}  placeholder="Nome do cartão" />
              )}
            </Form.Item>
            
            <Form.Item
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('cardnumber', {
                rules: [{ required: true, message: 'Por favor digite o Número do cartão' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', width: "100%" }}/>} onChange={this.onNumberChange}  placeholder="Número do cartão" />
              )}
            </Form.Item>

            <Form.Item
                    className="margin-corrent"
                    label="Data de validade"
                  >
                    {getFieldDecorator('datepicker', {
                       rules: [{ type: 'date', required: true, message: 'Por favor, preencha a data!' }],
                    })(
                      <Input type="date" onChange={this.onDateChange} placeholder="Titulo da versão" />
                    )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const ModalCreateCredit = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default ModalCreateCredit