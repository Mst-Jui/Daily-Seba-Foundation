import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.errorCode}>404</div>
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for could not be found.</p>

      <Link href="/" style={styles.btn} className='flex items-center gap-3 rounded-lg'>
        <FaArrowLeft /> Back to Home
      </Link>

    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: '700',
    color: '#4ADE80',
  },
  btn: {
    marginTop: '20px',
    padding: '12px 30px',
    backgroundColor: '#4ADE80',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: '600',
  }
};
