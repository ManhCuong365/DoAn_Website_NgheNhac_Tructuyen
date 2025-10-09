'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      file_url: {
        type: Sequelize.STRING, 
        allowNull: false,    
      },
      release_date: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
      album_id: {
        type: Sequelize.INTEGER, 
        allowNull: true,         
        references: {
          model: 'Albums',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      artist_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: 'Artists',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',       
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};