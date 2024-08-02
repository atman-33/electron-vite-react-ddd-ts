import { Button } from '@renderer/components/shadcn/ui/button';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <>
      <Link to="/debug">
        <Button variant="default">Debug page</Button>
      </Link>
    </>
  );
};

export default IndexPage;
