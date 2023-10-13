import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAmortizationSequence } from 'app/shared/model/prepayments/amortization-sequence.model';
import { searchEntities, getEntities } from './amortization-sequence.reducer';

export const AmortizationSequence = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const amortizationSequenceList = useAppSelector(state => state.amortizationSequence.entities);
  const loading = useAppSelector(state => state.amortizationSequence.loading);
  const totalItems = useAppSelector(state => state.amortizationSequence.totalItems);

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
      <h2 id="amortization-sequence-heading" data-cy="AmortizationSequenceHeading">
        Amortization Sequences
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/amortization-sequence/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Amortization Sequence
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
        {amortizationSequenceList && amortizationSequenceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentAccountGuid')}>
                  Prepayment Account Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('recurrenceGuid')}>
                  Recurrence Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sequenceNumber')}>
                  Sequence Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('particulars')}>
                  Particulars <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currentAmortizationDate')}>
                  Current Amortization Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('previousAmortizationDate')}>
                  Previous Amortization Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nextAmortizationDate')}>
                  Next Amortization Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isCommencementSequence')}>
                  Is Commencement Sequence <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isTerminalSequence')}>
                  Is Terminal Sequence <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('amortizationAmount')}>
                  Amortization Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sequenceGuid')}>
                  Sequence Guid <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Prepayment Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Amortization Recurrence <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {amortizationSequenceList.map((amortizationSequence, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/amortization-sequence/${amortizationSequence.id}`} color="link" size="sm">
                      {amortizationSequence.id}
                    </Button>
                  </td>
                  <td>{amortizationSequence.prepaymentAccountGuid}</td>
                  <td>{amortizationSequence.recurrenceGuid}</td>
                  <td>{amortizationSequence.sequenceNumber}</td>
                  <td>{amortizationSequence.particulars}</td>
                  <td>
                    {amortizationSequence.currentAmortizationDate ? (
                      <TextFormat type="date" value={amortizationSequence.currentAmortizationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {amortizationSequence.previousAmortizationDate ? (
                      <TextFormat type="date" value={amortizationSequence.previousAmortizationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {amortizationSequence.nextAmortizationDate ? (
                      <TextFormat type="date" value={amortizationSequence.nextAmortizationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{amortizationSequence.isCommencementSequence ? 'true' : 'false'}</td>
                  <td>{amortizationSequence.isTerminalSequence ? 'true' : 'false'}</td>
                  <td>{amortizationSequence.amortizationAmount}</td>
                  <td>{amortizationSequence.sequenceGuid}</td>
                  <td>
                    {amortizationSequence.prepaymentAccount ? (
                      <Link to={`/prepayment-account/${amortizationSequence.prepaymentAccount.id}`}>
                        {amortizationSequence.prepaymentAccount.catalogueNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {amortizationSequence.amortizationRecurrence ? (
                      <Link to={`/amortization-recurrence/${amortizationSequence.amortizationRecurrence.id}`}>
                        {amortizationSequence.amortizationRecurrence.particulars}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/amortization-sequence/${amortizationSequence.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/amortization-sequence/${amortizationSequence.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/amortization-sequence/${amortizationSequence.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Amortization Sequences found</div>
        )}
      </div>
      {totalItems ? (
        <div className={amortizationSequenceList && amortizationSequenceList.length > 0 ? '' : 'd-none'}>
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

export default AmortizationSequence;
