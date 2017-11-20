import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../../components/Header";
import Card from "../../components/Card";
import CardModal from "../../components/CardModal";

class Cards extends Component {
    state = {
        selectedCard: undefined,
        cardModal: [],
        cards: []
    }

    // When the component mounts, load all cards and save them to this.state.cards
    componentDidMount() {
        this.loadCards();
    };

    loadCards = () => {
        API.getCards()
        .then(res => {
            console.log(res.data);
            this.setState({cards: res.data})
        }
            
        ).catch(err => console.log(err));
    };

    //function to control modal click
    loadModal = () => {
        this.setState({
            selectedCard: true
        });
    }
    closeModal = () => {
        this.setState({
            selectedCard: false
        });
    }

    // function to query specified card and return modal
    chooseCard = (id) => {
        API.chooseCard(id)
        .then(res => {
            this.loadModal();
            this.setState({cardModal: res.data})
        })
        .catch(err => console.log(err));
    }

    //handleTrade function

    handleTrade = () => {
        alert("function in testing");
    }
    
    render() {
        return (
            <div className="row">
                <Header />
                <div className="row text-center">
                    {this.state.cards.map(card => {
                        return (
                            <span key={card._id}>
                                <Card
                                    onClick={()=>this.chooseCard(card._id)}
                                    fimage={card.fimage} 
                                    store={card.store}
                                    price={card.price}
                                    exp={card.exp}
                                />
                            </span>
                        )
                    })}
                </div>
                {/* render Modal */}
                <CardModal 
                    handleTrade = {this.handleTrade}
                    selectedCard={this.state.selectedCard}
                    closeModal={this.closeModal}
                    fimage={this.state.cardModal.fimage} 
                    key={this.state.cardModal._id}
                    store={this.state.cardModal.store}
                    price={this.state.cardModal.price}
                    exp={this.state.cardModal.exp}
                />
            </div>
        )
    }
}

export default Cards;