import React, { Component } from 'react';
import axios from '../../axios-config';
import './Generator.css';

class Generator extends Component {
    state = {
        loading: true,
        word: [],
        previous: null,
        triggered: false,
        finishedRequest: true,
        interval: null
    }

    componentWillUnmount() {
        clearInterval(this.state.iv);
    }

    componentDidMount() {
        this.setState({triggered: true});
        axios.get('/getinit' )
        .then(response => {
            let words = this.state.word;
            words.push({word: response.data.body, i: words.length});
            this.setState({word: words, previous: response.data.body});
            this.setState({triggered: false});
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });

        const iv = setInterval( () => {
            
            if(this.state.loading & !this.state.triggered) {
                this.setState({triggered: true});

                axios.post('/next', {letter: this.state.previous} )
                .then(response => {
                    //console.log(response.data);
                    let words = this.state.word;

                    words.push({word: response.data.body, i: words.length});

                    let final = response.data.final==="False" ? false : true;
                    this.setState({word: words, previous: response.data.body, loading: !final, triggered: false});
                }).catch(error => {
                    console.log(error);
                    this.setState({loading: false});
                });
            }
        } , 300);
        this.setState({interval: iv});


    }

    render() {

        let loading = this.state.loading ? (<span>...</span>) : (<span></span>);

        let animation = (
            <div class="loader loader--fade">
                <span class="loader-item">1</span>
                <span class="loader-item">2</span>
                <span class="loader-item">3</span>
                <span class="loader-item">4</span>
                <span class="loader-item">5</span>
            </div>
        )
        if(!this.state.loading) {
            animation = (
                <div class="loader">
                    <span class="loader-item">1</span>
                    <span class="loader-item">2</span>
                    <span class="loader-item">3</span>
                    <span class="loader-item">4</span>
                    <span class="loader-item">5</span>
                </div>
            )
        }

        return(
            <div>
                {animation}

                <p>
                {
                    this.state.word.map(w => {
                        return(<span key={w.i}>{w.word} </span>);
                    })
                }
                {loading}
                </p>
            </div>
        );
    }
}

export default Generator;