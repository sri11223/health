import React from 'react';
import { Sidenav, Nav, Toggle } from 'rsuite';
import { FaHome, FaDumbbell, FaUtensils, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa'; // FontAwesome icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Sidebar = ({ expanded, setExpanded }) => {
  return (
    <div
      style={{
        width: expanded ? '240px' : '60px',
        transition: 'width 0.3s',
        height: '100vh', // Full height
        backgroundColor: '#28a745', // Green background color
        color: '#ffffff', // White text color
        position: 'fixed', // Fixed position
        overflowY: 'auto', // Scrollable if content overflows
      }}
    >
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            {/* Dashboard */}
            <Nav.Item
              eventKey="1"
              icon={<FaHome size={20} />} // FontAwesome icon
              style={{ color: '#ffffff', fontWeight: 'bold', padding: '10px 20px' }}
            >
              {expanded ? 'Dashboard' : ''}
            </Nav.Item>

            {/* Workout Plans */}
            <Nav.Item
              eventKey="2"
              icon={<FaDumbbell size={20} />} // FontAwesome icon
              style={{ color: '#ffffff', fontWeight: 'bold', padding: '10px 20px' }}
            >
              {expanded ? 'Workout Plans' : ''}
            </Nav.Item>

            {/* Diet Plans */}
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title={expanded ? 'Diet Plans' : ''}
              icon={<FaUtensils size={20} />} // FontAwesome icon
              style={{ color: '#ffffff', fontWeight: 'bold', padding: '10px 20px' }}
            >
              <Nav.Item eventKey="3-1" style={{ color: '#28a745', padding: '10px 20px' }}>
                Weight Loss
              </Nav.Item>
              <Nav.Item eventKey="3-2" style={{ color: '#28a745', padding: '10px 20px' }}>
                Muscle Gain
              </Nav.Item>
              <Nav.Item eventKey="3-3" style={{ color: '#28a745', padding: '10px 20px' }}>
                Balanced Diet
              </Nav.Item>
            </Nav.Menu>

            {/* Settings */}
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title={expanded ? 'Settings' : ''}
              icon={<FaUser size={20} />} // FontAwesome icon
              style={{ color: '#ffffff', fontWeight: 'bold', padding: '10px 20px' }}
            >
              <Nav.Item eventKey="4-1" style={{ color: '#28a745', padding: '10px 20px' }}>
                Profile
              </Nav.Item>
              <Nav.Item eventKey="4-2" style={{ color: '#28a745', padding: '10px 20px' }}>
                Progress Tracking
              </Nav.Item>
              <Nav.Item eventKey="4-3" style={{ color: '#28a745', padding: '10px 20px' }}>
                Logout
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>

        {/* Toggle Button */}
        <Sidenav.Toggle
          onToggle={(expanded) => setExpanded(expanded)}
          style={{ backgroundColor: '#218838', border: 'none', color: '#ffffff', padding: '10px' }}
        />
      </Sidenav>
    </div>
  );
};

export default Sidebar;