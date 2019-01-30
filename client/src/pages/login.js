import React, { Component } from 'react'
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Link, Router } from 'react-router-dom'

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,   
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(`${document.location.href}api/user/getlogin`)
        console.log('Received values of form: ', values);
         axios.post(`http://test.moisesmlima.com:3020/api/user/getlogin`, { email: values.userName, password: values.password })
            .then(res => {
             if (res.data.error) {
                switch(res.data.error) {
                  case 'Email não encontrado':
                  message.warning(res.data.error);
                    break;
                  case 'Senha incorreta':
                  message.warning(res.data.error);
                    break; 
                }
             } else {
              // console.log(res.data.user._id)
              sessionStorage.setItem("userid",res.data.user._id);
              sessionStorage.setItem("email",res.data.user.email);
              window.location.reload()
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
          <h1 style={{textAlign: "center", fontSize: 50}}>Ekki</h1>
          <h3 style={{textAlign: "center", fontSize: 25}}>Faça seu login</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Por favor digite um email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
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
              <Button type="primary" htmlType="submit" className="login-form-button"  style={{marginRight: 5}}>
                Log in
              </Button>
              ou <Link to="/register"><a>Registre-se agora!</a></Link>
            </Form.Item>
          </Form>
        </div>
        </Col>
      </Row>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login