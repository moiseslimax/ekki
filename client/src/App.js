import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Switch, NavLink, browserHistory } from "react-router-dom";
//PAGES
import Home from './pages/home';
import Trasfer from './pages/trasfer';
import History from './pages/history';
import Login from './pages/login';
import Register from './pages/register';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: false,
      email: '',
    };
  }

  
  componentDidMount = () => {
    let userid = sessionStorage.getItem("userid")
    let email = sessionStorage.getItem("email")
    if (userid) {
      this.setState({userid})
    }
  }

  handleLogout = () => {
    sessionStorage.clear();
    this.setState({userid: false})
  }

  render() {
    
    return (
          <div>
            
            {this.state.userid === false 
            ? <div>
              <Router>
                <Switch>
                  <Route path="/register" component={Register} />
                  <Route path="/" component={Login} />
                </Switch>
              </Router>
              </div>
            : <Router> 
                  <Layout className="layout">
                 
                  <Header>
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      style={{ lineHeight: '64px' }}
                    >
                      <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
                      <Menu.Item key="2"><NavLink to="/trasfer">Transferência</NavLink></Menu.Item>
                      <Menu.Item key="5"><NavLink to="/history">Histórico</NavLink></Menu.Item>
                      <Menu.Item key="6" style={{float: "right"}} onClick={() =>{this.handleLogout()}}>Logout</Menu.Item>
                      
                
                      {/* <div>
                          <div style={{float: "right"}}><Link to="/" >Logout</Link></div>
                          <div style={{float: "right"}}>Usuário: teste@teste.com.br</div>
                      </div> */}
                    </Menu>
                  </Header>
                  <Content style={{ padding: '0 50px' }} >
                      
                    <div style={{ background: '#fff', padding: 24, height:"100%", width:"100%", marginTop:35 }} >
                      <Switch>
                        {console.log(this.state.userid)}
                        <Route path="/" exact component={Home} userid={this.state.userid}/>
                        <Route path="/trasfer/" component={Trasfer} />
                        <Route path="/history/" component={History} />
                        <Route path="/register" component={Register} />
                      </Switch>
                      </div>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>
                    Ekki - Todos os direitos reservados
                  </Footer>
              </Layout>
              </Router>
            }   
          </div>
            
      
    )
   }
  
}

export default App;
