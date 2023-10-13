import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './account-attribute-metadata.reducer';

export const AccountAttributeMetadataDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const accountAttributeMetadataEntity = useAppSelector(state => state.accountAttributeMetadata.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountAttributeMetadataDetailsHeading">Account Attribute Metadata</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.id}</dd>
          <dt>
            <span id="precedence">Precedence</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.precedence}</dd>
          <dt>
            <span id="columnName">Column Name</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.columnName}</dd>
          <dt>
            <span id="shortName">Short Name</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.shortName}</dd>
          <dt>
            <span id="detailedDefinition">Detailed Definition</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.detailedDefinition}</dd>
          <dt>
            <span id="dataType">Data Type</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.dataType}</dd>
          <dt>
            <span id="length">Length</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.length}</dd>
          <dt>
            <span id="columnIndex">Column Index</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.columnIndex}</dd>
          <dt>
            <span id="mandatoryFieldFlag">Mandatory Field Flag</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.mandatoryFieldFlag}</dd>
          <dt>
            <span id="businessValidation">Business Validation</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.businessValidation}</dd>
          <dt>
            <span id="technicalValidation">Technical Validation</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.technicalValidation}</dd>
          <dt>
            <span id="dbColumnName">Db Column Name</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.dbColumnName}</dd>
          <dt>
            <span id="metadataVersion">Metadata Version</span>
          </dt>
          <dd>{accountAttributeMetadataEntity.metadataVersion}</dd>
          <dt>Standard Input Template</dt>
          <dd>{accountAttributeMetadataEntity.standardInputTemplate ? accountAttributeMetadataEntity.standardInputTemplate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/account-attribute-metadata" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-attribute-metadata/${accountAttributeMetadataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountAttributeMetadataDetail;
