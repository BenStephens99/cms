'use client'
import { useState, useEffect } from 'react';
import './socialLinksPlugin.scss';

export default function EditSocialLinks(props) {
  const [services, setServices] = useState({
    instagram: {
      link: "",
      active: false,
    },
    facebook: {
      link: "",
      active: false,
    },
    twitter: {
      link: "",
      active: false,
    },
    linkedin: {
      link: "",
      active: false,
    },

    ...props.content,
  });

  useEffect(() => {
    setServices((prevServices) => ({
      ...prevServices,
      ...props.content,
    }));
  }, []);

  useEffect(() => {
    props.setContent(services);
  }, [services]);

  const handleLinkChange = (serviceName, value) => {
    setServices(prevServices => ({
      ...prevServices,
      [serviceName]: {
        ...prevServices[serviceName],
        link: value,
      }
    }));
  };

  const handleActiveChange = (serviceName, value) => {
    console.log(value)
    setServices(prevServices => ({
      ...prevServices,
      [serviceName]: {
        ...prevServices[serviceName],
        active: value,
      }
    }));
  };

  return (
    <div className="edit-social-links-plugin">
      {Object.keys(services).map((serviceName) => (
        <div className="input-group" key={serviceName}>
          <span className="input-group-text" id="basic-addon1">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={services[serviceName].active}
                onChange={(e) => handleActiveChange(serviceName, e.target.checked)} />
            </div>
            {serviceName}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="eg https://www.service.com/username/"
            value={services[serviceName].link}
            onChange={(e) => handleLinkChange(serviceName, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
