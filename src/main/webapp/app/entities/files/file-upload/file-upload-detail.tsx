import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './file-upload.reducer';

export const FileUploadDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fileUploadEntity = useAppSelector(state => state.fileUpload.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fileUploadDetailsHeading">File Upload</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fileUploadEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{fileUploadEntity.description}</dd>
          <dt>
            <span id="fileName">File Name</span>
          </dt>
          <dd>{fileUploadEntity.fileName}</dd>
          <dt>
            <span id="periodFrom">Period From</span>
          </dt>
          <dd>
            {fileUploadEntity.periodFrom ? (
              <TextFormat value={fileUploadEntity.periodFrom} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="periodTo">Period To</span>
          </dt>
          <dd>
            {fileUploadEntity.periodTo ? <TextFormat value={fileUploadEntity.periodTo} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fileTypeId">File Type Id</span>
          </dt>
          <dd>{fileUploadEntity.fileTypeId}</dd>
          <dt>
            <span id="dataFile">Data File</span>
          </dt>
          <dd>
            {fileUploadEntity.dataFile ? (
              <div>
                {fileUploadEntity.dataFileContentType ? (
                  <a onClick={openFile(fileUploadEntity.dataFileContentType, fileUploadEntity.dataFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {fileUploadEntity.dataFileContentType}, {byteSize(fileUploadEntity.dataFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="uploadSuccessful">Upload Successful</span>
          </dt>
          <dd>{fileUploadEntity.uploadSuccessful ? 'true' : 'false'}</dd>
          <dt>
            <span id="uploadProcessed">Upload Processed</span>
          </dt>
          <dd>{fileUploadEntity.uploadProcessed ? 'true' : 'false'}</dd>
          <dt>
            <span id="uploadToken">Upload Token</span>
          </dt>
          <dd>{fileUploadEntity.uploadToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fileUploadEntity.placeholders
              ? fileUploadEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fileUploadEntity.placeholders && i === fileUploadEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/file-upload" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-upload/${fileUploadEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FileUploadDetail;
