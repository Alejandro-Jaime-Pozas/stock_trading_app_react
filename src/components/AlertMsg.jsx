import React, { useState, useEffect } from 'react';

export default function AlertMsg(props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout;

    if (visible) {
      // Auto-hide the alert after 5 seconds
      timeout = setTimeout(() => {
        setVisible(false)
        console.log('visible has been set to false');;
      }, 4000);
    }

    return () => {
      clearTimeout(timeout)
      console.log('timeout has been cleared');;
    };
  }, [visible]);

  const handleAlertClose = () => {
    setVisible(false);
  };

// DOING THE CODE BELOW INLINE
//   const handleTransitionEnd = () => {
//     if (!visible) {
//       props.flashMsg(null, null);
//     }
//   };

  return (
    <div
      className={`alert alert-${props.category} alert-dismissible fade ${
        visible ? 'show' : ''
      } d-flex align-items-center`}
      role='alert'
      style={{ transition: 'opacity 1s ease-in-out', opacity: visible ? 1 : 0 }}
      onTransitionEnd={() => !visible ? props.flashMsg(null, null) : null }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        fill='currentColor'
        className='bi bi-exclamation-triangle-fill flex-shrink-0 me-2'
        viewBox='0 0 16 16'
        role='img'
        aria-label='Warning:'
      >
        <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' />
      </svg>
      <strong>{props.message}</strong>
      <button
        type='button'
        className='btn-close'
        onClick={handleAlertClose}
      ></button>
    </div>
  );
}
