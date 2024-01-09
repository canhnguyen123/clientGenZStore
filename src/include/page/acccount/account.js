import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from './ingredient/login';
import Register from './ingredient/register';
function Acction() {
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main row'>

        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="login" title="Đăng  nhập">
            <div className='flex_center'>
              <Login />
            </div>
          </Tab>
          <Tab eventKey="fa" title="Đăng kí">
            <div className='flex_center'>
              <Register />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>

  );
}

export default Acction;