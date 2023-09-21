import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFxReceiptPurposeType } from 'app/shared/model/fx-receipt-purpose-type.model';
import { searchEntities, getEntities } from './fx-receipt-purpose-type.reducer';

export const FxReceiptPurposeType = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const fxReceiptPurposeTypeList = useAppSelector(state => state.fxReceiptPurposeType.entities);
  const loading = useAppSelector(state => state.fxReceiptPurposeType.loading);
  const totalItems = useAppSelector(state => state.fxReceiptPurposeType.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="fx-receipt-purpose-type-heading" data-cy="FxReceiptPurposeTypeHeading">
        Fx Receipt Purpose Types
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/fx-receipt-purpose-type/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Fx Receipt Purpose Type
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {fxReceiptPurposeTypeList && fxReceiptPurposeTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('itemCode')}>
                  Item Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute1ReceiptPaymentPurposeCode')}>
                  Attribute 1 Receipt Payment Purpose Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute1ReceiptPaymentPurposeType')}>
                  Attribute 1 Receipt Payment Purpose Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute2ReceiptPaymentPurposeCode')}>
                  Attribute 2 Receipt Payment Purpose Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute2ReceiptPaymentPurposeDescription')}>
                  Attribute 2 Receipt Payment Purpose Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute3ReceiptPaymentPurposeCode')}>
                  Attribute 3 Receipt Payment Purpose Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute3ReceiptPaymentPurposeDescription')}>
                  Attribute 3 Receipt Payment Purpose Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute4ReceiptPaymentPurposeCode')}>
                  Attribute 4 Receipt Payment Purpose Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute4ReceiptPaymentPurposeDescription')}>
                  Attribute 4 Receipt Payment Purpose Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute5ReceiptPaymentPurposeCode')}>
                  Attribute 5 Receipt Payment Purpose Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('attribute5ReceiptPaymentPurposeDescription')}>
                  Attribute 5 Receipt Payment Purpose Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastChild')}>
                  Last Child <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fxReceiptPurposeTypeList.map((fxReceiptPurposeType, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/fx-receipt-purpose-type/${fxReceiptPurposeType.id}`} color="link" size="sm">
                      {fxReceiptPurposeType.id}
                    </Button>
                  </td>
                  <td>{fxReceiptPurposeType.itemCode}</td>
                  <td>{fxReceiptPurposeType.attribute1ReceiptPaymentPurposeCode}</td>
                  <td>{fxReceiptPurposeType.attribute1ReceiptPaymentPurposeType}</td>
                  <td>{fxReceiptPurposeType.attribute2ReceiptPaymentPurposeCode}</td>
                  <td>{fxReceiptPurposeType.attribute2ReceiptPaymentPurposeDescription}</td>
                  <td>{fxReceiptPurposeType.attribute3ReceiptPaymentPurposeCode}</td>
                  <td>{fxReceiptPurposeType.attribute3ReceiptPaymentPurposeDescription}</td>
                  <td>{fxReceiptPurposeType.attribute4ReceiptPaymentPurposeCode}</td>
                  <td>{fxReceiptPurposeType.attribute4ReceiptPaymentPurposeDescription}</td>
                  <td>{fxReceiptPurposeType.attribute5ReceiptPaymentPurposeCode}</td>
                  <td>{fxReceiptPurposeType.attribute5ReceiptPaymentPurposeDescription}</td>
                  <td>{fxReceiptPurposeType.lastChild}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/fx-receipt-purpose-type/${fxReceiptPurposeType.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/fx-receipt-purpose-type/${fxReceiptPurposeType.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/fx-receipt-purpose-type/${fxReceiptPurposeType.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Fx Receipt Purpose Types found</div>
        )}
      </div>
      {totalItems ? (
        <div className={fxReceiptPurposeTypeList && fxReceiptPurposeTypeList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FxReceiptPurposeType;
