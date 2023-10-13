import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './contract-metadata.reducer';

export const ContractMetadataDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const contractMetadataEntity = useAppSelector(state => state.contractMetadata.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contractMetadataDetailsHeading">Contract Metadata</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{contractMetadataEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{contractMetadataEntity.description}</dd>
          <dt>
            <span id="typeOfContract">Type Of Contract</span>
          </dt>
          <dd>{contractMetadataEntity.typeOfContract}</dd>
          <dt>
            <span id="contractStatus">Contract Status</span>
          </dt>
          <dd>{contractMetadataEntity.contractStatus}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {contractMetadataEntity.startDate ? (
              <TextFormat value={contractMetadataEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminationDate">Termination Date</span>
          </dt>
          <dd>
            {contractMetadataEntity.terminationDate ? (
              <TextFormat value={contractMetadataEntity.terminationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="commentsAndAttachment">Comments And Attachment</span>
          </dt>
          <dd>{contractMetadataEntity.commentsAndAttachment}</dd>
          <dt>
            <span id="contractTitle">Contract Title</span>
          </dt>
          <dd>{contractMetadataEntity.contractTitle}</dd>
          <dt>
            <span id="contractIdentifier">Contract Identifier</span>
          </dt>
          <dd>{contractMetadataEntity.contractIdentifier}</dd>
          <dt>
            <span id="contractIdentifierShort">Contract Identifier Short</span>
          </dt>
          <dd>{contractMetadataEntity.contractIdentifierShort}</dd>
          <dt>Related Contracts</dt>
          <dd>
            {contractMetadataEntity.relatedContracts
              ? contractMetadataEntity.relatedContracts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {contractMetadataEntity.relatedContracts && i === contractMetadataEntity.relatedContracts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Department</dt>
          <dd>{contractMetadataEntity.department ? contractMetadataEntity.department.dealerName : ''}</dd>
          <dt>Contract Partner</dt>
          <dd>{contractMetadataEntity.contractPartner ? contractMetadataEntity.contractPartner.dealerName : ''}</dd>
          <dt>Responsible Person</dt>
          <dd>{contractMetadataEntity.responsiblePerson ? contractMetadataEntity.responsiblePerson.applicationIdentity : ''}</dd>
          <dt>Signatory</dt>
          <dd>
            {contractMetadataEntity.signatories
              ? contractMetadataEntity.signatories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.applicationIdentity}</a>
                    {contractMetadataEntity.signatories && i === contractMetadataEntity.signatories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Security Clearance</dt>
          <dd>{contractMetadataEntity.securityClearance ? contractMetadataEntity.securityClearance.clearanceLevel : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {contractMetadataEntity.placeholders
              ? contractMetadataEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {contractMetadataEntity.placeholders && i === contractMetadataEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Contract Document File</dt>
          <dd>
            {contractMetadataEntity.contractDocumentFiles
              ? contractMetadataEntity.contractDocumentFiles.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {contractMetadataEntity.contractDocumentFiles && i === contractMetadataEntity.contractDocumentFiles.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Contract Mappings</dt>
          <dd>
            {contractMetadataEntity.contractMappings
              ? contractMetadataEntity.contractMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {contractMetadataEntity.contractMappings && i === contractMetadataEntity.contractMappings.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/contract-metadata" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contract-metadata/${contractMetadataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ContractMetadataDetail;
