import './about.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const About = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>GDI Staging</h2>
        <p className="lead">Staging for GDI datasets</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              If you want to
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                sign in
              </Link>
            </Alert>

            {/*<Alert color="warning">
              You don&apos;t have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>*/}
          </div>
        )}
        <p>GDI Staging is a ReactJS client scaffolded from Jhipster version 7.9.4, currently running on ERP-System version 1.5.1 backend</p>
        <p>If you have any question on JHipster:</p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              JHipster homepage
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              JHipster on Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              JHipster bug tracker
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              JHipster public chat room
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              follow @jhipster on Twitter
            </a>
          </li>
        </ul>

        <p>This project has been forked from the following projects</p>

        <ul>
          <li>
            <a href="https://github.com/ghacupha/erp-system" target="_blank" rel="noopener noreferrer">
              ERP-System homepage
            </a>
          </li>
          <li>
            <a href="https://github.com/ghacupha/erp-system/issues?state=open" target="_blank" rel="noopener noreferrer">
              ERP-System bug tracker
            </a>
          </li>
          <li>
            <a href="https://matrix.to/#/#erp-system:gitter.im" target="_blank" rel="noopener noreferrer">
              ERP-System public chat room
            </a>
          </li>
        </ul>

        <p>We have used FlatIcon and Iconpacks images</p>

        <ul>
          <li>
            <a href="https://www.flaticon.com/free-icons/analysis" title="analysis icons">
              Analysis icons created by RaftelDesign - Flaticon
            </a>
          </li>
          <li>
            <a href="https://www.flaticon.com/free-icons/statistics" title="statistics icons">
              Statistics icons created by Freepik - Flaticon
            </a>
          </li>
          <li>
            <a href="https://www.flaticon.com/free-icons/dashboard" title="dashboard icons">
              Dashboard icons created by Eucalyp - Flaticon
            </a>
          </li>
          <li>
            Home icons by <a href="https://iconpacks.net/?utm_source=link-attribution&utm_content=18167">Iconpacks</a>
          </li>
        </ul>

        <p>Tech stack</p>

        <ul>
          <li>
            <a href="https://github.com/ERP-System-Contributors/erp-system" title="ERP System Homepage">
              ERP System minimum version 1.5.1 backend
            </a>
          </li>
          <li>
            <a href="https://github.com/ERP-System-Contributors/gdi-staging" title="GDI Staging Home">
              GDI Staging client home
            </a>
          </li>
          <li>
            <a href="https://nodejs.org/dist/v16.16.0/" title="Nodejs">
              Runtime Node JS minimum version 16.17.0
            </a>
          </li>
          <li>
            <a href="https://redux.js.org/" title="Redux">
              Redux version 4.2.0
            </a>
          </li>
          <li>
            <a href="https://www.jhipster.tech/documentation-archive/v7.9.4" title="JHipster Home">
              JHipster Version 7.9.4
            </a>
          </li>
        </ul>

        <p>
          If you like JHipster, don&apos;t forget to give us a star on{' '}
          <a href="https://github.com/ERP-System-Contributors/erp-system" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default About;
