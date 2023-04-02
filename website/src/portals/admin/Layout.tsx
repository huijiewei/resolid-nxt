import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Component = () => {
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
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
    </>
  );
};

export default Component;
