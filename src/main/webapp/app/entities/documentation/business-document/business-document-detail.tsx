import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './business-document.reducer';

export const BusinessDocumentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const businessDocumentEntity = useAppSelector(state => state.businessDocument.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="businessDocumentDetailsHeading">Business Document</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{businessDocumentEntity.id}</dd>
          <dt>
            <span id="documentTitle">Document Title</span>
          </dt>
          <dd>{businessDocumentEntity.documentTitle}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{businessDocumentEntity.description}</dd>
          <dt>
            <span id="documentSerial">Document Serial</span>
          </dt>
          <dd>{businessDocumentEntity.documentSerial}</dd>
          <dt>
            <span id="lastModified">Last Modified</span>
          </dt>
          <dd>
            {businessDocumentEntity.lastModified ? (
              <TextFormat value={businessDocumentEntity.lastModified} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="attachmentFilePath">Attachment File Path</span>
          </dt>
          <dd>{businessDocumentEntity.attachmentFilePath}</dd>
          <dt>
            <span id="documentFile">Document File</span>
          </dt>
          <dd>
            {businessDocumentEntity.documentFile ? (
              <div>
                {businessDocumentEntity.documentFileContentType ? (
                  <a onClick={openFile(businessDocumentEntity.documentFileContentType, businessDocumentEntity.documentFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {businessDocumentEntity.documentFileContentType}, {byteSize(businessDocumentEntity.documentFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileTampered">File Tampered</span>
          </dt>
          <dd>{businessDocumentEntity.fileTampered ? 'true' : 'false'}</dd>
          <dt>
            <span id="documentFileChecksum">Document File Checksum</span>
          </dt>
          <dd>{businessDocumentEntity.documentFileChecksum}</dd>
          <dt>Created By</dt>
          <dd>{businessDocumentEntity.createdBy ? businessDocumentEntity.createdBy.applicationIdentity : ''}</dd>
          <dt>Last Modified By</dt>
          <dd>{businessDocumentEntity.lastModifiedBy ? businessDocumentEntity.lastModifiedBy.applicationIdentity : ''}</dd>
          <dt>Originating Department</dt>
          <dd>{businessDocumentEntity.originatingDepartment ? businessDocumentEntity.originatingDepartment.dealerName : ''}</dd>
          <dt>Application Mappings</dt>
          <dd>
            {businessDocumentEntity.applicationMappings
              ? businessDocumentEntity.applicationMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {businessDocumentEntity.applicationMappings && i === businessDocumentEntity.applicationMappings.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {businessDocumentEntity.placeholders
              ? businessDocumentEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {businessDocumentEntity.placeholders && i === businessDocumentEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>File Checksum Algorithm</dt>
          <dd>{businessDocumentEntity.fileChecksumAlgorithm ? businessDocumentEntity.fileChecksumAlgorithm.name : ''}</dd>
          <dt>Security Clearance</dt>
          <dd>{businessDocumentEntity.securityClearance ? businessDocumentEntity.securityClearance.clearanceLevel : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-document" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-document/${businessDocumentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BusinessDocumentDetail;
