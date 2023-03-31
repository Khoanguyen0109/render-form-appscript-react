/* eslint-disable camelcase */
import React from 'react';
import { Progress, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { textRefactor } from '../../../components/utilities/utilities';
import { ProjectCard } from '../style';

function GridCard({ value }) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { id_form_template, name_form, status, des_form } = value;

  const go = () => {};
  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`admin/${id_form_template}`}>{name_form}</Link>
              {/* <Link to={`${path}/${id_form_template}`}>{name_form}</Link> */}

              <Tag className={status === 'Hoạt động' ? 'complete' : status}>{status}</Tag>
            </h1>
            <Dropdown
              content={
                <>
                  <Link to={`${path}/${id_form_template}`}>Tạo Form</Link>
                </>
              }
            >
              <Link to="#">
                <FeatherIcon icon="more-horizontal" size={18} />
              </Link>
            </Dropdown>
          </div>
          <p className="project-desc">
            {textRefactor(
              des_form,
              15,
            )}
          </p>
          <div className="project-timing">
            <div>
              <span>Ngày tạo</span>
              <strong>{format(new Date(), 'dd/MM/yyyy')}</strong>
            </div>
            {/* <div>
              <span>Deadline</span>
              <strong>18 Mar 2020</strong>
            </div> */}
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
