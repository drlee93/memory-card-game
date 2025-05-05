// 게임 상태 변수
let cards = [];
let flippedCards = [];
let moves = 0;
let pairs = 0;
let canFlip = true;

// 이모지 배열 (카드 쌍)
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// 게임 초기화
function initGame() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    moves = 0;
    pairs = 0;
    flippedCards = [];
    canFlip = true;
    updateScore();

    // 이모지 배열을 두 번 복제하여 카드 쌍 생성
    cards = [...emojis, ...emojis];
    
    // 카드 섞기
    shuffleCards();

    // 카드 생성 및 추가
    cards.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cardsContainer.appendChild(card);
    });
}

// 카드 섞기 (Fisher-Yates 알고리즘)
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// 카드 요소 생성
function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.emoji = emoji;

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = '?';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = emoji;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', () => flipCard(card));
    return card;
}

// 카드 뒤집기
function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || flippedCards.includes(card)) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        updateScore();
        canFlip = false;
        checkMatch();
    }
}

// 매치 확인
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;

    if (match) {
        pairs++;
        updateScore();
        flippedCards = [];
        canFlip = true;

        if (pairs === emojis.length) {
            setTimeout(() => {
                alert('축하합니다! 게임을 클리어하셨습니다!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// 점수 업데이트
function updateScore() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('pairs').textContent = pairs;
}

// 재시작 버튼 이벤트 리스너
document.getElementById('restart-button').addEventListener('click', initGame);

// 게임 시작
initGame(); 