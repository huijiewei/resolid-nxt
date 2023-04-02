import { Link, Outlet } from 'react-router-dom';

const Component = () => {
  return (
    <div>
      <h3>Admin Layout</h3>
      <ul>
        <li>
          <Link to={'/admin'}>Admin Home</Link>
        </li>
        <li>
          <Link to={'/admin/about'}>Admin About</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Component;
