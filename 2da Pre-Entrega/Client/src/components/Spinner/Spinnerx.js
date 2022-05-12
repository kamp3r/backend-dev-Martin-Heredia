import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Spinnerx.css';
import { Spinner } from 'reactstrap';

const Spinnerx = () => {
  return (
    <div className="spinnerContainer">
      <Spinner color='info' size='' type='grow'>
        Loading...
      </Spinner>
    </div>
  );
};

export default Spinnerx;
