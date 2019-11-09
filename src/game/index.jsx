import React, { PureComponent } from 'react'
import './styles.css';
import batu from '../assets/image/batu.png';
import gunting from '../assets/image/gunting.png';
import kertas from '../assets/image/kertas.png';
import versus from '../assets/image/versus.png'
import healts from '../assets/image/health.png';
import playerImage from '../assets/image/avatar1.jpg';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import random from 'lodash/random';
import find from 'lodash/find';

export default class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          nama: 'batu',
          gambar: batu,
          value: 1
        },
        {
          id: 2,
          nama: 'gunting',
          gambar: gunting,
          value: 1
        },
        {
          id: 3,
          nama: 'kertas',
          gambar: kertas,
          value: 1
        }
      ],
      nyawa: 3,
      nyawaBot: 50,
      player: {
        id: null,
        nama: '',
        gambar: null,
        value: null
      },
      bot: {
        id: null,
        nama: '',
        gambar: null,
        value: null
      },
      playerName: ''
    }

    this.startGame = null;
    this.intervalChange = null;
  }

  startPlaying = () => {
    let currentState = cloneDeep(this.state.data);
    this.startGame = setInterval(() => {
      let getData = find(currentState, { 'id': random(1, 3) })

      this.setState({
        player: {
          id: null,
          nama: '',
          gambar: null,
          value: null
        },
        bot: getData
      });
    }, 1500);
  }

  handleAnswer = data => {
    this.setState({
      player: data
    });
    clearInterval(this.startGame);

    let bot = this.state.bot;
    let player = data;

    if (player.nama === 'gunting' && bot.nama === 'gunting') {
      // console.log('==drow');
    } else if (player.nama === 'gunting' && bot.nama === 'kertas') {
      // console.log('==player win');
      if (this.state.nyawa < 3) {
        this.setState({
          nyawa: this.state.nyawa + 1
        })
      }
      this.setState({
        nyawaBot: this.state.nyawaBot - 1
      })
    } else if (player.nama === 'gunting' && bot.nama === 'batu') {
      // console.log('==bot win');
      this.setState({
        nyawa: this.state.nyawa - 1
      })
    } else if (player.nama === 'kertas' && bot.nama === 'gunting') {
      // console.log('==bot win');
      this.setState({
        nyawa: this.state.nyawa - 1
      })
    } else if (player.nama === 'kertas' && bot.nama === 'kertas') {
      // console.log('==drow');
    } else if (player.nama === 'kertas' && bot.nama === 'batu') {
      // console.log('==player win');
      if (this.state.nyawa < 3) {
        this.setState({
          nyawa: this.state.nyawa + 1
        })
      }
      this.setState({
        nyawaBot: this.state.nyawaBot - 1
      })
    } else if (player.nama === 'batu' && bot.nama === 'gunting') {
      // console.log('==player win');
      if (this.state.nyawa < 3) {
        this.setState({
          nyawa: this.state.nyawa + 1,
        })
      }
      this.setState({
        nyawaBot: this.state.nyawaBot - 1
      })
    } else if (player.nama === 'batu' && bot.nama === 'kertas') {
      // console.log('==bot win');
      this.setState({
        nyawa: this.state.nyawa - 1
      })
    } else if (player.nama === 'batu' && bot.nama === 'batu') {
      // console.log('==drow');
    }

    this.startPlaying();
  }

  showHealt = () => {
    if (this.state.nyawa === 3) {
      return (
        <div className="baris-nyawa">
          <img src={healts} alt="nyawa" width="33px" />
          <img src={healts} alt="nyawa" width="33px" />
          <img src={healts} alt="nyawa" width="33px" />
        </div>
      )
    } else if (this.state.nyawa === 2) {
      return (
        <div className="baris-nyawa">
          <img src={healts} alt="nyawa" width="33px" />
          <img src={healts} alt="nyawa" width="33px" />
        </div>
      )
    } else if (this.state.nyawa === 1) {
      return (
        <div className="baris-nyawa">
          <img src={healts} alt="nyawa" width="33px" />
        </div>
      )
    } else if (this.state.nyawa <= 0) {
      clearInterval(this.startGame);
    }
  }

  submitName = () => {
    let getPlayerName = document.getElementById('playerName').value;

    if (getPlayerName.length > 0) {
      this.setState({
        playerName: getPlayerName
      }, () => {
        this.startPlaying();
      });
    }
  }

  render() {
    const { data, player, bot, nyawa, playerName, nyawaBot } = this.state;

    if (playerName !== '') {
      if (nyawa > 0 && nyawaBot > 0) {
        return (
          <div>
            <div className="judul-permainan">
              Batu-Gunting-Kertas
            </div>
            <div className="nyawaPlayer">
              {playerName} : {this.showHealt()}
            </div>
            <div className="atas">
              <div className="pertanyaan">
                <div className="title-text">
                  BOT
                </div>
                <img src={bot.gambar} alt={bot.nama} width="100%" />
              </div>
              <div className="versus">
                <div className="bot-point">
                  {nyawaBot}
                </div>
                <div className="player-point">
                  {nyawa}
                </div>
                <img src={versus} alt="versus" width="100%" />
              </div>
              <div className="jawaban">
                <div className="title-text">
                  {playerName}
                </div>
                <img src={player.gambar} alt={player.nama} width="100%" />
              </div>
            </div>

            <div className="pemisah">
              <div>
                Jawaban
              </div>
            </div>

            <div className="bawah">
              {map(data, list => {
                return (
                  <div key={list.id} className="container" onClick={() => this.handleAnswer(list)}>
                    <img src={list.gambar} alt={list.nama} width="100%" />
                  </div>
                )
              })}
            </div>
          </div>
        )
      } else if (nyawa <= 0) {
        return (
          <React.Fragment>
            <div className="game-over">
              GAME OVER !!!!
            </div>
            <div className="game-over">
              YOU LOOSER
            </div>
          </React.Fragment>
        )
      } else if (nyawa > 0 && nyawaBot < 1) {
        return (
          <div className="game-over">
            YOU WIN !!!!
          </div>
        )
      }
    } else {
      return (
        <div className="atas">
          <div className="player-image">
            <img src={playerImage} alt="player" width="200px" />
          </div>
          <div className="input-player-name">
            <label htmlFor="label">MASUKAN NAMA ANDA</label>
            <br />
            <input type="text" name="playerName" id="playerName" maxlength="7" />
            <br />
            <button type="button" id="btnPlay" onClick={() => this.submitName()}>MULAI BERMAIN</button>
          </div>
        </div>
      )
    }
  }
}
