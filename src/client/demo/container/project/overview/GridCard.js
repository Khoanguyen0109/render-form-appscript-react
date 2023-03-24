/* eslint-disable camelcase */
import React from 'react';
import { Progress, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { textRefactor } from '../../../components/utilities/utilities';
import { ProjectCard } from '../style';

function GridCard({ isListRoute, value }) {
  const { path } = useRouteMatch();
  console.log('path :>> ', path);
  const { idform, name_form, status, desp_form  } = value;
  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`${path}/${idform}`}>{name_form}</Link>
              <Tag className={status}>{status}</Tag>
            </h1>
            <Dropdown
              content={
                <>
                  <Link to="#">Total Income</Link>
                  <Link to="#">Total Expense</Link>
                  <Link to="#">Total Tax</Link>
                  <Link to="#">Net Profit</Link>
                </>
              }
            >
              <Link to="#">
                <FeatherIcon icon="more-horizontal" size={18} />
              </Link>
            </Dropdown>
          </div>
          <p className="project-desc">{textRefactor(desp_form, 13)}</p>
          <div className="project-timing">
            <div>
              <span>Start Date</span>
              <strong>26 Dec 2019</strong>
            </div>
            <div>
              <span>Deadline</span>
              <strong>18 Mar 2020</strong>
            </div>
          </div>
        </div>
      </Cards>
    </ProjectCard>
  );
}

GridCard.propTypes = {
  value: PropTypes.object,
};

export default GridCard;
