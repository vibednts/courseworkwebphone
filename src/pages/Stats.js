import React, { useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import { FaChartPie, FaUsers, FaHeart, FaBriefcase, FaHome, FaSmile } from 'react-icons/fa';

const Stats = () => {
  const { getStats } = useContext(ContactContext);
  const stats = getStats();

  return (
    <div className="page-container">
      <h2 className="stats-title"><FaChartPie /> Аналітика довідника</h2>
      
      <div className="stats-grid">
        {}
        <div className="stat-card card">
          <div className="stat-icon bg-blue"><FaUsers /></div>
          <div className="stat-info">
            <h3>Всього</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>

        {}
        <div className="stat-card card">
          <div className="stat-icon bg-yellow"><FaHeart /></div>
          <div className="stat-info">
            <h3>У вибраному</h3>
            <p className="stat-number">{stats.favorites}</p>
          </div>
        </div>

        {}
        <div className="stat-card card">
          <div className="stat-icon bg-purple"><FaBriefcase /></div>
          <div className="stat-info">
            <h3>Робота</h3>
            <p className="stat-number">{stats.work}</p>
          </div>
        </div>

        {}
        <div className="stat-card card">
          <div className="stat-icon bg-pink"><FaHome /></div>
          <div className="stat-info">
            <h3>Сім'я</h3>
            <p className="stat-number">{stats.family}</p>
          </div>
        </div>

             {}
        <div className="stat-card card">
          <div className="stat-icon bg-green"><FaSmile /></div>
          <div className="stat-info">
            <h3>Друзі</h3>
            <p className="stat-number">{stats.friends}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Stats;