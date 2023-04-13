import { QueryInterface, DataTypes } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {

    await queryInterface.createTable('movies', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    // Create table for shows
    await queryInterface.createTable('shows', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rooms',
          key: 'id',
        },
      },
    });
  
    // Create table for cinemas
    await queryInterface.createTable('cinemas', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Create table for rooms
    await queryInterface.createTable('rooms', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cinemaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cinemas',
          key: 'id',
        },
      },
    });
  
    // Create table for seat types
    await queryInterface.createTable('seatTypes', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      premiumPercent: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    // Create table for seats
    await queryInterface.createTable('seats', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rooms',
          key: 'id',
        },
      },
      seatTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'seatTypes',
          key: 'id',
        },
      },
    });
  
    // Create table for bookings
    await queryInterface.createTable('bookings', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      showId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'shows',
          key: 'id',
        },
      },
      seatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
          model: 'seats',
          key: 'id',
        },
      },
      });
      
      // Create index on movieId in shows table
      await queryInterface.addIndex('shows', ['movieId']);
      
      // Create index on roomId in rooms table
      await queryInterface.addIndex('rooms', ['cinemaId']);
      
      // Create index on roomId and seatTypeId in seats table
      await queryInterface.addIndex('seats', ['roomId', 'seatTypeId']);

    // throw new Error('TODO: implement migration in task 4');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
