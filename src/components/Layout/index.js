import CircularProgress from '@mui/material/CircularProgress';

import Navbar from 'src/components/Navbar';
import CenterAligned from 'src/components/CenterAligned';

export default function Layout(props) {
  const { loading, error } = props;

  if (loading) {
    return (
      <CenterAligned>
        <CircularProgress />
      </CenterAligned>
    );
  }

  if (error) {
    return (
      <CenterAligned>
        <h3>Errr fetching courses</h3>
      </CenterAligned>
    );
  }

  return (
    <>
      <Navbar />
      <main className='xl:px-24 pb-10  '>{props.children}</main>
    </>
  );
}
