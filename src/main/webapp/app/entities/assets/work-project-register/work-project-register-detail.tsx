import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './work-project-register.reducer';

export const WorkProjectRegisterDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const workProjectRegisterEntity = useAppSelector(state => state.workProjectRegister.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workProjectRegisterDetailsHeading">Work Project Register</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{workProjectRegisterEntity.id}</dd>
          <dt>
            <span id="catalogueNumber">Catalogue Number</span>
          </dt>
          <dd>{workProjectRegisterEntity.catalogueNumber}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{workProjectRegisterEntity.description}</dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>
            {workProjectRegisterEntity.details ? (
              <div>
                {workProjectRegisterEntity.detailsContentType ? (
                  <a onClick={openFile(workProjectRegisterEntity.detailsContentType, workProjectRegisterEntity.details)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {workProjectRegisterEntity.detailsContentType}, {byteSize(workProjectRegisterEntity.details)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="totalProjectCost">Total Project Cost</span>
          </dt>
          <dd>{workProjectRegisterEntity.totalProjectCost}</dd>
          <dt>
            <span id="additionalNotes">Additional Notes</span>
          </dt>
          <dd>
            {workProjectRegisterEntity.additionalNotes ? (
              <div>
                {workProjectRegisterEntity.additionalNotesContentType ? (
                  <a onClick={openFile(workProjectRegisterEntity.additionalNotesContentType, workProjectRegisterEntity.additionalNotes)}>
                    Open&nbsp;
                  </a>
                ) : null}
                <span>
                  {workProjectRegisterEntity.additionalNotesContentType}, {byteSize(workProjectRegisterEntity.additionalNotes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Dealers</dt>
          <dd>
            {workProjectRegisterEntity.dealers
              ? workProjectRegisterEntity.dealers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {workProjectRegisterEntity.dealers && i === workProjectRegisterEntity.dealers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{workProjectRegisterEntity.settlementCurrency ? workProjectRegisterEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {workProjectRegisterEntity.placeholders
              ? workProjectRegisterEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {workProjectRegisterEntity.placeholders && i === workProjectRegisterEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {workProjectRegisterEntity.businessDocuments
              ? workProjectRegisterEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {workProjectRegisterEntity.businessDocuments && i === workProjectRegisterEntity.businessDocuments.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/work-project-register" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-project-register/${workProjectRegisterEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkProjectRegisterDetail;
