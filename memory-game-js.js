document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    let flippedCards = [];
    let matchedPairs = 0;

    // Créer un tableau avec les paires d'images
    const cards = [];
    for (let i = 1; i <= 10; i++) {
        cards.push(`img${i}.png`);
        cards.push(`img${i}.png`);
    }

    // Mélanger les cartes
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledCards = shuffleArray(cards);

    // Créer les éléments HTML pour chaque carte
    shuffledCards.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.innerHTML = `
            <div class="card" data-card="${card}">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="images/${card}" alt="carte">
                </div>
            </div>
        `;
        gameContainer.appendChild(cardContainer);

        cardContainer.addEventListener('click', () => flipCard(cardContainer));
    });

    function flipCard(cardContainer) {
        const card = cardContainer.querySelector('.card');
        
        // Empêcher de retourner plus de 2 cartes à la fois
        if (flippedCards.length >= 2 || flippedCards.includes(card) || card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.card === card2.dataset.card;

        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === 10) {
                alert('Félicitations ! Vous avez gagné !');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
    }
});
