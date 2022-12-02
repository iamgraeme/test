import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
    };
  }

  async fetchData() {
    try {
      const res = await fetch(
        'https://api.staging.rewards.wlloyalty.net/v1/rewards',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '9QqcmiHBUs3ydSeca70nU2CdOBUCDmdS71OapD4x',
          },
        }
      );
      const json = await res.json();
      this.setState({
        data: json,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  static defaultProps = {
    userName: 'My',
    theme: 'sports',
    type: 'list',
    backToList: 'Back to list',
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="screen">
          <div className="loading">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div class="rewards-container">
          {this.state.data.map((reward) => (
            <div class="reward-item">
              <div class="reward-item__image">
                <img src={reward.pictureUrl} alt={reward.name} />
              </div>
              <div class="reward-item__content">
                <div class="reward-item__title">
                  <h3>{reward.name}</h3>
                </div>
                <button class="reward-item__button">Redeem</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
