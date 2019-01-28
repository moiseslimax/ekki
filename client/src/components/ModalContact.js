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
      loading: false,
      email: ''
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
    axios.post(`http://localhost:5000/api/user/addcontact`, { email: this.state.email, userid: sessionStorage.getItem("userid")})
    .then(res => {
      // console.log(res.data)
     if (res.data.erro) {
        switch(res.data.erro) {
          case 'Email é invalido':
          message.warning(res.data.erro);
            break;
          case 'Email não existe no nosso banco de dados':
          message.warning(res.data.erro);
            break; 
        }
     } else {
      // console.log('entrou')
      this.setState({
        visible: false,
      });
      window.location.reload()
      }
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

     // Only show error after a field is touched.
     const userNameError = isFieldTouched('userName') && getFieldError('userName');
     const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
            <Modal
              title="Adicionar contato"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText='Adicionar'
            ><Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Por favor digite o email' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', width: "100%" }}/>} onChange={this.onEmailChange} placeholder="Email" />
              )}
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}
const ModalContact = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default ModalContact