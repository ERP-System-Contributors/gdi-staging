import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './gdi-transaction-data-index.reducer';

export const GdiTransactionDataIndexDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const gdiTransactionDataIndexEntity = useAppSelector(state => state.gdiTransactionDataIndex.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="gdiTransactionDataIndexDetailsHeading">Gdi Transaction Data Index</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.id}</dd>
          <dt>
            <span id="datasetName">Dataset Name</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.datasetName}</dd>
          <dt>
            <span id="databaseName">Database Name</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.databaseName}</dd>
          <dt>
            <span id="updateFrequency">Update Frequency</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.updateFrequency}</dd>
          <dt>
            <span id="datasetBehavior">Dataset Behavior</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.datasetBehavior}</dd>
          <dt>
            <span id="minimumDataRowsPerRequest">Minimum Data Rows Per Request</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.minimumDataRowsPerRequest}</dd>
          <dt>
            <span id="maximumDataRowsPerRequest">Maximum Data Rows Per Request</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.maximumDataRowsPerRequest}</dd>
          <dt>
            <span id="datasetDescription">Dataset Description</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.datasetDescription}</dd>
          <dt>
            <span id="dataPath">Data Path</span>
          </dt>
          <dd>{gdiTransactionDataIndexEntity.dataPath}</dd>
          <dt>Master Data Item</dt>
          <dd>
            {gdiTransactionDataIndexEntity.masterDataItems
              ? gdiTransactionDataIndexEntity.masterDataItems.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.entityName}</a>
                    {gdiTransactionDataIndexEntity.masterDataItems && i === gdiTransactionDataIndexEntity.masterDataItems.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Team</dt>
          <dd>{gdiTransactionDataIndexEntity.businessTeam ? gdiTransactionDataIndexEntity.businessTeam.businessTeam : ''}</dd>
          <dt>Data Set Template</dt>
          <dd>{gdiTransactionDataIndexEntity.dataSetTemplate ? gdiTransactionDataIndexEntity.dataSetTemplate.documentTitle : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {gdiTransactionDataIndexEntity.placeholders
              ? gdiTransactionDataIndexEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {gdiTransactionDataIndexEntity.placeholders && i === gdiTransactionDataIndexEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/gdi-transaction-data-index" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gdi-transaction-data-index/${gdiTransactionDataIndexEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default GdiTransactionDataIndexDetail;
