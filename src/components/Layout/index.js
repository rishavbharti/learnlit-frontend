import classnames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from 'src/components/Navbar';
import CenterAligned from 'src/components/CenterAligned';

export default function Layout(props) {
  const { containerClass, loading, error } = props;

  if (loading) {
    return (
      <CenterAligned height='screen'>
        <CircularProgress />
      </CenterAligned>
    );
  }

  if (error) {
    return (
      <CenterAligned height='screen'>
        <h3>Error fetching data. Please refresh the page.</h3>
      </CenterAligned>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className={classnames(
          { 'xl:px-24 pb-10': !containerClass },
          containerClass
        )}
      >
        {props.children}
      </main>
    </>
  );
}
