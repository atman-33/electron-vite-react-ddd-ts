import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <>
      <Link to="/debug">
        <div className="text-blue-600 underline">Debug page</div>
      </Link>
    </>
  );
};

export default IndexPage;
