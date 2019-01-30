import React, { Component } from 'react'
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Link, Router } from 'react-router-dom'

class NormalLoginForm extends React.Component {
  
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(`${document.location.href}api/user/getlogin`)
        // console.log('Received values of form: ', values);
         axios.post(`http://test.moisesmlima.com:3020/api/user/register`, { name: values.userName, email: values.email, password: values.password, password2: values.password2 })
            .then(res => {
             if (res.data.error) {
                  message.warning(res.data.error);
             } else {
              console.log(res.data)
              message.success('Cadastro efetuado com sucesso!');
              setTimeout( () => {      
                window.location = '/';        
              }  , 1500 );
              }
            })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={6} offset={9}>
        <div style={{background: "#bcdbf738", padding: 25, borderRadius: 10, marginTop: "30%"}}>
          <h1 style={{textAlign: "center", fontSize: 50}}>Registrar</h1>
          {/* <h3 style={{textAlign: "center", fontSize: 25}}>Faça seu login</h3> */}
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Por favor digite um nome completo!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nome Completo" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor digite um email!' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Por favor digite uma senha!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Senha" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password2', {
                rules: [{ required: true, message: 'Por favor confirme sua senha!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Cofirme sua Senha" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: 5}}>
               Registrar
              </Button> ou voltar para <Link to="/login"><a>Login</a></Link>
            </Form.Item>
          </Form>
        </div>
        </Col>
      </Row>
    );
  }
}

const Register = Form.create({ name: 'normal_Register' })(NormalLoginForm);

export default Register