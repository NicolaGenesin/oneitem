import React from 'react';
import DynamicCustomerPage from '../../dynamicCustomerPage';

export default function Main() {
  return (
    <div>
      <div className="container">
        <div className="left">
          asd

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div role="separator" className="dropdown-divider" />
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
            <input type="text" className="form-control" aria-label="Text input with dropdown button" />
          </div>

        </div>
        <div className="right">
          RIGHT
          <DynamicCustomerPage />
        </div>
      </div>
      <style jsx>
        {`
            .container {
                height: auto;
                overflow: hidden;
            }
            
            .left {
                width: 250px;
                float: left;
                background: #aafed6;
            }
            
            .right {
                float: none;
                background: #e8f6fe;
                width: auto;
                overflow: hidden;
            }
            `}

      </style>
    </div>
  );
}
